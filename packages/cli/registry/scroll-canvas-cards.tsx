'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export type ScrollCanvasSlide = {
  image: string
  imageAlt?: string
  leftEyebrow?: string
  leftHeading?: string
  leftBody?: string
  rightEyebrow?: string
  rightHeading?: string
  rightBody?: string
}

export type ScrollCanvasCardsProps = {
  slides: ScrollCanvasSlide[]
  className?: string
  backgroundColor?: string
  cardRadius?: number
  cardMaxWidth?: number
  cardHeight?: number
  scrollLength?: number
  cardBorderColor?: string
  cardShadow?: string
  headingClassName?: string
  bodyClassName?: string
  eyebrowClassName?: string
  snap?: boolean
  scrollContainerRef?: RefObject<HTMLElement | null>
  onSlideChange?: (index: number) => void
}

const DEFAULT_BG = 'var(--background)'
const DEFAULT_CARD_RADIUS = 16
const DEFAULT_CARD_MAX_WIDTH = 320
const DEFAULT_CARD_HEIGHT = 220
const DEFAULT_SCROLL_LENGTH = 5
const DEFAULT_BORDER_COLOR = 'var(--border)'
const DEFAULT_SHADOW =
  '0 12px 40px color-mix(in srgb, var(--foreground) 10%, transparent), 0 2px 10px color-mix(in srgb, var(--foreground) 6%, transparent)'

const HOLD = 0.06
const SPAN = 1 - HOLD * 2
const EASE_OUT = [0.22, 1, 0.36, 1] as const

type PanelContent = {
  eyebrow?: string
  heading?: string
  body?: string
}

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

function paintCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number,
  zoom: number,
  shiftY: number,
  alpha: number,
) {
  const imgRatio = img.naturalWidth / img.naturalHeight
  const canvasRatio = w / h
  let dw = imgRatio > canvasRatio ? h * imgRatio : w
  let dh = imgRatio > canvasRatio ? h : w / imgRatio
  dw *= zoom
  dh *= zoom
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2 + shiftY, dw, dh)
  ctx.restore()
}

function pose(slot: number, shift: number, reduce: boolean) {
  if (slot === 0) {
    return { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }
  }
  return {
    opacity: 0,
    x: reduce || slot < 0 ? 0 : shift,
    y: reduce ? 0 : slot > 0 ? 30 : -22,
    filter: reduce ? 'blur(0px)' : 'blur(8px)',
  }
}

function SidePanel({
  items,
  active,
  revealed,
  side,
  reduce,
  eyebrowClassName,
  headingClassName,
  bodyClassName,
}: {
  items: PanelContent[]
  active: number
  revealed: boolean
  side: 'left' | 'right'
  reduce: boolean
  eyebrowClassName?: string
  headingClassName?: string
  bodyClassName?: string
}) {
  const shift = side === 'left' ? -12 : 12
  const align =
    side === 'left' ? 'text-center md:text-right' : 'text-center md:text-left'

  const timing = (isActive: boolean, order: number) => ({
    duration: reduce ? 0.15 : isActive ? 0.75 : 0.4,
    ease: EASE_OUT,
    delay: reduce || !isActive ? 0 : 0.08 + order * 0.06,
  })

  return (
    <div className="grid w-full max-w-xs md:max-w-[240px] lg:max-w-sm">
      {items.map((item, i) => {
        const offset = i - active
        const slot = !revealed && offset === 0 ? 1 : offset
        const isActive = slot === 0
        const state = pose(slot, shift, reduce)

        return (
          <div
            key={i}
            aria-hidden={!isActive}
            className={cn(
              'col-start-1 row-start-1 flex flex-col gap-1.5 sm:gap-2.5',
              align,
              !isActive && 'pointer-events-none select-none',
            )}
          >
            {item.eyebrow && (
              <motion.p
                initial={false}
                animate={state}
                transition={timing(isActive, 0)}
                className={cn(
                  'text-muted font-mono text-[9px] font-medium tracking-[0.18em] uppercase sm:text-[10px] md:text-xs',
                  eyebrowClassName,
                )}
              >
                {item.eyebrow}
              </motion.p>
            )}
            {item.heading && (
              <motion.h3
                initial={false}
                animate={state}
                transition={timing(isActive, 1)}
                className={cn(
                  'text-foreground font-display text-base font-semibold tracking-tight leading-snug sm:text-lg md:text-xl',
                  headingClassName,
                )}
              >
                {item.heading}
              </motion.h3>
            )}
            {item.body && (
              <motion.p
                initial={false}
                animate={state}
                transition={timing(isActive, 2)}
                className={cn(
                  'text-muted max-w-prose text-xs leading-relaxed sm:text-sm md:text-base',
                  bodyClassName,
                )}
              >
                {item.body}
              </motion.p>
            )}
          </div>
        )
      })}
    </div>
  )
}

function ProgressDots({
  total,
  active,
  reduce,
  onSelect,
}: {
  total: number
  active: number
  reduce: boolean
  onSelect: (index: number) => void
}) {
  return (
    <div className="mt-4 flex items-center justify-center gap-1 sm:mt-6">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === active}
          onClick={() => onSelect(i)}
          className="flex h-5 cursor-pointer items-center rounded-full px-1 outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        >
          <motion.span
            initial={false}
            animate={{
              width: i === active ? 20 : 6,
              opacity: i === active ? 1 : 0.35,
            }}
            transition={
              reduce
                ? { duration: 0.15 }
                : { type: 'spring', stiffness: 400, damping: 28 }
            }
            className={cn(
              'block h-1.5 rounded-full transition-colors',
              i === active ? 'bg-foreground' : 'bg-muted',
            )}
          />
        </button>
      ))}
    </div>
  )
}

function useScrollCanvas({
  canvasRef,
  images,
  positionRef,
  reduce,
  onIndexChange,
  onFrame,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  images: string[]
  positionRef: { current: number }
  reduce: boolean
  onIndexChange: (index: number) => void
  onFrame?: (position: number) => void
}) {
  const loaded = useRef<(HTMLImageElement | null)[]>([])
  const current = useRef(0)
  const lastIndex = useRef(0)
  const dirty = useRef(true)
  const size = useRef({ w: 0, h: 0, dpr: 1 })
  const onIndexRef = useRef(onIndexChange)
  const onFrameRef = useRef(onFrame)

  useEffect(() => {
    onIndexRef.current = onIndexChange
    onFrameRef.current = onFrame
  })

  useEffect(() => {
    let cancelled = false
    loaded.current = images.map(() => null)
    images.forEach((src, i) => {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => {
        if (cancelled) return
        loaded.current[i] = img
        dirty.current = true
      }
      img.src = src
    })
    return () => {
      cancelled = true
    }
  }, [images])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.imageSmoothingQuality = 'high'
      size.current = { w, h, dpr }
      dirty.current = true
    }

    const draw = (pos: number) => {
      const { w, h, dpr } = size.current
      const frames = loaded.current
      const last = frames.length - 1
      if (!w || !h || last < 0) return

      const clamped = Math.min(Math.max(pos, 0), last)
      const base = Math.min(Math.floor(clamped), last)
      const t = clamped - base
      const e = easeInOut(t)
      const from = frames[base]
      const to = base < last ? frames[base + 1] : null

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      if (from) paintCover(ctx, from, w, h, 1 + e * 0.07, -e * 12, 1)
      if (to && t > 0) paintCover(ctx, to, w, h, 1.07 - e * 0.07, (1 - e) * 12, e)
      onFrameRef.current?.(clamped)
    }

    const tick = (_time: number, deltaTime: number) => {
      const target = reduce
        ? Math.round(positionRef.current)
        : positionRef.current
      const delta = target - current.current

      if (Math.abs(delta) > 0.0004) {
        const k = reduce ? 1 : 1 - Math.exp(-Math.min(deltaTime, 100) / 150)
        current.current += delta * k
        dirty.current = true
      } else if (delta !== 0) {
        current.current = target
        dirty.current = true
      }

      const index = Math.round(current.current)
      if (index !== lastIndex.current) {
        lastIndex.current = index
        onIndexRef.current(index)
      }

      if (dirty.current) {
        dirty.current = false
        draw(current.current)
      }
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    gsap.ticker.add(tick)

    return () => {
      observer.disconnect()
      gsap.ticker.remove(tick)
    }
  }, [canvasRef, positionRef, reduce])
}

export function ScrollCanvasCards({
  slides,
  className,
  backgroundColor = DEFAULT_BG,
  cardRadius = DEFAULT_CARD_RADIUS,
  cardMaxWidth = DEFAULT_CARD_MAX_WIDTH,
  cardHeight = DEFAULT_CARD_HEIGHT,
  scrollLength = DEFAULT_SCROLL_LENGTH,
  cardBorderColor = DEFAULT_BORDER_COLOR,
  cardShadow = DEFAULT_SHADOW,
  headingClassName,
  bodyClassName,
  eyebrowClassName,
  snap = true,
  scrollContainerRef,
  onSlideChange,
}: ScrollCanvasCardsProps) {
  const containerRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const positionRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const reduce = useReducedMotion() ?? false
  const inView = useInView(containerRef, { once: true, amount: 0.3 })
  const revealed = reduce || inView
  const count = slides.length
  const currentSlide = slides[activeIndex] ?? slides[0]

  const imageKey = JSON.stringify(slides.map((s) => s.image))
  const imageUrls = useMemo(() => JSON.parse(imageKey) as string[], [imageKey])

  const leftItems = useMemo<PanelContent[]>(
    () =>
      slides.map((s) => ({
        eyebrow: s.leftEyebrow,
        heading: s.leftHeading,
        body: s.leftBody,
      })),
    [slides],
  )
  const rightItems = useMemo<PanelContent[]>(
    () =>
      slides.map((s) => ({
        eyebrow: s.rightEyebrow,
        heading: s.rightHeading,
        body: s.rightBody,
      })),
    [slides],
  )
  const hasLeft = leftItems.some((i) => i.eyebrow || i.heading || i.body)
  const hasRight = rightItems.some((i) => i.eyebrow || i.heading || i.body)

  const handleIndex = useCallback(
    (index: number) => {
      setActiveIndex(index)
      onSlideChange?.(index)
    },
    [onSlideChange],
  )

  const handleFrame = useCallback(
    (position: number) => {
      const card = cardRef.current
      if (!card || reduce) return
      const wave = Math.sin((position - Math.floor(position)) * Math.PI)
      card.style.transform = `translateY(${(-wave * 5).toFixed(2)}px) scale(${(1 - wave * 0.025).toFixed(4)})`
    },
    [reduce],
  )

  useScrollCanvas({
    canvasRef,
    images: imageUrls,
    positionRef,
    reduce,
    onIndexChange: handleIndex,
    onFrame: handleFrame,
  })

  useGSAP(
    () => {
      const el = containerRef.current
      if (!el || count < 2) return

      const scroller = scrollContainerRef?.current || undefined
      const toPosition = (progress: number) =>
        Math.min(Math.max((progress - HOLD) / SPAN, 0), 1) * (count - 1)

      triggerRef.current = ScrollTrigger.create({
        trigger: el,
        scroller: scroller,
        start: 'top top',
        end: () => {
          const vh = scroller ? scroller.clientHeight : window.innerHeight
          return `+=${Math.round(vh * scrollLength)}`
        },
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap:
          snap && !reduce
            ? {
                snapTo: (value: number) => {
                  if (value <= HOLD || value >= 1 - HOLD) return value
                  const step = Math.round(((value - HOLD) / SPAN) * (count - 1))
                  return HOLD + (step / (count - 1)) * SPAN
                },
                duration: { min: 0.25, max: 0.7 },
                delay: 0.12,
                ease: 'power2.inOut',
                inertia: false,
              }
            : undefined,
        onRefresh: (self) => {
          positionRef.current = toPosition(self.progress)
        },
        onUpdate: (self) => {
          positionRef.current = toPosition(self.progress)
        },
      })

      ScrollTrigger.refresh()
    },
    {
      scope: containerRef,
      dependencies: [count, scrollLength, reduce, snap, scrollContainerRef],
    },
  )

  const scrollToSlide = useCallback(
    (index: number) => {
      const trigger = triggerRef.current
      if (!trigger) return
      const progress = HOLD + SPAN * (index / Math.max(count - 1, 1))
      const targetTop = trigger.start + (trigger.end - trigger.start) * progress
      const scroller = scrollContainerRef?.current
      if (scroller) {
        scroller.scrollTo({
          top: targetTop,
          behavior: reduce ? 'auto' : 'smooth',
        })
      } else {
        window.scrollTo({
          top: targetTop,
          behavior: reduce ? 'auto' : 'smooth',
        })
      }
    },
    [count, reduce, scrollContainerRef],
  )

  const cardVariants = {
    out: {
      opacity: reduce ? 1 : 0,
      scale: reduce ? 1 : 0.9,
      y: reduce ? 0 : 24,
    },
    in: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: reduce
        ? { duration: 0.15 }
        : { type: 'spring' as const, stiffness: 170, damping: 24, mass: 0.9 },
    },
  }

  return (
    <section
      ref={containerRef}
      className={cn('relative w-full', className)}
      style={{ backgroundColor, minHeight: '100svh' }}
    >
      <div className="sr-only" role="status" aria-live="polite">
        Slide {activeIndex + 1} of {count}
        {currentSlide?.imageAlt ? `: ${currentSlide.imageAlt}` : ''}
      </div>

      <div className="mx-auto flex min-h-svh w-full max-w-6xl items-center px-4 py-8 sm:px-6 md:px-8 md:py-16">
        <div className="grid w-full grid-cols-1 items-center justify-items-center gap-5 sm:gap-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-6 lg:gap-10">
          <div
            className={cn(
              'order-2 w-full justify-center md:order-1 md:flex md:justify-end',
              hasLeft ? 'flex' : 'hidden',
            )}
          >
            {hasLeft && (
              <SidePanel
                items={leftItems}
                active={activeIndex}
                revealed={revealed}
                side="left"
                reduce={reduce}
                eyebrowClassName={eyebrowClassName}
                headingClassName={headingClassName}
                bodyClassName={bodyClassName}
              />
            )}
          </div>

          <motion.div
            variants={cardVariants}
            initial="out"
            animate={revealed ? 'in' : 'out'}
            className="order-1 flex w-full flex-col items-center justify-center md:order-2 md:w-auto"
          >
            <div
              ref={cardRef}
              className="relative will-change-transform"
              style={{
                width: '100%',
                maxWidth: `min(${cardMaxWidth}px, calc(100vw - 2.5rem))`,
                aspectRatio: `${cardMaxWidth} / ${cardHeight}`,
                maxHeight: cardHeight,
              }}
            >
              <div
                className="pointer-events-none absolute -inset-[1px]"
                style={{
                  border: `1px solid ${cardBorderColor}`,
                  borderRadius: cardRadius + 1,
                }}
              />
              <div
                className="bg-surface relative h-full w-full overflow-hidden"
                style={{
                  borderRadius: cardRadius,
                  boxShadow: cardShadow,
                }}
              >
                <canvas
                  ref={canvasRef}
                  role="img"
                  aria-label={currentSlide?.imageAlt}
                  className="absolute inset-0 h-full w-full"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    borderRadius: cardRadius,
                    boxShadow:
                      'inset 0 0 50px color-mix(in srgb, var(--foreground) 8%, transparent)',
                  }}
                />
              </div>
            </div>
            <ProgressDots
              total={count}
              active={activeIndex}
              reduce={reduce}
              onSelect={scrollToSlide}
            />
          </motion.div>

          <div
            className={cn(
              'order-3 flex w-full justify-center border-border/40 pt-2 md:order-3 md:border-0 md:pt-0 md:justify-start',
              hasRight ? 'flex' : 'hidden',
              hasLeft && 'border-t md:border-t-0',
            )}
          >
            {hasRight && (
              <SidePanel
                items={rightItems}
                active={activeIndex}
                revealed={revealed}
                side="right"
                reduce={reduce}
                eyebrowClassName={eyebrowClassName}
                headingClassName={headingClassName}
                bodyClassName={bodyClassName}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScrollCanvasCards