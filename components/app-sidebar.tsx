// filepath: components\app-sidebar.tsx
"use client"

import * as React from "react"
import { Database, FileCode2, Home, Network, Shield, FileBarChart, Settings, Upload, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { NavUser } from "@/components/nav-user"

// Sample user data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { toggleSidebar, state } = useSidebar()

  const mainNavItems = [
    {
      title: "Dashboard",
      url: "/home/dashboard",
      icon: Home,
      isActive: pathname === "/home" || pathname === "/home/dashboard",
    },
    {
      title: "Samples",
      url: "/home/samples",
      icon: Database,
      isActive: pathname === "/home/samples" || pathname.startsWith("/home/sample/"),
    },
    {
      title: "Features",
      url: "/home/features",
      icon: FileCode2,
      isActive: pathname === "/home/features" || pathname.startsWith("/home/feature/"),
    },
  ]

  const utilityNavItems = [
    {
      title: "Upload Sample",
      url: "/home/upload",
      icon: Upload,
      isActive: pathname === "/home/upload",
    },
    {
      title: "Settings",
      url: "/home/settings",
      icon: Settings,
      isActive: pathname === "/home/settings",
    },
  ]
  // Navigation items ready to be displayed

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                <Link href="/home/dashboard">
                  <div className="flex items-center font-bold text-xl">
                    <span className="text-primary mr-1">Malware</span>
                    <span>Analysis</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="group-data-[collapsible=icon]:hidden">
            {state === "expanded" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>      </SidebarHeader>      
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Utilities</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {utilityNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
