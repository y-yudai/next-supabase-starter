"use client";

import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from 'next/navigation'
import useAuthStore from '@/store/auth'
import useUserStore from '@/store/user-account'
import Link from 'next/link'
import { ReactNode } from 'react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { logout } = useAuthStore()
  const { clearUserAccount } = useUserStore()

  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    setIsOpen(false);
    try {
      await logout();
      await clearUserAccount();
    } catch (error) {
      console.error(error);
    } finally {
      router.push('/examples/signin');
    }
  }

  const links = [
    { href: "/examples/settings/edit-profile", label: "Edit Profile" },
    { href: "/examples/settings/change-password", label: "Change Password" },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <div className="container max-w-screen-md mx-auto p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        {/* Sidebar Navigation */}
        <nav className="w-full md:w-64 space-y-1">
          {links.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className={`block px-3 py-2 rounded-md text-sm ${isActive(link.href) ? 'bg-muted font-medium' : 'hover:bg-muted/50'}`}
            >
              {link.label}
            </Link>
          ))}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button 
                className="block w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted/50"
              >
                Logout
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure you want to log out?</DialogTitle>
                <DialogDescription>
                  This action will sign you out of your account.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button onClick={handleSignOut}>Log out</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </nav>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {children}
        </div>
      </div>
    </div>
  )
}

