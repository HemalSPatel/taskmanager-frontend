import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import SideBar from "../SideBar"

export function AppLayout() {
  return (
    <SidebarProvider>
      <SideBar />
      <SidebarTrigger />
      <SidebarInset>
        {/* Your routed content will render here */}
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
