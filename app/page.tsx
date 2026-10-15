import Navbar from '@/app/portfolio-components/Navbar'
import Contanier from '@/app/portfolio-components/Contanier'
import IntroHero from '@/app/portfolio-components/IntroHero'
import ComponentsSpotlight from '@/app/portfolio-components/ComponentsSpotlight'
import SocialLinks from '@/app/portfolio-components/SocialLinks'
import ClickSparks from '@/app/portfolio-components/ClickSparks'
import ScrollBlur from '@/app/portfolio-components/ScrollBlur'
import PixelCat from '@/app/portfolio-components/PixelCat'
import ProjectsSection from '@/app/portfolio-components/ProjectsSection'
import TechStackSection from '@/app/portfolio-components/TechStackSection'
import GitHubContributions from '@/app/portfolio-components/GitHubContributions'
import BlogsSection from '@/app/portfolio-components/BlogsSection'
import ClosingNote from '@/app/portfolio-components/ClosingNote'
import PortfolioFooter from '@/app/portfolio-components/PortfolioFooter'
import { SITE_URL } from '@/app/portfolio-components/site'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aryan (istmX) — Full-Stack Developer & AI Engineer',
  description:
    'Aryan is the person behind the developer identity istmX. Full-stack developer and AI engineer building ISTMX Skills, ISTMX UI, Crew, CodeCat, and AI-powered developer tools.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: SITE_URL,
    siteName: 'Aryan (istmX) — Portfolio',
    title: 'Aryan (istmX) — Full-Stack Developer & AI Engineer',
    description:
      'Aryan is the person behind the developer identity istmX. Full-stack developer and AI engineer building ISTMX Skills, ISTMX UI, Crew, CodeCat, and AI-powered developer tools.',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aryan (istmX) — Full-Stack Developer & AI Engineer',
    description:
      'Aryan is the person behind the developer identity istmX. Full-stack developer and AI engineer building ISTMX Skills, ISTMX UI, Crew, CodeCat, and AI-powered developer tools.',
  },
}

const personId = `${SITE_URL}/#aryan`
const websiteId = `${SITE_URL}/#website`
const istmxId = `${SITE_URL}/#istmx`
const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profile`,
      url: SITE_URL,
      name: 'Aryan (istmX) — Full-Stack Developer & AI Engineer',
      description:
        'Official personal profile of Aryan, the person behind the developer identity istmX.',
      mainEntity: { '@id': personId },
      isPartOf: { '@id': websiteId },
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: 'Aryan',
      givenName: 'Aryan',
      additionalName: 'istmX',
      alternateName: ['istmX', 'Aryan istmX', 'istmx'],
      disambiguatingDescription:
        'Aryan (known online as istmX) is an Indian full-stack developer and AI engineer. He is the author and creator of the open-source ISTMX developer ecosystem (ISTMX Skills, ISTMX UI, istmx-library) and autonomous AI platforms including Crew and CodeCat. Distinct from any other individual named Aryan.',
      identifier: {
        '@type': 'PropertyValue',
        name: 'Developer handle',
        value: 'istmX',
      },
      url: SITE_URL,
      image: `${SITE_URL}/hero.png`,
      jobTitle: 'Full-Stack Developer & AI Engineer',
      nationality: {
        '@type': 'Country',
        name: 'India',
      },
      homeLocation: {
        '@type': 'Place',
        name: 'India',
      },
      description:
        'Aryan is the person behind the developer identity istmX. He is a full-stack developer and AI engineer building developer tools, autonomous AI agents, and the open-source ISTMX ecosystem (ISTMX Skills, ISTMX UI, and the ISTMX Component Library).',
      sameAs: [
        'https://github.com/istmX',
        'https://www.linkedin.com/in/aryan-xf/',
        'https://x.com/Istm_x',
        'https://www.npmjs.com/~istmx',
        'https://www.npmjs.com/package/@istmx/ui',
      ],
      knowsAbout: [
        'Artificial Intelligence',
        'Autonomous AI Agents',
        'Multi-Agent Systems',
        'LangChain',
        'LangGraph',
        'RAG (Retrieval-Augmented Generation)',
        'Vector Databases',
        'Qdrant',
        'Full-Stack Development',
        'Frontend Engineering',
        'Backend Engineering',
        'Mobile App Development',
        'Python',
        'FastAPI',
        'Pydantic',
        'TypeScript',
        'JavaScript',
        'React',
        'Next.js',
        'React Native',
        'Expo',
        'Tailwind CSS',
        'Motion',
        'GSAP',
        'Lenis',
        'Node.js',
        'Express',
        'PostgreSQL',
        'Neon',
        'MongoDB',
        'Prisma',
        'SQLAlchemy',
        'Docker',
        'AWS',
        'Vercel',
        'Git',
        'GitHub',
      ],
      creator: { '@id': istmxId },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: SITE_URL,
      name: 'Aryan — istmX Portfolio',
      alternateName: 'istmX Portfolio',
      inLanguage: 'en',
      about: { '@id': personId },
      publisher: { '@id': personId },
    },
    {
      '@type': 'CreativeWork',
      '@id': istmxId,
      name: 'ISTMX',
      description:
        'ISTMX is an open-source developer ecosystem created by Aryan (istmX). Its products include ISTMX Skills, the ISTMX UI CLI tool, and the istmx-library web component catalog.',
      url: `${SITE_URL}/library`,
      author: { '@id': personId },
      creator: { '@id': personId },
      isPartOf: { '@id': websiteId },
      hasPart: [
        {
          '@type': 'SoftwareApplication',
          name: 'ISTMX Skills',
          description:
            'Reusable skills and structured workflows for AI coding agents.',
          applicationCategory: 'DeveloperApplication',
          url: 'https://istmx.dpdns.org/',
          codeRepository: 'https://github.com/istmX/skills',
          author: { '@id': personId },
          creator: { '@id': personId },
        },
        {
          '@type': 'SoftwareApplication',
          name: 'ISTMX UI',
          description:
            'A source-first CLI developer tool that installs editable UI components into React and Tailwind CSS projects.',
          applicationCategory: 'DeveloperApplication',
          url: 'https://www.npmjs.com/package/@istmx/ui',
          codeRepository: 'https://github.com/istmX/istmx-library',
          documentation: `${SITE_URL}/library`,
          author: { '@id': personId },
          creator: { '@id': personId },
        },
        {
          '@type': 'CollectionPage',
          name: 'istmx-library (ISTMX Component Library)',
          description:
            'The official web documentation, live interactive previews, and copyable source code for all ISTMX components, maintained by Aryan (istmX).',
          url: `${SITE_URL}/library`,
          codeRepository: 'https://github.com/istmX/istmx-library',
          author: { '@id': personId },
          creator: { '@id': personId },
        },
      ],
    },
  ],
}
const safeHomeSchema = JSON.stringify(homeSchema).replace(/</g, '\\u003c')

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeHomeSchema }}
      />
      <main id="top" className="min-h-dvh">
        <Contanier>
          <Navbar />
          <IntroHero />
          <SocialLinks />
          <TechStackSection />
          <GitHubContributions />
          <ComponentsSpotlight />
          <ProjectsSection />
          <BlogsSection />
          <ClosingNote />
        </Contanier>
      </main>
      <PortfolioFooter />
      <ClickSparks />
      <ScrollBlur />
      <PixelCat />
    </>
  )
}
