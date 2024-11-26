"use client"

import Image from 'next/image'
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function PageClient() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="flex flex-col items-center space-y-4">
            <div className="relative w-32 h-32">
              <Image
                src="https://placehold.jp/150x150.png"
                alt=""
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-900">name</h1>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProfileInfoItem label="Email" value="xxx" />
            <ProfileInfoItem label="Location" value="xxx" />
            <ProfileInfoItem label="Joined" value="xxx" />
            <div>
              <h2 className="text-lg font-semibold mb-2">Bio</h2>
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