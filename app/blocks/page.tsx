import type { Metadata } from 'next'
import BlocksCatalog from '@/app/portfolio-components/blocks/BlocksCatalog'
import Contanier from '@/app/portfolio-components/Contanier'
import Navbar from '@/app/portfolio-components/Navbar'
import PortfolioFooter from '@/app/portfolio-components/PortfolioFooter'
import ScrollBlur from '@/app/portfolio-components/ScrollBlur'
import { SITE_URL } from '@/app/portfolio-components/site'

import { BLOCK_ITEMS } from '@/app/portfolio-components/blocks/block-items'

export const metadata: Metadata = {
  title: 'ISTMX Blocks — Ready-to-Preview UI Patterns',
  description:
    'Explore ready-to-preview interface blocks built from editable ISTMX components by Aryan (istmX).',
  alternates: { canonical: '/blocks' },
  authors: [{ name: 'Aryan', url: SITE_URL }],
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/blocks`,
    siteName: 'Aryan (istmX) — Portfolio',
    title: 'ISTMX Blocks — Ready-to-Preview UI Patterns',
    description:
      'Explore ready-to-preview interface blocks built from editable ISTMX components by Aryan (istmX).',
    locale: 'en_IN',
  },
}

export default function BlocksPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/blocks#page`,
    name: 'ISTMX Blocks — Ready-to-Preview UI Patterns',
    description: metadata.description,
    url: `${SITE_URL}/blocks`,
    author: { '@id': `${SITE_URL}/#aryan` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: BLOCK_ITEMS.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: `${SITE_URL}/blocks`,
        description: item.description,
      })),
    },
  }
  const safeCollectionSchema = JSON.stringify(collectionSchema).replace(
    /</g,
    '\\u003c',
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeCollectionSchema }}
      />
      <main className="min-h-dvh">
        <Contanier>
          <Navbar />
          <BlocksCatalog />
        </Contanier>
      </main>
      <PortfolioFooter />
      <ScrollBlur />
    </>
  )
}
