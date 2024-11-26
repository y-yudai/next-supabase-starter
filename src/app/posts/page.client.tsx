'use client'
import Link from 'next/link'

export default function PageClient() {

  return (
    <main className="mx-auto flex justify-center mt-12 w-full">
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Posts</h1>
      <ul className="space-y-6">
        <li>
          <Link href={`/posts/1/`} className="flex space-x-4 items-start border-b pb-6">
            <img src="https://placehold.jp/200x120.png" alt="" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Post Name</h2>
            </div>
          </Link>
        </li>
      </ul>
    </div>
    </main>
  )
}