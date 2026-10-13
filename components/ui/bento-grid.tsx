'use client'

import { Children, isValidElement, cloneElement } from 'react'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { IconArrowRight, IconArrowUpRight } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

export type BentoCardProps = {
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  badge?: ReactNode
  badgeClassName?: string
  href?: string
  target?: string
  rel?: string
  external?: boolean
  cta?: ReactNode
  ctaHref?: string
  ctaTarget?: string
  ctaRel?: string
  ctaExternal?: boolean
  ctaClassName?: string
  header?: ReactNode
  headerClassName?: string
  footer?: ReactNode
  footerClassName?: string
  className?: string
  innerClassName?: string
  featured?: boolean
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | string
  rowSpan?: 1 | 2 | 3 | 4 | string
  gradient?: boolean
  gradientAngle?: number
  gradientOpacity?: number
  gradientSpacing?: number
  gradientColor?: string
  animate?: boolean
  onClick?: (event: MouseEvent<HTMLElement>) => void
  children?: ReactNode
}

export type BentoGridProps = {
  children?: ReactNode
  items?: BentoCardProps[]
  className?: string
  gridClassName?: string
  cardClassName?: string
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | number
  gap?: string
  gradient?: boolean
  gradientAngle?: number
  gradientOpacity?: number
  gradientSpacing?: number
  gradientColor?: string
  positions?: string[]
}

const DEFAULT_POSITIONS = [
  'col-span-1 sm:col-span-1 lg:col-start-1 lg:col-span-1 lg:row-start-1 lg:row-span-1',
  'col-span-1 sm:col-span-1 lg:col-start-1 lg:col-span-1 lg:row-start-2 lg:row-span-1',
  'col-span-1 sm:col-span-2 lg:col-start-2 lg:col-span-2 lg:row-start-1 lg:row-span-2',
  'col-span-1 sm:col-span-1 lg:col-start-4 lg:col-span-1 lg:row-start-1 lg:row-span-1',
  'col-span-1 sm:col-span-1 lg:col-start-4 lg:col-span-1 lg:row-start-2 lg:row-span-1',
]

function isExternalUrl(url?: string): boolean {
  if (!url) return false
  return /^(?:https?:)?\/\//.test(url)
}

function BentoCardInner({
  title,
  description,
  icon,
  badge,
  badgeClassName,
  cta,
  ctaHref,
  ctaTarget,
  ctaRel,
  ctaExternal,
  ctaClassName,
  header,
  headerClassName,
  footer,
  footerClassName,
  children,
  featured,
  external,
}: Omit<
  BentoCardProps,
  | 'className'
  | 'innerClassName'
  | 'href'
  | 'target'
  | 'rel'
  | 'colSpan'
  | 'rowSpan'
  | 'gradient'
  | 'gradientAngle'
  | 'gradientOpacity'
  | 'gradientSpacing'
  | 'gradientColor'
  | 'animate'
  | 'onClick'
> & {
  external: boolean
}) {
  const isCtaExternal = ctaExternal ?? isExternalUrl(ctaHref)
  const resolvedCtaTarget =
    ctaTarget ?? (isCtaExternal ? '_blank' : undefined)
  const resolvedCtaRel =
    ctaRel ?? (isCtaExternal ? 'noopener noreferrer' : undefined)

  const ctaContent = cta && (
    <div
      className={cn(
        'relative z-10 mt-3.5 flex items-center gap-1.5 pt-0.5 text-[11px] font-medium text-muted/70 transition-[color,opacity] duration-200 ease-out group-hover:text-foreground group-hover:opacity-100 sm:text-xs',
        ctaClassName,
      )}
    >
      <span className="transition-colors duration-200 ease-out">{cta}</span>
      {isCtaExternal || external ? (
        <IconArrowUpRight
          size={13}
          className="inline-block shrink-0 text-muted/60 transition-[transform,color] duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground motion-reduce:transform-none"
        />
      ) : (
        <IconArrowRight
          size={12}
          className="inline-block shrink-0 text-muted/60 transition-[transform,color] duration-200 ease-out group-hover:translate-x-1 group-hover:text-foreground motion-reduce:transform-none"
        />
      )}
    </div>
  )

  return (
    <>
      <div className="relative z-10 flex flex-col">
        <div className="flex items-center justify-between gap-2">
          {icon && (
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg border border-border/40 bg-surface/30 text-foreground/75 transition-all duration-300 ease-out group-hover:border-foreground/20 group-hover:bg-surface/60 group-hover:text-foreground">
              <span className="inline-flex transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:-rotate-3 motion-reduce:transform-none">
                {icon}
              </span>
            </div>
          )}
          {badge && (
            <div
              className={cn(
                'mb-3 inline-flex items-center rounded-md border border-border/40 bg-surface/30 px-2 py-0.5 text-[10px] font-medium text-muted transition-colors group-hover:text-foreground',
                badgeClassName,
              )}
            >
              {badge}
            </div>
          )}
        </div>

        <h3
          className={cn(
            'font-display font-semibold tracking-tight text-foreground',
            featured
              ? 'text-sm sm:text-base lg:text-[17px]'
              : 'text-sm sm:text-[15px]',
          )}
        >
          {title}
        </h3>
        {description && (
          <p className="font-secondary mt-1.5 text-xs leading-relaxed text-muted/80 sm:text-[12.5px]">
            {description}
          </p>
        )}
      </div>

      {header && (
        <div
          className={cn(
            'relative z-10 my-3 flex-1 overflow-hidden rounded-xl transition-all duration-300 sm:my-3.5',
            featured
              ? 'min-h-[170px] sm:min-h-[190px] md:min-h-[210px] lg:min-h-[220px]'
              : 'min-h-[64px]',
            headerClassName,
          )}
        >
          {header}
        </div>
      )}

      {children && <div className="relative z-10 mt-3">{children}</div>}

      {footer && (
        <div className={cn('relative z-10 mt-3', footerClassName)}>
          {footer}
        </div>
      )}

      {cta &&
        (ctaHref ? (
          <Link
            href={ctaHref}
            target={resolvedCtaTarget}
            rel={resolvedCtaRel}
            className="relative z-20 inline-block focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            {ctaContent}
          </Link>
        ) : (
          ctaContent
        ))}
    </>
  )
}

export function BentoCard({
  title,
  description,
  icon,
  badge,
  badgeClassName,
  href,
  target,
  rel,
  external,
  cta,
  ctaHref,
  ctaTarget,
  ctaRel,
  ctaExternal,
  ctaClassName,
  header,
  headerClassName,
  footer,
  footerClassName,
  className,
  innerClassName,
  featured = false,
  colSpan,
  rowSpan,
  gradient = true,
  gradientAngle = 315,
  gradientOpacity = 0.012,
  gradientSpacing = 22,
  gradientColor = 'var(--foreground)',
  animate = true,
  onClick,
  children,
}: BentoCardProps) {
  const reduceMotion = useReducedMotion()
  const isExternal = external ?? isExternalUrl(href)
  const resolvedTarget = target ?? (isExternal ? '_blank' : undefined)
  const resolvedRel = rel ?? (isExternal ? 'noopener noreferrer' : undefined)

  const cardInnerClassName = cn(
    'relative flex h-full flex-1 flex-col justify-between overflow-hidden rounded-xl border p-4 transition-all duration-300 sm:p-5 lg:p-5 xl:p-6',
    'border-border/30 bg-background/65 group-hover:border-foreground/20 group-hover:bg-background/80',
    href &&
      'focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none',
    innerClassName,
  )

  const colSpanClass =
    typeof colSpan === 'number'
      ? `col-span-${colSpan}`
      : typeof colSpan === 'string'
        ? colSpan
        : undefined

  const rowSpanClass =
    typeof rowSpan === 'number'
      ? `row-span-${rowSpan}`
      : typeof rowSpan === 'string'
        ? rowSpan
        : undefined

  const cardGradientStyle: CSSProperties = gradient
    ? {
        backgroundImage: `repeating-linear-gradient(${gradientAngle}deg, ${gradientColor} 0px, ${gradientColor} 1px, transparent 1px, transparent ${gradientSpacing}px)`,
        opacity: gradientOpacity,
      }
    : {}

  const innerContent = (
    <>
      {gradient && (
        <div
          className="pointer-events-none absolute inset-0"
          style={cardGradientStyle}
        />
      )}
      <BentoCardInner
        title={title}
        description={description}
        icon={icon}
        badge={badge}
        badgeClassName={badgeClassName}
        cta={cta}
        ctaHref={ctaHref}
        ctaTarget={ctaTarget}
        ctaRel={ctaRel}
        ctaExternal={ctaExternal}
        ctaClassName={ctaClassName}
        header={header}
        headerClassName={headerClassName}
        footer={footer}
        footerClassName={footerClassName}
        featured={featured}
        external={isExternal}
      >
        {children}
      </BentoCardInner>
    </>
  )

  const motionProps =
    animate && !reduceMotion
      ? {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.45, ease: 'easeOut' as const },
        }
      : {}

  return (
    <motion.div
      {...motionProps}
      onClick={onClick}
      className={cn(
        'group relative flex h-full flex-col rounded-2xl border p-1 transition-all duration-300',
        'border-border/40 bg-surface/10 hover:border-foreground/20 hover:bg-surface/15',
        (href || onClick) && 'cursor-pointer',
        colSpanClass,
        rowSpanClass,
        className,
      )}
    >
      {href ? (
        <Link
          href={href}
          target={resolvedTarget}
          rel={resolvedRel}
          className={cardInnerClassName}
        >
          {innerContent}
        </Link>
      ) : (
        <div className={cardInnerClassName}>{innerContent}</div>
      )}
    </motion.div>
  )
}

export function BentoGrid({
  children,
  items,
  className,
  gridClassName,
  cardClassName,
  cols = 4,
  gap = 'gap-3 sm:gap-3.5 lg:gap-4',
  gradient = true,
  gradientAngle = 315,
  gradientOpacity = 0.01,
  gradientSpacing = 24,
  gradientColor = 'var(--foreground)',
  positions = DEFAULT_POSITIONS,
}: BentoGridProps) {
  const gridStyle: CSSProperties = gradient
    ? {
        backgroundImage: `repeating-linear-gradient(${gradientAngle}deg, ${gradientColor} 0px, ${gradientColor} 1px, transparent 1px, transparent ${gradientSpacing}px)`,
        opacity: gradientOpacity,
      }
    : {}

  const defaultGridClass =
    gridClassName ??
    cn(
      'relative grid grid-cols-1 sm:grid-cols-2 lg:grid-rows-[minmax(200px,1fr)_minmax(200px,1fr)]',
      cols === 1 && 'lg:grid-cols-1',
      cols === 2 && 'lg:grid-cols-2',
      cols === 3 && 'lg:grid-cols-3',
      cols === 4 && 'lg:grid-cols-4',
      cols === 5 && 'lg:grid-cols-5',
      cols === 6 && 'lg:grid-cols-6',
      gap,
    )

  return (
    <div className={cn('relative mx-auto w-full max-w-5xl', className)}>
      {gradient && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={gridStyle}
        />
      )}

      <div className={defaultGridClass}>
        {items
          ? items.map((item, index) => (
              <BentoCard
                key={typeof item.title === 'string' ? item.title : index}
                {...item}
                featured={item.featured ?? index === 2}
                className={cn(
                  positions[index % positions.length],
                  cardClassName,
                  item.className,
                )}
              />
            ))
          : Children.map(children, (child, index) => {
              if (!isValidElement<BentoCardProps>(child)) return child
              return cloneElement(child, {
                featured: child.props.featured ?? index === 2,
                className: cn(
                  positions[index % positions.length],
                  cardClassName,
                  child.props.className,
                ),
              })
            })}
      </div>
    </div>
  )
}

export default BentoGrid
