"use client"

import type React from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider className="min-h-screen flex flex-col">
      <SiteHeader className="shrink-0" />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex-1 overflow-auto">
          <div className="flex flex-col h-full w-full">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
