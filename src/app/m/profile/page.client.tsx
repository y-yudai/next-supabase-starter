'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'

export default function PageClient() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="flex flex-col items-center space-y-4">
            <div className="relative h-32 w-32">
              <Image
                src="https://placehold.jp/150x150.png"
                alt=""
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h1 className="text-center text-2xl font-bold text-gray-900">
              name
            </h1>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProfileInfoItem label="Email" value="xxx" />
            <ProfileInfoItem label="Location" value="xxx" />
            <ProfileInfoItem label="Joined" value="xxx" />
            <div>
              <h2 className="mb-2 text-lg font-semibold">Bio</h2>
              <p className="text-gray-600">XXX</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ProfileInfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  )
}
