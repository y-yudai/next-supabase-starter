import { createBrowserClient } from '@/utils/supabase/client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserAccount {
  id: number
  auth_id: string
  email: string | null
  first_name: string | null
  last_name: string | null
  country_name: string | null
  zip: string | null
  address1: string | null
  tel: string | null
  gender: string | null
  birthday: Date | null
}

interface UserState {
  userAccount: UserAccount | null
  setUser: (user: UserAccount) => void
  createUserAccount: (email: string, uuid: string) => Promise<void>
  fetchUserAccountById: (uuid: string) => Promise<void>
  clearUserAccount: () => Promise<void>
  updateUserAccountById: (id: number) => Promise<void>
  uploadUserImageById: (id: number) => Promise<void>
}

export const supabase = createBrowserClient()

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      userAccount: null,
      setUser: (userAccount) => set({ userAccount }),
      createUserAccount: async (email, uuid) => {
        if (!email) return Promise.reject('Email is required')
        if (!uuid) return Promise.reject('uuid is required')
        const { error } = await supabase
          .from('user_accounts')
          .insert([{ email: email, auth_id: uuid }])
        if (error) return Promise.reject(error)
      },
      fetchUserAccountById: async (uuid) => {
        const { data, error } = await supabase
          .from('user_accounts')
          .select()
          .eq('auth_id', uuid)
          .single()
        set({ userAccount: data })
      },
      clearUserAccount: async () => {
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
