"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SettingsPage() {
  const save = async () => {}

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
                  defaultValue={''}
                  placeholder=""
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="famylyName">Family Name</Label>
                <Input
                  id="famylyName"
                  defaultValue={''}
                  placeholder=""
                />
              </div>
            </div>
          </form>
          <Button className="w-full mt-4" onClick={save}>
            {' '}
            Save
          </Button>
        </div>
      </div>
    </main>
  )
}

