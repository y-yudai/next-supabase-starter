import { createBrowserClient } from '@/utils/supabase/client'
import { AuthError, Session, User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  session: Session | null
  user: User | null
  setSession: (session: Session | null) => void
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updatePassword: (newPassword: string) => Promise<AuthError | null | undefined>
}

export const supabase = createBrowserClient()

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      session: null,
      user: null,
      setSession: (session: Session | null) => set({ session }),
      setUser: (user: User | null) => set({ user }),
      login: async (email, password) => {
        if (!email) return Promise.reject('Email is required')
        if (!password) return Promise.reject('Password is required')

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) return Promise.reject(error)

        set({ session: data.session, user: data.user })
      },
      register: async (email, password) => {
        if (!email) return Promise.reject('Email is required')
        if (!password) return Promise.reject('Password is required')

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) return Promise.reject(error)
      },
      logout: async () => {
        const { error } = await supabase.auth.signOut()
        if (error) return Promise.reject(error)
        set({ session: null })
        return Promise.resolve()
      },
      updatePassword: async (newPassword) => {
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        })
        return error
      },
    }),
    {
      name: 'store-auth',
    },
  ),
)

export default useAuthStore
