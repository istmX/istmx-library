import type { Metadata } from 'next'
import { Geist_Mono, Schibsted_Grotesk, Inter } from 'next/font/google'
import ScrollToHome from '@/app/portfolio-components/ScrollToHome'
import ThemeInit from '@/app/portfolio-components/ThemeInit'
import { SITE_URL } from '@/app/portfolio-components/site'
import './globals.css'

const Grotesk = Schibsted_Grotesk({
  variable: '--font-schibsted-grotesk',
  subsets: ['latin'],
})

const InterFont = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const GeistMonoFont = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Aryan (istmX) — Full-Stack Developer & AI Engineer',
    template: '%s | Aryan (istmX)',
  },
  description:
    'Aryan is the person behind the developer identity istmX. Full-stack developer and AI engineer building ISTMX Skills, ISTMX UI, Crew, CodeCat, and AI-powered developer tools.',
  applicationName: 'Aryan (istmX) Portfolio',
  authors: [{ name: 'Aryan', url: SITE_URL }],
  creator: 'Aryan',
  category: 'technology',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Aryan (istmX) — Portfolio',
    title: 'Aryan (istmX) — Full-Stack Developer & AI Engineer',
    description:
      'Aryan is the person behind the developer identity istmX. Full-stack developer and AI engineer building ISTMX Skills, ISTMX UI, Crew, CodeCat, and AI-powered developer tools.',
    locale: 'en_IN',
    images: [
      {
        url: '/hero.png',
        width: 1536,
        height: 1536,
        alt: 'Portrait of Aryan (istmX)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aryan (istmX) — Full-Stack Developer & AI Engineer',
    description:
      "I'm Aryan, a full-stack developer and AI engineer working on AI-powered applications, developer tools, and thoughtful software experiences.",
    images: ['/hero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'googlebcdf164ce86ae3d1',
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${Grotesk.variable} ${InterFont.variable} ${GeistMonoFont.variable} h-full scroll-smooth antialiased motion-reduce:scroll-auto`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground font-secondary flex min-h-full flex-col overflow-x-clip">
        <ThemeInit />
        <ScrollToHome />
        {children}
      </body>
    </html>
  )
}
