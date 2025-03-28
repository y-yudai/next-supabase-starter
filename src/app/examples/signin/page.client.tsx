'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuthStore from '@/store/auth'
import useUserStore from '@/store/user-account'

export default function PageClient() {
  const router = useRouter()
  const { login } = useAuthStore()
  const { fetchUserAccountById } = useUserStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSignIn = async () => {
    try {
      const { data, error } = await login(email, password)
      await fetchUserAccountById(data.user.id)
      router.push('/examples/todo-list')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="mx-auto mt-12 flex max-w-screen-md justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Log in to App</CardTitle>
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
                  placeholder=""
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button onClick={handleSignIn} className="w-full">
            {' '}
            Log in with Email
          </Button>
          <p className="mt-2 text-sm text-muted-foreground">
            {`Don't have an account yet?`}{' '}
            <a href="/examples/signup" className="text-black underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}
