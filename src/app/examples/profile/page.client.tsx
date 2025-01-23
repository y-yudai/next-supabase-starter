'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import useUserStore from '@/store/user-account'

export default function PageClient() {
  const { userAccount, fetchUserAccountByEmail, uploadUserImageById, updateUserAccountById } = useUserStore()
  const [loading, setLoading] = useState(true)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (userAccount?.email) {
      fetchUserAccountByEmail(userAccount.email)
          .then(() => setLoading(false))
          .catch((error) => {
            console.error('Error fetching user:', error)
            setLoading(false)
          })
    } else {
      setLoading(false)
    }
  }, [userAccount?.email, fetchUserAccountByEmail])

  if (loading) return <div>Loading...</div>

  const handleEditProfile = () => {
    router.push('/examples/settings/edit-profile')
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFile(event.target.files[0])
    }
  }

  const handleUploadImage = async () => {
    if (imageFile && userAccount) {
      try {
        await uploadUserImageById(userAccount.id, imageFile);
        setImageFile(null);
        await fetchUserAccountByEmail(userAccount.email);
        alert('Profile image updated successfully!');
      } catch (error) {
        alert('Failed to update profile image');
      }
    } else {
      alert('Please select an image first.');
    }
  }

  return (
      <div className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardHeader className="flex flex-col items-center space-y-4">
              <div className="relative h-32 w-32">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="profileImageInput"
                />
                <Image
                    src={`${userAccount?.profile_picture || "https://placehold.jp/150x150.png"}?t=${new Date().getTime()}`}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover cursor-pointer"
                    onClick={() => document.getElementById('profileImageInput')?.click()}
                />
              </div>
              {imageFile && (
                  <Button onClick={handleUploadImage} className="mt-2 bg-blue-500 text-white">
                    Upload New Profile Picture
                  </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <ProfileInfoItem label="Email" value={userAccount.email} />
              <ProfileInfoItem label="FirstName" value={userAccount.first_name} />
              <ProfileInfoItem label="LastName" value={userAccount.last_name} />
              <ProfileInfoItem label="Country" value={userAccount.country_name} />
              <ProfileInfoItem label="Zip" value={userAccount.zip} />
              <ProfileInfoItem label="Address" value={userAccount.address1} />
              <ProfileInfoItem label="Tel" value={userAccount.tel} />
              <ProfileInfoItem label="Gender" value={userAccount.gender} />
              <ProfileInfoItem label="Birthday" value={userAccount.birthday} />
            </CardContent>
            <div className="flex justify-center mt-4">
              <Button onClick={handleEditProfile} className="bg-blue-500 text-white">
                Change Profile
              </Button>
            </div>
          </Card>
        </div>
      </div>
  )
}

function ProfileInfoItem({ label, value }: { label: string; value: string | null }) {
  return (
      <div>
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900">{value}</dd>
      </div>
  )
}