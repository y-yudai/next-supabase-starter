"use client"

import { useState } from "react"
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

  /* メールアドレス */
  const [email, setEmail] = useState("")
  /* パスワード */
  const [password, setPassword] = useState("")

  /* ログイン処理 */
  const handleSignIn = async () => {
  }

  return (
    <main className="mx-auto max-w-screen-md flex justify-center mt-12">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Log in to App</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="m@example.com" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button onClick={handleSignIn} className='w-full'> Log in with Email</Button>
          <p className='text-sm text-muted-foreground mt-2'>{`Don't have an account yet?`} <a href="/signup" className='text-black underline'>Sign up</a></p>
        </CardFooter>
      </Card>
    </main>
  )
}