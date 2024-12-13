import { createBrowserClient } from '@/utils/supabase/client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  userAccount: any | null
  setUser: (user: { email: string } | null) => void
  createUser: (email: string, uuid: string) => Promise<void>
  fetchUserAccountByEmail: (email: string) => Promise<void>
  resetUserAccount: () => Promise<void>
  updateUserAccountById: (id: number) => Promise<void>
  uploadUserImageById: (id: number) => Promise<void>
}

export const supabase = createBrowserClient()

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      userAccount: null,
      setUser: (userAccount) => set({ userAccount }),
      createUser: async (email, uuid) => {
        if (!email) return Promise.reject('Email is required')
        const { error } = await supabase
          .from('user_accounts')
          .insert([{ email: email, auth_id: uuid }])
        if (error) return Promise.reject(error)
      },
      fetchUserAccountByEmail: async (email) => {
        const { data, error } = await supabase
          .from('user_account')
          .select()
          .eq('email', email)
          .single()
        set({ userAccount: data })
      },
      resetUserAccount: async () => {
        set({ userAccount: null })
      },
      updateUserAccountById: async (id) => {
        // TODO: user_accountsテーブルの更新処理
      },
      uploadUserImageById: async (id) => {
        // TODO: 画像アップロード処理
      },
    }),
    {
      name: 'store-user-account',
    },
  ),
)

export default useUserStore
