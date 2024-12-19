import { createServerClient } from '@/utils/supabase/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/examples/signin', '/examples/signup']
const PRIVATE_PATHS = ['/examples/todo-list', '/examples/settings/edit-profile']

function isPublicPath(url: string): boolean {
  return PUBLIC_PATHS.some((path) => url.includes(path))
}

function isPrivatePath(url: string): boolean {
  return PRIVATE_PATHS.some((path) => url.includes(path))
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const supabase = await createServerClient()
  const { data } = await supabase.auth.getSession()

  if (!data.session && isPrivatePath(request.url)) {
    return NextResponse.redirect(new URL('/examples/signin', request.url))
  }

  if (data.session && isPublicPath(request.url)) {
    return NextResponse.redirect(new URL('/examples/todo-list', request.url))
  }

  return NextResponse.next()
}
