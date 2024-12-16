import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        {/* Sidebar Navigation */}
        <nav className="w-full md:w-64 space-y-1">
          <a href="#profile" className="block px-3 py-2 rounded-md text-sm bg-muted">
            Profile
          </a>
          <a href="#notifications" className="block px-3 py-2 rounded-md text-sm">
            Edit
          </a>
          <a href="#notifications" className="block px-3 py-2 rounded-md text-sm">
            Change Password
          </a>
          <a href="#display" className="block px-3 py-2 rounded-md text-sm">
            Logout
          </a>
        </nav>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-medium">Profile</h2>
            <p className="text-sm text-muted-foreground">
              Customize the appearance of the app. Automatically switch between day and night themes.
            </p>
          </div>
          <Button className="mt-6">Update preferences</Button>
        </div>
      </div>
    </div>
  )
}

