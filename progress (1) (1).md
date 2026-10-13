# Portfolio and ISTMX Library Progress

Updated: 2026-10-10

This file records the work completed so far and distinguishes the UI foundation from features that still need implementation.

## AI component and block release update

- Added the source-first AI Chat Input to the Components library, including editable source, attachment and preview behavior, usage guidance, installation steps, dependency capsules, and API documentation. Its local source and CLI registry copies include the animated organic accent glow.
- Added the AI Chat block at `/blocks/ai-chat`, with its responsive preview, standalone full-preview route, component file map, dependency capsules, setup instructions, handler and streaming examples, attachment configuration, composition, API, accessibility notes, and limitations.
- Added the AI Chat Input and complete AI Chat block to the `@istmx/ui` CLI. The commands copy self-contained source folders and install missing Motion, Tabler Icons, `clsx`, and `tailwind-merge` dependencies. Added `streaming-text` to the CLI registry and README as well.
- Refined the composer and attachment-menu accent effect with a full soft halo, stronger noise displacement, uneven edge thickness, and a moving bright highlight. Kept the implementation local to the relevant files so copied components do not need another helper file.
- Added the dependency capsules to the block Installation section so both component and block pages identify the installed packages.
- Prepared `@istmx/ui@0.1.10` locally. The previous published version is `0.1.9`; `0.1.10` has not been published. Added the package MIT license and aligned the CLI version, package metadata, README command list, and registry contents.

## Portfolio structure and tooling

- Moved portfolio-specific React components into `app/portfolio-components/` and updated their imports.
- Moved the portfolio cat engine and site metadata into `app/portfolio-components/`.
- Kept the existing portfolio UI pieces in `app/portfolio-components/ui/`, following the direction that they belong with the portfolio because they are currently used there.
- Added `.prettierrc` with Tailwind class sorting through `prettier-plugin-tailwindcss`.
- Added `clsx`, `tailwind-merge`, and `lib/utils.ts` with the shared `cn()` helper.
- Added `@tabler/icons-react` for interface icons.

## ISTMX Library UI

- Added `/library` and `/library/[slug]` routes.
- Added the Library link to the existing desktop and mobile navigation. The Library remains inside the portfolio container and uses the existing navbar, footer, theme, fonts, and bottom scroll blur.
- Added a catalog with Shimmer Text, Animated Text, Layered Button, and Pixel Cat entries.
- Added a package-manager selector for npm, pnpm, yarn, and bun. It updates the `istmx add <component>` command, supports copying, and shows copy feedback.
- Added an animated, shimmering component name in the catalog command and detail pages with reduced-motion handling.
- Added draft detail pages with Preview/Code views, features, installation and manual-install instructions, usage examples, composition, API notes, data attributes, examples, and credits.
- Added Tabler icons for interface symbols and interactive controls, plus pointer cursors on clickable Library controls.
- Aligned the catalog and detail page typography, spacing, content width, separators, and component list with the portfolio’s editorial styles. The dotted separator below “Browse / All components” uses larger dots.
- Added `ScrollBlur` to both Library routes.
- Added the editable `components/ui/animated-text.tsx` component in a shadcn-inspired, source-first style. It supports composable blur, fade, shimmer, slide, and wave effects, configurable effect values, an adjustable scale prop, and reduced-motion preferences.
- Replaced the portfolio hero’s `AnimatedRole` with `AnimatedText` and updated the Animated Text library preview and API description to match its props.
- Removed placeholder Shimmer Text, Layered Button, and Pixel Cat entries from the Library catalog so it lists the implemented Animated Text component only.
- Added a collapsed, expandable Animated Text source block with syntax highlighting and copy feedback. Added animated Command/Manual installation tabs; the manual steps cover Motion, `clsx`, `tailwind-merge`, and the `cn` helper.
- Replaced the shimmer CSS in `globals.css` with Tailwind utility classes and Motion background-position animation in the components, including reduced-motion support.
- Added Geist Mono for code samples only and strengthened syntax token colors to match the supplied dark code reference while adapting to the site theme.
- Configured `--font-mono: var(--font-geist-mono)` in `@theme inline` in `app/globals.css` and applied explicit Geist Mono styling to [`app/portfolio-components/CodeBlock.tsx`](file:///workspaces/final_portfolio_repo/app/portfolio-components/CodeBlock.tsx), directly matching the reference screenshot (`image copy.png` / chanhda1.com).
- Increased the code font size in `CodeBlock.tsx` from `12px/13px` to `13.5px` on mobile and `14.5px` on desktop with `leading-[1.7]`, ensuring code text is comfortable, legible, and visually balanced.
- Re-architected [`app/portfolio-components/CodeBlock.tsx`](file:///workspaces/final_portfolio_repo/app/portfolio-components/CodeBlock.tsx) with a custom JSX/TSX state-aware lexer (`tokenizeCode()`) and token renderer (`TokenSpan`), mapping exact token colors to match the target reference:
  - JSX / HTML tags (`<AppleCarouselRoot>`, `</MotionLink>`): Warm Orange (`#fb923c`)
  - JSX attributes (`aria-label`, `prefix`, `href`, `initial`): Warm Yellow (`#fde047`)
  - Strings (`"Featured"`, `"blur"`, `"@/components/..."`): Emerald Green (`#4ade80`)
  - Language keywords (`import`, `from`, `const`, `return`, `export`): Pink / Magenta (`#f472b6`)
  - Function / method invocations (`motion.create`, `useState`): Sky Blue (`#38bdf8`)
  - Literals & numbers (`false`, `true`, numbers): Warm Peach (`#fdba74`)
  - TypeScript types & components (`AppleCarouselItem` in expressions): Teal (`#2dd4bf`)
  - Neutral punctuation (`<`, `>`, `/>`, `</`, `=`, `;`, `{}`): Subtle Gray (`#94a3b8`)
  - Identifiers and plain text: Warm off-white (`#e2e8f0`)
- Upgraded diff block handling: lines starting with `+` and `-` render markers in a dedicated left column (`#2dd4bf` for additions, `#fb7185` for removals with subtle line tints), while the actual code text is passed through the syntax highlighter rather than rendering as a monochromatic block.
- Extracted the project section bento card double border into reusable [`app/portfolio-components/DoubleBorderCard.tsx`](file:///workspaces/final_portfolio_repo/app/portfolio-components/DoubleBorderCard.tsx) and applied it across all sections of `/library/[slug]`, including preview cards, command containers, and content section frames.
- Implemented high-fidelity [`app/portfolio-components/CodeBlock.tsx`](file:///workspaces/final_portfolio_repo/app/portfolio-components/CodeBlock.tsx) matching the exact visual style of the reference screenshot (`image.png`): near-black background (`#09090b`), layered double-edge borders, subtle top-right copy icon, Geist Mono typography, and precise diff syntax with dedicated column alignment for `+` (bright cyan/teal-green) and `-` (muted/bright red) lines while preserving exact indentation. Added a migration diff example to the library documentation.
- Extracted the animated pill tab switcher into reusable [`app/portfolio-components/PillTabs.tsx`](file:///workspaces/final_portfolio_repo/app/portfolio-components/PillTabs.tsx) with spring motion and reduced-motion support, and applied it to both the Preview/Code view toggle and the Command/Manual installation method selector in [`LibraryItemDocumentation.tsx`](file:///workspaces/final_portfolio_repo/app/portfolio-components/library/LibraryItemDocumentation.tsx).
- Added the reusable [`PortfolioButton.tsx`](file:///workspaces/final_portfolio_repo/app/portfolio-components/PortfolioButton.tsx) for editorial links and action buttons. `PremiumLink` now wraps it with a compact double border, restrained neutral border shadow, subtle blurred hover treatment, and Tabler arrow. The code expand/collapse action uses the same portfolio button style with Tabler chevrons.
- Updated expandable code blocks to wrap long lines without a horizontal scrollbar and scroll back to the code block’s top when collapsed. Button hover and focus styling now uses neutral portfolio colors instead of blue accents.
- Tuned the reusable button’s neutral hover glow with theme-specific opacity so it remains visible in both light and dark themes.
- Prevented expandable source blocks from briefly rendering at full height before their collapsed height animates in when switching from Preview to Code.
- Styled Library dependency badges as icon capsules matching the profile’s inline technology treatment. Moved page backgrounds, scrolling behavior, dotted container separators, contribution cell colors, project hover glows, and navigation label shimmer to Tailwind utilities or component styles, leaving `globals.css` for theme tokens and effects that need custom masks or animated borders.
- Extended Animated Text with combinable `effects` (`blur`, `fade`, `shimmer`, `slide`, and per-character `wave`) while keeping the single `effect` prop as a compatible shorthand. Added an optional numeric `scale` prop and updated the Library preview, usage example, API details, and editable source.
- Added `effectOptions` so projects can tune blur radius, fade starting opacity, slide distance, shimmer sweep duration/width, and per-character wave amplitude/stagger.
- Removed the portfolio preloader from the root layout while retaining its component source. Updated Library imports and manual installation paths to use `components/ui/`.
- The package manager selector derives both CLI and dependency-install commands from the selected npm, pnpm, yarn, or bun option; the copy control copies the currently selected command.
- Added the dependency-free `@istmx/ui` package with the `istmx add animated-text` command. It writes editable source under `components/ui/`, creates `lib/utils.ts` if needed, detects the project's package manager, installs missing `motion`, `clsx`, and `tailwind-merge` dependencies, and displays a framed step-by-step terminal interface. It supports `--no-install` and `--overwrite`, and normalizes spaced component names to kebab-case.
- Made Animated Text shimmer colors configurable with `effectOptions.shimmer.color` and `highlight`, added CSS variable fallbacks for projects without portfolio theme tokens, and fixed the CLI test page's light-mode text contrast.
- Rewrote the `@istmx/ui` package README as a getting-started guide with the main portfolio website, package-manager commands, dependency behavior, Animated Text customization, and CLI options.
- Added a source-first `ImageAccordion` component in `components/ui/image-accordion.tsx` using React, Motion, Tailwind CSS, and the existing `cn` helper. It accepts any number of images, shows five cards by default, keeps the shared image-to-canvas transition, moves selected items to the back, and rotates later items into the visible stack. Its wrapper, stack, cards, preview, and images accept custom classes; the radial glow and spring values are configurable, and the glow can be disabled. It supports keyboard activation and reduced motion.
- Added Image Accordion to the Library catalog and `/library/image-accordion` detail page with a live preview, editable source, usage and migration examples, composition, and API documentation for `visibleCount`, class props, per-image classes, glow, spring transition, and image fields. Reused the five supplied preview URLs through shared demo data.
- Added Image Accordion to the `@istmx/ui` CLI registry. `npx @istmx/ui add image-accordion` now copies the editable source to `components/ui/image-accordion.tsx`; the CLI component list/help is generated from the registry. Updated the package README and prepared version `0.1.3` locally; it has not been published.
- Added a reusable `DockNavigation` source component in `components/ui/dock-navigation.tsx` and a separate `/test` demo section. The dock supports custom icons, labels, links, active-item indication, class overrides, pointer-proximity magnification with an elastic upward lift, moving tooltips with spacing through the lift, tap feedback, and reduced-motion preferences. Added a configurable radial glow and restrained metallic sheen. Image Accordion remains below the Scroll Story Cards demo; the stale Pixel Pets preview reference was removed because its playground component is no longer present.
- Added Dock Navigation to the Library catalog and detail page with a live preview, editable source, usage and migration examples, composition, and API documentation. Registered it in the `@istmx/ui` CLI and package README; the CLI installs `@tabler/icons-react` for the documented icon example. Prepared package version `0.1.4` locally; it has not been published.
- Expanded the Dock Navigation Library preview and examples to five labeled items so the magnification behavior is clear across the full dock.
- Refined Scroll Story Cards in `components/ui/scroll-story-cards.tsx` with a 400vh pinned timeline that releases directly into following content. The `/test` hero has an editorial title, larger supporting copy, and a softly shifting pastel backdrop. Moving cards are narrower and shorter, with a near-square tinted portrait, a location/index label, full story descriptions, and a premium Tabler arrow CTA. Responsive layouts keep copy and buttons separate; portrait/text proportions adapt for mobile. Cards layer above the hero text and use subtle reduced-motion-aware parallax, image scaling, and button feedback. The five supplied portrait URLs replace the earlier demo images, and separated dock previews fade away as the first story enters.
- Added a five-image female portrait demo to `/test` and the Library preview, with editable card data, image alt text, unique light pastel purple/green/yellow/blue/pink colors, location labels, and per-card CTAs. Added the Scroll Story Cards detail entry with usage, features, composition, prop reference, and source.
- Registered Scroll Story Cards in the CLI source registry and README. Prepared `@istmx/ui` version `0.1.5` locally; it has not been published.
- Completed the Pixel Cat Library entry with the complete `PixelCatProps` API (including `style`), clarified breed/position behavior, and exposed all six coat palettes plus every pose in its interactive preview. Added Pixel Cat to the CLI registry and README; prepared `@istmx/ui@0.1.6` locally, not published.
- Updated the portfolio navbar with an `istmX` wordmark, an external GitHub link to this repository, and a flat search control that opens searchable Library results with `/` and `Ctrl+K` shortcuts. Removed the redundant Home nav item and renamed Library to Components. Moved the homepage Components index after GitHub Contributions and restyled it as a thin-lined icon grid; the Projects grid remains in place.
- Matched the Components callout to the reference with a small Tabler curved arrow, added a fixed mobile bottom dock for About, Projects, Components, GitHub, and component search, and left safe-area space below the mobile footer so the dock does not cover its content. Replaced the theme switcher's inline SVGs with Tabler icons.
- Replaced the mobile header hamburger and icon dock with a reusable floating `MobileMenuDock`: its bottom search filters the same component catalog as desktop search, while its menu toggle opens the site sections. The Chánh Đại inspiration credit now appears in the homepage Components section.
- Added Mobile Menu Dock as an ISTMX Library component with a catalog entry, searchable detail page, live preview, editable source, props, usage, and migration notes. Registered `mobile-menu-dock` in the `@istmx/ui` CLI at local version 0.1.7 and documented its install command; it has not been published to npm.
- Fixed the Mobile Menu Dock Library preview: added a `placement="inline"` mode so it renders inside the preview at desktop widths while the default fixed, mobile-only placement remains unchanged in real usage.
- Made Scroll Story Cards responsive in the Library and `/test`: portrait cards use a compact two-column phone layout, fit their full copy without an internal scrollbar, and cap at 620px wide with a fixed 17rem desktop height. The hero title and supporting copy scale down with viewport width. Added a fullscreen preview control to Library component pages; the fullscreen story gets its own scroll container and closes with Escape. The 400vh scene releases directly into the next section without an extra viewport spacer.
- Fixed the package-manager selector shared by the catalog and component detail pages. Its four choices now render in a viewport-level menu above the control when space allows, so the card's clipped overflow no longer hides yarn and bun.
- Kept the “All components” link at the top left of each Library detail page and added compact previous/next component links on the right. Navigation wraps between the first and last component.
- Added a `cli-test` page importing the generated `components/ui/animated-text.tsx` source, with blur, fade, and shimmer effects to demonstrate direct editing in the consuming app.
- Started a technical SEO and entity pass: Aryan is the primary Person entity; `aryanonai` and `istmX` are alternate identifiers tied to the same public profiles and GitHub identity. The homepage now exposes `@istmX` beside Aryan’s name and identifies ISTMX as an ecosystem created by Aryan.
- Added ProfilePage, Person, WebSite, and ISTMX CreativeWork structured data on the homepage. The ISTMX entity links to the actual ISTMX Skills site/repository, ISTMX UI npm package, and local component library; it is not represented as an organization.
- Added unique titles, descriptions, canonicals, social metadata, and crawlable documentation details for all six component pages. Component pages expose source links, features, interaction details, accessibility behavior, limitations, installation, usage, and APIs, plus matching visible and structured breadcrumbs.
- Added BlogPosting and BreadcrumbList data to article pages with Aryan as the linked author. Publish dates were omitted because the article data does not contain verified dates. Added dynamic, component-specific Open Graph images for Library detail pages.
- Updated the dynamic sitemap with the homepage, Library, all six component URLs, Writing, and every public article. Robots allows public crawling; the playground and Cat Home stay out of the sitemap and carry noindex directives.
- Replaced the generic generated search guide with `public/llms.txt` describing the actual identity, projects, public profiles, canonical component pages, and source repository. Configured Next image optimization for Unsplash article covers.

## Status and remaining work

- The Components library includes Button, Animated Text, Text Reveal, Streaming Text, AI Chat Input, Image Accordion, Infinite Image Canvas, Image Trail, Dock Navigation, Mobile Menu Dock, Scroll Story Cards, and Pixel Cat. The Blocks catalog includes AI Chat.
- The CLI registry and README cover the library components and AI Chat block. Package version `0.1.10` is prepared locally and has not been published; the npm registry currently lists `0.1.9` as latest.
- The token-plan utility described in `WhatsNEw.md` is not implemented yet.
- The homepage Projects section still uses its existing layout; the planned compact project-list redesign has not been done.
- No end-to-end visual review across desktop, mobile, light/dark themes, and reduced-motion settings has been completed.

## Checks run

- TypeScript check (`npx tsc --noEmit`) passed with zero errors after the CodeBlock lexer, typography, and font sizing updates.
- Targeted ESLint check (`npx eslint app/portfolio-components/CodeBlock.tsx`) passed with zero warnings or errors.
- Prettier (`npx prettier --write ...`) and `git diff --check` passed cleanly across modified files.
- The `cli-test` TypeScript check passed after wiring in Animated Text and fixing its theme contrast. A local CLI smoke check confirmed that `add animated text --no-install` normalizes the name and writes both source files. `npm pack --dry-run` confirmed the `@istmx/ui@0.1.2` tarball contents.
- The root TypeScript check passed after adding Image Accordion documentation and the CLI registry. CLI `--help` and `--version` report both components and version `0.1.3`; the embedded Library source was checked against `components/ui/image-accordion.tsx`, and `git diff --check` passed.
- The root TypeScript check passed after adding Scroll Story Cards. The CLI registry source matches `components/ui/scroll-story-cards.tsx`, and `git diff --check` passed. Targeted ESLint reported no errors; its two warnings are Next.js advisory notices for the component's native `<img>` tags, retained to keep remote image use configuration-free.
- A full lint run previously reported existing `react-hooks/set-state-in-effect` errors in `GitHubContributions.tsx`, `IndiaClock.tsx`, and `ThemeToggle.tsx`.
- An earlier production build attempt stalled; a later configured `npm run build` completed successfully, as recorded below.
- npm reported five high-severity audit findings during dependency installation; they have not been addressed as part of this work.
- SEO pass validation: the configured `npm run build` completed successfully with Next.js 16.3.8 / Turbopack and generated all six Library detail pages plus the dynamic component Open Graph image route. `npx tsc --noEmit` passes. Targeted ESLint on the SEO/documentation files passes. Full lint still reports the three existing set-state-in-effect errors listed above and two `<img>` advisories in Scroll Story Cards.
- Inspected built HTML for the homepage, Library, representative component and article pages, the playground, Cat Home, and 404. Public pages have unique titles/descriptions and self-canonicals; playground, Cat Home, and 404 are noindex and no longer inherit the homepage canonical. Structured data scripts on indexed sample pages parse as JSON. The generated sitemap includes the six component pages and excludes `/test`; robots allows crawlers to read each page’s index directive.
- The new component OG route appears in production output and its per-component image URLs are in rendered metadata. A localhost HTTP smoke check was unavailable because the execution environment would not keep the server process reachable across tool calls; the production build generated the routes and static metadata successfully.
- Prettier and `git diff --check` passed for the changed code and documentation files. `public/llms.txt` is plain text and is excluded from Prettier checks because no parser is configured for `.txt`.
- Package release check: `npm pack --dry-run --json` reports `@istmx/ui@0.1.10` and includes 40 files: the CLI, README, MIT license, and all registry files, including both AI Chat commands. CLI `--help` lists the newly registered commands and `--version` reports `0.1.10`. Prettier and `git diff --check` passed. No application test suite or production build was run for this update.
