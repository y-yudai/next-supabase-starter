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
  profile_picture: string | null
}

interface UserState {
  userAccount: UserAccount | null
  setUser: (user: UserAccount) => void
  createUserAccount: (email: string, uuid: string) => Promise<void>
  fetchUserAccountById: (uuid: string) => Promise<void>
  fetchUserAccountByEmail: (email: string) => Promise<void>
  clearUserAccount: () => Promise<void>
  updateUserAccountById: (userInfo: UserAccount) => Promise<void>
  uploadUserImageById: (id: number, imageFile: File) => Promise<void>
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
      fetchUserAccountByEmail: async (email) => {
        const { data, error } = await supabase
          .from('user_accounts')
          .select()
          .eq('email', email)
          .single()
        if (data?.profile_picture) {
          const { data: imageList } = await supabase.storage
            .from('profile-images')
            .list('profiles/', { sortBy: { column: 'name', order: 'desc' } })
          const latestImage = imageList?.find((img) =>
            img.name.startsWith(`${data.id}_`),
          )
          if (latestImage) {
            data.profile_picture = supabase.storage
              .from('profile-images')
              .getPublicUrl(`profiles/${latestImage.name}`).data.publicUrl
          }
        }
        set({ userAccount: data })
      },
      clearUserAccount: async () => {
        set({ userAccount: null })
      },
      updateUserAccountById: async (userInfo: UserAccount) => {
        const { error } = await supabase
          .from('user_accounts')
          .update({
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            country_name: userInfo.country_name,
            zip: userInfo.zip,
            address1: userInfo.address1,
            tel: userInfo.tel,
            gender: userInfo.gender,
            birthday: userInfo.birthday,
          })
          .eq('id', userInfo.id)
        if (error) {
          console.error('Error updating profile:', error)
          throw error
        }
      },
      uploadUserImageById: async (id: number, imageFile: File) => {
        const fileExt = imageFile.name.split('.').pop()
        const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '')
        const filePath = `profiles/${id}_${timestamp}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('profile-images')
          .upload(filePath, imageFile, { cacheControl: '3600', upsert: false })
        if (uploadError) throw uploadError

        const { data } = supabase.storage
          .from('profile-images')
          .getPublicUrl(filePath)
        const publicUrl = data.publicUrl

        const { error: updateError } = await supabase
          .from('user_accounts')
          .update({ profile_picture: publicUrl })
          .eq('id', id)
        if (updateError) throw updateError
      },
    }),
    {
      name: 'store-user-account',
    },
  ),
)

export default useUserStore
