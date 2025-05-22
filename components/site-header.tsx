"use client"

import type React from "react"
import { Bell, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"

interface SiteHeaderProps extends React.HTMLAttributes<HTMLElement> {}

export function SiteHeader({ className, ...props }: SiteHeaderProps) {
  return (
    <header
      className={cn("sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6", className)}
      {...props}
    >
      <SidebarTrigger />

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">Help</span>
        </Button>

        <ModeToggle />
      </div>
    </header>
  )
}
