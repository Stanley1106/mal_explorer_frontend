"use client"

import * as React from "react"
import { Database, FileCode2, Home, Network, Shield, FileBarChart, Settings, Upload, Users, Search, ChevronLeft, ChevronRight } from 'lucide-react'
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
import { Input } from "@/components/ui/input"
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
  const [searchTerm, setSearchTerm] = React.useState("")

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
    {
      title: "Evolution",
      url: "/home/evolution",
      icon: Network,
      isActive: pathname === "/home/evolution",
    },
    {
      title: "Threat Intel",
      url: "/home/intelligence",
      icon: Shield,
      isActive: pathname === "/home/intelligence",
    },
    {
      title: "Reports",
      url: "/home/reports",
      icon: FileBarChart,
      isActive: pathname === "/home/reports",
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
      title: "Team",
      url: "/home/team",
      icon: Users,
      isActive: pathname === "/home/team",
    },
    {
      title: "Settings",
      url: "/home/settings",
      icon: Settings,
      isActive: pathname === "/home/settings",
    },
  ]

  // Filter navigation items based on search term
  const filteredMainNavItems = mainNavItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredUtilityNavItems = utilityNavItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
        </div>

        <div className="px-2 group-data-[collapsible=icon]:hidden">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {filteredMainNavItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredMainNavItems.map((item) => (
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
        )}

        {filteredUtilityNavItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Utilities</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {filteredUtilityNavItems.map((item) => (
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
        )}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
