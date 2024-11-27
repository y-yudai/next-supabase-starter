import type { Metadata } from 'next'
import PageClient from './page.client'

export function generateMetadata(): Metadata {
  return {
    title: ``,
  }
}

export default function Post({ params }: { params: { slug: string } }) {
  return (
    <div>
      <PageClient params={params} />
    </div>
  )
}
