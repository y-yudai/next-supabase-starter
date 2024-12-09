'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export default function PageClient() {
  /* メールアドレス */
  const [email, setEmail] = useState('')
  /* パスワード */
  const [password, setPassword] = useState('')

  /* 新規登録処理 */
  const handleSignUp = async () => {}

  return (
    <main className="mx-auto mt-12 flex max-w-screen-md justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button onClick={handleSignUp} className="w-full">
            {' '}
            Sign up with Email
          </Button>
          <p className="mt-2 text-sm text-muted-foreground">
            Already have an account ?{' '}
            <a href="/signin" className="text-black underline">
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
