import { Globe, GroupIcon, Home, Ungroup } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "All",
    url: "/all",
    icon: Globe,
  },
  {
    title: "Groups",
    url: "/groups",
    icon: GroupIcon,
  },
  {
    title: "Ungrouped",
    url: "/ungrouped",
    icon: Ungroup,
  }
  
]

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader>Task Manager</SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    onClick={() => navigate(item.url)}
                    className={location.pathname === item.url ? "bg-gray-300" : ""}
                  >
                    <div>
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}