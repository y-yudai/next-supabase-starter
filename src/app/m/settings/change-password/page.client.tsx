"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PageClient() {
  /* 新しいパスワード */
  const [newPassword, setNewPassword] = useState("")
  /* 確認用パスワード */
  const [confirmPassword, setConfirmPassword] = useState("")

  /* パスワード変更処理 */
  const changePassword = async () => {
  }

  return (
    <main className="mx-auto max-w-screen-md flex justify-center mt-12">
      <div className="w-[350px]">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className='w-full' onClick={changePassword} > Reset passowrd</Button>
        </CardFooter>
      </div>
    </main>
  )
}