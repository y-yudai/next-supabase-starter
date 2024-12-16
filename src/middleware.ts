import { createServerClient } from '@/utils/supabase/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const next = NextResponse.next()
  const supabase = await createServerClient()
  const { data } = await supabase.auth.getSession()
  const publicPath = ['/examples/signin', '/examples/signup']
  const privatePath = ['/examples/todo-list']

  if (!data.session && privatePath.some((path) => request.url.includes(path))) {
    return NextResponse.redirect(new URL('/examples/signin', request.url))
  }
  if (data.session && publicPath.some((path) => request.url.includes(path))) {
    return NextResponse.redirect(new URL('/examples/todo-list', request.url))
  }
  return next
}
