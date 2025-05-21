"use client"

import * as React from "react"
import {
  Database,
  FileCode2,
  Home,
  Network,
  Shield,
  FileBarChart,
  Settings,
  Upload,
  Users,
} from "lucide-react"
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
} from "@/components/ui/sidebar"
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

  const mainNavItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      title: "Samples",
      url: "/samples",
      icon: Database,
      isActive: pathname === "/samples" || pathname.startsWith("/sample/"),
    },
    {
      title: "Features",
      url: "/features",
      icon: FileCode2,
      isActive: pathname === "/features" || pathname.startsWith("/feature/"),
    },
    {
      title: "Evolution",
      url: "/evolution",
      icon: Network,
      isActive: pathname === "/evolution",
    },
    {
      title: "Threat Intel",
      url: "/intelligence",
      icon: Shield,
      isActive: pathname === "/intelligence",
    },
    {
      title: "Reports",
      url: "/reports",
      icon: FileBarChart,
      isActive: pathname === "/reports",
    },
  ]

  const utilityNavItems = [
    {
      title: "Upload Sample",
      url: "/upload",
      icon: Upload,
      isActive: pathname === "/upload",
    },
    {
      title: "Team",
      url: "/team",
      icon: Users,
      isActive: pathname === "/team",
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      isActive: pathname === "/settings",
    },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/">
                <div className="flex items-center font-bold text-xl">
                  <span className="text-primary mr-1">Malware</span>
                  <span>Analysis</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    tooltip={item.title}
                  >
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
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    tooltip={item.title}
                  >
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
