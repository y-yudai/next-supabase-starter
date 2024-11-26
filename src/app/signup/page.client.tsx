"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
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

    /* 新規登録処理 */
    const handleSignUp = async () => {
    }

  return (
    <main className="mx-auto max-w-screen-md flex justify-center mt-12">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your email below to create your account</CardDescription>
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
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button onClick={handleSignUp} className='w-full'> Sign up with Email</Button>
          <p className='text-sm text-muted-foreground mt-2'>Already have an account ? <a href="/signin" className='text-black underline'>Sign in</a></p>
        </CardFooter>
      </Card>
    </main>
  );
}