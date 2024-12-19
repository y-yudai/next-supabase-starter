'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/auth'
import useUserStore from '@/store/user-account'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function PageClient() {
  const router = useRouter()
  const { updatePassword, logout } = useAuthStore()
  const { clearUserAccount } = useUserStore()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    try {
      await updatePassword(newPassword)
      await clearUserAccount()
      await logout()
      router.push('/examples/signin');
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="mx-auto flex max-w-screen-md justify-center">
      <div className="w-full">
        <h2 className='font-bold text-lg'>Change Password</h2>
        <div className="mt-6">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder=""
                />
              </div>
            </div>
          </form>
          <Button className="w-full mt-4" onClick={changePassword}>
            {' '}
            Save
          </Button>
        </div>
      </div>
    </main>
  )
}
