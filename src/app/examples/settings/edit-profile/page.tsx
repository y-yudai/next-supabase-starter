import type { Metadata } from 'next'
import PageClient from './page.client'

export function generateMetadata(): Metadata {
  return {
    title: ``,
  }
}

export default function EditProfile() {
  return (
    <div>
      <PageClient />
    </div>
  )
}
