
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest){
  const next = NextResponse.next()
  return next
}