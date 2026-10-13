export const COMPONENT_SEARCH_ITEMS = [
  {
    name: 'Button',
    slug: 'button',
    href: '/library/button',
    category: 'Controls',
    description:
      'A motion-ready button with practical variants, sizes, and link support.',
  },
  {
    name: 'Animated Text',
    slug: 'animated-text',
    href: '/library/animated-text',
    category: 'Text',
    description:
      'Combine configurable blur, fade, shimmer, slide, and wave effects.',
  },
  {
    name: 'Text Reveal',
    slug: 'text-reveal',
    href: '/library/text-reveal',
    category: 'Text',
    description:
      'Reveal text line by line with a soft blur, character wave, and scroll-linked control.',
  },
  {
    name: 'Streaming Text',
    slug: 'streaming-text',
    href: '/library/streaming-text',
    category: 'AI',
    description:
      'Stream an AI response character by character with blur, wave, and a blinking caret.',
  },
  {
    name: 'Infinite Image Canvas',
    slug: 'infinite-image-canvas',
    href: '/library/infinite-image-canvas',
    category: 'Media',
    description:
      'A pannable, endless image grid with spring motion and image labels.',
  },
  {
    name: 'Image Trail',
    slug: 'image-trail',
    href: '/library/image-trail',
    category: 'Media',
    description:
      'A throttled trail of animated image cards that follows pointer movement.',
  },
  {
    name: 'Image Accordion',
    slug: 'image-accordion',
    href: '/library/image-accordion',
    category: 'Image',
    description: 'A reorderable image stack with a scrollable visual canvas.',
  },
  {
    name: 'Dock Navigation',
    slug: 'dock-navigation',
    href: '/library/dock-navigation',
    category: 'Navigation',
    description: 'An elastic icon dock with proximity-based magnification.',
  },
  {
    name: 'Mobile Menu Dock',
    slug: 'mobile-menu-dock',
    href: '/library/mobile-menu-dock',
    category: 'Navigation',
    description:
      'A searchable mobile navigation dock with a compact section menu.',
  },
  {
    name: 'Scroll Story Cards',
    slug: 'scroll-story-cards',
    href: '/library/scroll-story-cards',
    category: 'Scroll',
    description: 'A scroll-scrubbed sequence of image-led story cards.',
  },
  {
    name: 'Pixel Cat',
    slug: 'pixel-cat',
    href: '/library/pixel-cat',
    category: 'Interactive',
    description: 'A customizable pixel cat that explores its container.',
  },
  {
    name: 'Bento Grid',
    slug: 'bento-grid',
    href: '/library/bento-grid',
    category: 'Layout',
    description:
      'A configurable 2-1-2 bento grid with concentric borders, 315° repeating gradient texture, and action links.',
  },
  {
    name: 'Scroll Parallax Hero',
    slug: 'scroll-parallax-hero',
    href: '/library/scroll-parallax-hero',
    category: 'Hero',
    description:
      'A scroll-driven perspective reveal hero with floating parallax cards, expanding image frame, and narrative features.',
  },
] as const

export const SITE_SEARCH_ITEMS = [
  ...COMPONENT_SEARCH_ITEMS,
  {
    name: 'AI Chat',
    slug: 'ai-chat',
    href: '/blocks/ai-chat',
    category: 'AI block',
    description:
      'A complete assistant chat with streaming replies, file attachments, and conversation controls.',
  },
] as const
