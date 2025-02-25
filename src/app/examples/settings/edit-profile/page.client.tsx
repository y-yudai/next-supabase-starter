"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useUserStore from '@/store/user-account'
import {useRouter} from "next/navigation";

export default function SettingsPage() {
  const router = useRouter()
  const { userAccount, updateUserAccountById } = useUserStore()

  const [firstName, setFirstName] = useState(userAccount?.first_name || '')
  const [lastName, setLastName] = useState(userAccount?.last_name || '')
  const [country, setCountry] = useState(userAccount?.country_name || '')
  const [zip, setZip] = useState(userAccount?.zip || '')
  const [address, setAddress] = useState(userAccount?.address1 || '')
  const [tel, setTel] = useState(userAccount?.tel || '')
  const [gender, setGender] = useState(userAccount?.gender || '')
  const [birthDate, setBirthDate] = useState(userAccount?.birthday ? userAccount.birthday.toString().substring(0, 10) : '') // 날짜 형식 yyyy-mm-dd

  const save = async () => {
    if (!firstName || !lastName || !country || !zip || !address || !tel || !gender || !birthDate || !country) {
      alert("All fields are required")
      return
    }

    try {
      const userInfo = {
        id: userAccount?.id,
        auth_id: userAccount?.auth_id,
        email: userAccount?.email,
        first_name: firstName,
        last_name: lastName,
        country_name: country,
        zip: zip,
        address1: address,
        tel: tel,
        gender: gender,
        birthday: new Date(birthDate),
      };

      await updateUserAccountById(userInfo);
      router.push('/examples/profile')
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  };

  return (
      <main className="mx-auto flex max-w-screen-md justify-center">
        <div className="w-full">
          <h2 className='font-bold text-lg'>Edit Profile</h2>
          <div className="mt-6">
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Input
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Country"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="zip">Zip</Label>
                  <Input
                      id="zip"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="Zip"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="address">Address</Label>
                  <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Address"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="tel">Phone Number</Label>
                  <Input
                      id="tel"
                      value={tel}
                      onChange={(e) => setTel(e.target.value)}
                      placeholder="Tel"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="gender">Gender</Label>
                  <Input
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      placeholder="Gender"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input
                      id="birthDate"
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      placeholder="Birth Date"
                  />
                </div>
              </div>
            </form>
            <Button className="w-full mt-4" onClick={save}>
              Save
            </Button>
          </div>
        </div>
      </main>
  )
}