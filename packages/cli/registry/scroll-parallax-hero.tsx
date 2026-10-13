'use client'

import { useRef } from 'react'
import type { RefObject } from 'react'
import {
  cubicBezier,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import type { MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'

export type ScrollParallaxHeroFeature = {
  label?: string
  title: string
  description: string
}

export type ScrollParallaxHeroProps = {
  image: string
  imageAlt?: string
  sideImages?: [string, string]
  showSideCards?: boolean
  heroHeading?: string
  hintText?: string
  showHint?: boolean
  sectionHeading?: string
  sectionSubheading?: string
  captionEyebrow?: string
  captionHeading?: string
  captionSubheading?: string
  marqueeText?: string
  showMarquee?: boolean
  chapters?: [string, string, string]
  showChapters?: boolean
  features?: ScrollParallaxHeroFeature[]
  showProgressBar?: boolean
  scrollLength?: number
  className?: string
  scrollContainerRef?: RefObject<HTMLElement | null>
  fullBleed?: boolean
}

const DEFAULT_FEATURES: ScrollParallaxHeroFeature[] = [
  {
    label: 'Depth',
    title: 'Multi-layer perspective',
    description: 'Decoupled planes move at independent speeds for tactile dimension.',
  },
  {
    label: 'Expansion',
    title: 'Full-bleed scale',
    description: 'The framed view gracefully opens to immerse the entire viewport.',
  },
  {
    label: 'Precision',
    title: 'Harmonic physics',
    description: 'Spring damping and easing curves tuned to feel weighted and steady.',
  },
]

const frameEase = cubicBezier(0.65, 0, 0.35, 1)
const softEase = cubicBezier(0.22, 1, 0.36, 1)

function ParallaxWord({
  word,
  index,
  lineIndex,
  progress,
  reduce,
}: {
  word: string
  index: number
  lineIndex: number
  progress: MotionValue<number>
  reduce: boolean
}) {
  const lift = reduce ? 0 : -(6 + index * 2.4)
  const y = useTransform(progress, [0.03, 0.2], ['0svh', `${lift}svh`])
  const blur = useTransform(
    progress,
    [0.06, 0.18],
    reduce ? ['blur(0px)', 'blur(0px)'] : ['blur(0px)', 'blur(10px)'],
  )

  return (
    <motion.span
      initial={{
        opacity: 0,
        y: reduce ? 0 : 36,
        filter: reduce ? 'blur(0px)' : 'blur(10px)',
      }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: reduce ? 0 : 0.9,
        delay: reduce ? 0 : lineIndex * 0.16 + index * 0.05,
        ease: softEase,
      }}
      className="inline-block"
    >
      <motion.span style={{ y, filter: blur }} className="inline-block">
        {word}
      </motion.span>
    </motion.span>
  )
}

function SideCard({
  src,
  side,
  progress,
  reduce,
}: {
  src: string
  side: 'left' | 'right'
  progress: MotionValue<number>
  reduce: boolean
}) {
  const isLeft = side === 'left'
  const y = useTransform(
    progress,
    [0.1, 0.7],
    reduce ? ['0svh', '0svh'] : isLeft ? ['22svh', '-18svh'] : ['34svh', '-26svh'],
  )
  const x = useTransform(
    progress,
    [0.1, 0.7],
    reduce ? ['0%', '0%'] : isLeft ? ['0%', '-30%'] : ['0%', '30%'],
  )
  const rotate = useTransform(
    progress,
    [0.1, 0.7],
    reduce ? [0, 0] : isLeft ? [-8, -2] : [7, 2],
  )
  const opacity = useTransform(progress, [0.14, 0.3, 0.5, 0.64], [0, 1, 1, 0])
  const imageY = useTransform(
    progress,
    [0.1, 0.7],
    reduce ? ['0%', '0%'] : ['-8%', '8%'],
  )

  return (
    <motion.div
      aria-hidden="true"
      style={{ y, x, rotate, opacity }}
      className={cn(
        'pointer-events-none absolute z-[1] aspect-[3/4] w-[24%] max-w-56 overflow-hidden rounded-xl shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:w-[19%]',
        isLeft ? 'top-[26%] left-[4%] sm:left-[7%]' : 'top-[34%] right-[4%] sm:right-[7%]',
      )}
    >
      <motion.img
        src={src}
        alt=""
        draggable={false}
        style={{ y: imageY }}
        className="absolute inset-0 size-full scale-125 object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </motion.div>
  )
}

function FeatureCard({
  item,
  index,
  progress,
  reduce,
}: {
  item: ScrollParallaxHeroFeature
  index: number
  progress: MotionValue<number>
  reduce: boolean
}) {
  const start = 0.74 + index * 0.05
  const opacity = useTransform(progress, [start, start + 0.1], [0, 1])
  const y = useTransform(
    progress,
    [start, start + 0.1],
    reduce ? [0, 0] : [20, 0],
  )

  return (
    <motion.div
      style={{ opacity, y }}
      className="border-border/60 bg-surface/40 backdrop-blur-md rounded-xl border p-3.5 sm:p-4.5"
    >
      {item.label && (
        <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted">
          {item.label}
        </p>
      )}
      <h4 className="font-display mt-1 text-sm font-semibold tracking-tight text-foreground sm:text-base">
        {item.title}
      </h4>
      <p className="text-muted mt-1 text-xs leading-relaxed">
        {item.description}
      </p>
    </motion.div>
  )
}

function Chapter({
  label,
  range,
  progress,
  reduce,
}: {
  label: string
  range: [number, number, number, number]
  progress: MotionValue<number>
  reduce: boolean
}) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0])
  const y = useTransform(
    progress,
    range,
    reduce ? [0, 0, 0, 0] : [8, 0, 0, -8],
  )

  return (
    <motion.span
      style={{ opacity, y }}
      className="text-muted absolute inset-x-0 text-center font-mono text-[10px] tracking-[0.18em] uppercase"
    >
      {label}
    </motion.span>
  )
}

export default function ScrollParallaxHero({
  image,
  imageAlt = '',
  sideImages,
  showSideCards = true,
  heroHeading = 'Make room for\na different perspective.',
  hintText = 'Scroll to begin',
  showHint = true,
  sectionHeading = 'Look closer.',
  sectionSubheading = 'A study in scale and perspective',
  captionEyebrow = 'Focus',
  captionHeading,
  captionSubheading,
  marqueeText = 'Scale · Depth · Motion · Perspective ·',
  showMarquee = true,
  chapters = ['Perspective', 'Scale', 'Detail'],
  showChapters = true,
  features = DEFAULT_FEATURES,
  showProgressBar = true,
  scrollLength = 380,
  className,
  scrollContainerRef,
  fullBleed = false,
}: ScrollParallaxHeroProps) {
  const sceneRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const reduce = Boolean(reduceMotion)

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: sceneRef,
    offset: ['start start', 'end end'],
  })

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.4,
    restDelta: 0.0004,
  })
  const p = reduce ? scrollYProgress : springProgress

  const [leftImage, rightImage] = sideImages ?? [image, image]

  const backdropTint = useTransform(p, [0.18, 0.34], [0, 1])

  // Clear gap: Hero heading fades out early (0.05 -> 0.18) with upward lift
  const heroOpacity = useTransform(p, [0.05, 0.18], [1, 0])
  const heroScale = useTransform(p, [0.05, 0.18], reduce ? [1, 1] : [1, 0.94])
  const heroY = useTransform(p, [0.05, 0.18], reduce ? ['0svh', '0svh'] : ['0svh', '-8svh'])
  const hintOpacity = useTransform(p, [0.02, 0.09], [1, 0])

  const gridY = useTransform(p, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-14%'])
  const orbAY = useTransform(p, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-60%'])
  const orbBY = useTransform(p, [0, 1], reduce ? ['0%', '0%'] : ['0%', '45%'])
  const orbAX = useTransform(p, [0, 1], reduce ? ['0%', '0%'] : ['0%', '25%'])
  const orbBX = useTransform(p, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-30%'])

  const marqueeOpacity = useTransform(p, [0.22, 0.36, 0.56, 0.72], [0, 1, 1, 0])
  const marqueeAX = useTransform(p, [0.2, 0.75], reduce ? ['0%', '0%'] : ['8%', '-32%'])
  const marqueeBX = useTransform(p, [0.2, 0.75], reduce ? ['0%', '0%'] : ['-34%', '6%'])

  const frameProgress = useTransform(p, [0.2, 0.9], [0, 1], { ease: frameEase })
  const frameWidth = useTransform(frameProgress, [0, 1], ['58%', '100%'])
  const frameHeight = useTransform(frameProgress, [0, 1], ['56svh', '100svh'])
  const frameRadius = useTransform(frameProgress, [0, 0.85, 1], [26, 6, 0])
  const frameRotateX = useTransform(frameProgress, [0, 1], reduce ? [0, 0] : [9, 0])
  const frameRotateZ = useTransform(frameProgress, [0, 1], reduce ? [0, 0] : [-2.5, 0])
  const frameOpacity = useTransform(p, [0.16, 0.26], [0, 1])
  const frameShadowOpacity = useTransform(frameProgress, [0, 0.9, 1], [1, 0.6, 0])

  const imageY = useTransform(frameProgress, [0, 1], reduce ? ['0%', '0%'] : ['10%', '-10%'])
  const imageX = useTransform(frameProgress, [0, 1], reduce ? ['0%', '0%'] : ['-3%', '3%'])
  const imageScale = useTransform(frameProgress, [0, 1], reduce ? [1, 1] : [1.28, 1.08])
  const imageSaturate = useTransform(
    frameProgress,
    [0, 1],
    reduce ? ['saturate(1)', 'saturate(1)'] : ['saturate(0.7) brightness(0.9)', 'saturate(1.1) brightness(1)'],
  )
  const shineX = useTransform(p, [0.3, 0.9], reduce ? ['-120%', '-120%'] : ['-120%', '220%'])

  const ghostProgress = useTransform(p, [0.28, 0.98], [0, 1], { ease: frameEase })
  const ghostWidth = useTransform(ghostProgress, [0, 1], ['58%', '100%'])
  const ghostHeight = useTransform(ghostProgress, [0, 1], ['56svh', '100svh'])
  const ghostRadius = useTransform(ghostProgress, [0, 0.85, 1], [26, 6, 0])
  const ghostOpacity = useTransform(p, [0.22, 0.34, 0.94, 1], [0, 0.7, 0.7, 0])

  // "Look closer" fades in only AFTER the hero heading fades out (gap between 0.18 and 0.26)
  const framingOpacity = useTransform(p, [0.26, 0.36, 0.58, 0.68], [0, 1, 1, 0])
  const titleY = useTransform(p, [0.26, 0.68], reduce ? ['0svh', '0svh'] : ['3svh', '-5svh'])

  const captionOpacity = useTransform(p, [0.68, 0.84], [0, 1])
  const captionY = useTransform(p, [0.68, 0.84], reduce ? [0, 0] : [24, 0])
  const featuresFade = useTransform(p, [0.72, 0.82], [0, 1])
  const vignette = useTransform(p, [0.6, 0.95], [0, 1])
  const barScale = useTransform(p, [0.06, 0.96], [0, 1])

  const resolvedCaptionHeading = captionHeading ?? sectionHeading
  const resolvedCaptionSubheading = captionSubheading ?? sectionSubheading
  const headingLines = heroHeading.split('\n')
  let wordCounter = -1

  return (
    <section
      ref={sceneRef}
      aria-label="Scroll parallax image reveal"
      style={{ height: `${scrollLength}svh` }}
      className={cn(
        fullBleed
          ? 'relative left-1/2 w-screen -translate-x-1/2'
          : 'relative w-full overflow-clip rounded-xl',
        className,
      )}
    >
      <div className="bg-background text-foreground sticky top-0 flex h-svh w-full items-center justify-center overflow-hidden [perspective:1400px]">
        <motion.div
          aria-hidden="true"
          style={{ y: gridY }}
          className="pointer-events-none absolute inset-x-0 -top-[8%] z-0 h-[125%] [mask-image:radial-gradient(ellipse_at_50%_45%,black,transparent_70%)] bg-[linear-gradient(to_right,color-mix(in_srgb,var(--foreground)_8%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--foreground)_8%,transparent)_1px,transparent_1px)] bg-[size:56px_56px]"
        />

        <motion.div
          aria-hidden="true"
          style={{ y: orbAY, x: orbAX }}
          className="pointer-events-none absolute -top-[10%] -left-[10%] z-0 size-[46vmin] rounded-full bg-[color-mix(in_srgb,var(--foreground)_10%,transparent)] blur-3xl"
        />
        <motion.div
          aria-hidden="true"
          style={{ y: orbBY, x: orbBX }}
          className="pointer-events-none absolute -right-[8%] bottom-[2%] z-0 size-[40vmin] rounded-full bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)] blur-3xl"
        />

        <motion.div
          aria-hidden="true"
          style={{ opacity: backdropTint }}
          className="bg-surface/20 pointer-events-none absolute inset-0 z-0"
        />

        {showMarquee && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: marqueeOpacity }}
            className="pointer-events-none absolute inset-0 z-[1] flex flex-col justify-center gap-[2vmin] overflow-hidden"
          >
            <motion.p
              style={{ x: marqueeAX }}
              className="font-display text-[clamp(4rem,14vw,12rem)] leading-[0.9] tracking-[-0.05em] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--foreground)_18%,transparent)]"
            >
              {marqueeText} {marqueeText} {marqueeText}
            </motion.p>
            <motion.p
              style={{ x: marqueeBX }}
              className="font-display text-[clamp(4rem,14vw,12rem)] leading-[0.9] tracking-[-0.05em] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--foreground)_10%,transparent)]"
            >
              {marqueeText} {marqueeText} {marqueeText}
            </motion.p>
          </motion.div>
        )}

        {showSideCards && (
          <>
            <SideCard src={leftImage} side="left" progress={p} reduce={reduce} />
            <SideCard src={rightImage} side="right" progress={p} reduce={reduce} />
          </>
        )}

        {/* Hero heading with clean scroll gap before section heading appears */}
        <motion.h1
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="font-display text-foreground absolute z-10 max-w-5xl px-6 text-center text-[clamp(2.75rem,8.5vw,7.5rem)] font-semibold leading-[0.94] tracking-[-0.05em]"
        >
          {headingLines.map((line, lineIndex) => (
            <span key={`${line}-${lineIndex}`} className="block">
              {line.split(' ').map((word, i) => {
                wordCounter += 1
                return (
                  <span key={`${word}-${i}`}>
                    <ParallaxWord
                      word={word}
                      index={wordCounter}
                      lineIndex={lineIndex}
                      progress={p}
                      reduce={reduce}
                    />{' '}
                  </span>
                )
              })}
            </span>
          ))}
        </motion.h1>

        {showHint && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute bottom-[6svh] z-10 flex flex-col items-center gap-2"
          >
            <span className="text-muted text-xs">{hintText}</span>
            <span className="bg-border relative block h-10 w-px overflow-hidden">
              <motion.span
                animate={reduce ? undefined : { y: ['-100%', '100%'] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="bg-foreground absolute inset-0 block"
              />
            </span>
          </motion.div>
        )}

        {/* Section heading ("Look closer.") appears only after hero heading is gone */}
        <motion.div
          style={{ opacity: framingOpacity, y: titleY }}
          className="pointer-events-none absolute top-[8svh] z-10 px-6 text-center"
        >
          <h2 className="font-display text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl">
            {sectionHeading}
          </h2>
          <p className="text-muted mt-2 text-sm sm:text-base">{sectionSubheading}</p>
        </motion.div>

        <motion.div
          aria-hidden="true"
          style={{
            width: ghostWidth,
            height: ghostHeight,
            borderRadius: ghostRadius,
            opacity: ghostOpacity,
            y: reduce ? 0 : 18,
          }}
          className="bg-surface/20 border-border/30 absolute z-[2] overflow-hidden border"
        />

        <motion.figure
          style={{
            width: frameWidth,
            height: frameHeight,
            borderRadius: frameRadius,
            rotateX: frameRotateX,
            rotateZ: frameRotateZ,
            opacity: frameOpacity,
          }}
          className="border-border/40 bg-surface relative isolate z-[3] overflow-hidden border [transform-style:preserve-3d]"
        >
          <motion.div
            aria-hidden="true"
            style={{ opacity: frameShadowOpacity }}
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
          />

          <motion.img
            src={image}
            alt={imageAlt}
            draggable={false}
            style={{ y: imageY, x: imageX, scale: imageScale, filter: imageSaturate }}
            className="absolute inset-0 size-full object-cover will-change-transform"
          />

          <motion.div
            aria-hidden="true"
            style={{ x: shineX }}
            className="pointer-events-none absolute inset-y-0 z-[2] w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-background/90 via-background/30 to-background/10"
          />

          <motion.div
            aria-hidden="true"
            style={{ opacity: vignette }}
            className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.45))]"
          />
        </motion.figure>

        <motion.div
          style={{ opacity: captionOpacity, y: captionY }}
          className="pointer-events-none absolute bottom-[25svh] left-6 z-10 max-w-2xl sm:bottom-[27svh] sm:left-10"
        >
          {captionEyebrow && (
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
              {captionEyebrow}
            </p>
          )}
          <h3 className="font-display mt-1 text-3xl font-semibold tracking-tight text-foreground drop-shadow-md sm:text-5xl">
            {resolvedCaptionHeading}
          </h3>
          <p className="text-muted mt-1.5 max-w-lg text-xs sm:text-sm">
            {resolvedCaptionSubheading}
          </p>
        </motion.div>

        {features.length > 0 ? (
          <motion.div
            style={{ opacity: featuresFade }}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 grid grid-cols-1 gap-3 px-6 pb-[7svh] sm:grid-cols-3 sm:gap-5 sm:px-10"
          >
            {features.slice(0, 3).map((item, index) => (
              <FeatureCard
                key={`${item.title}-${index}`}
                item={item}
                index={index}
                progress={p}
                reduce={reduce}
              />
            ))}
          </motion.div>
        ) : null}

        {showChapters && chapters && chapters.length >= 3 && (
          <div
            aria-hidden="true"
            className="text-muted pointer-events-none absolute inset-x-0 bottom-[2.5svh] z-20 flex h-5 items-center justify-center"
          >
            <div className="relative h-5 w-44">
              <Chapter label={chapters[0]} range={[0, 0.06, 0.2, 0.3]} progress={p} reduce={reduce} />
              <Chapter label={chapters[1]} range={[0.26, 0.38, 0.62, 0.72]} progress={p} reduce={reduce} />
              <Chapter label={chapters[2]} range={[0.68, 0.8, 0.96, 1]} progress={p} reduce={reduce} />
            </div>
          </div>
        )}

        {showProgressBar && (
          <motion.div
            aria-hidden="true"
            style={{ scaleX: barScale }}
            className="bg-foreground/30 absolute inset-x-0 bottom-0 z-30 h-0.5 origin-left"
          />
        )}
      </div>
    </section>
  )
}