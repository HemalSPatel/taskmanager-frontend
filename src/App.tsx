import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppLayout } from "@/components/layouts/AppLayout"
import Home from "@/components/pages/Home"
import All from "@/components/pages/All"
import Groups from "@/components/pages/Groups"
import Ungrouped from "@/components/pages/Ungrouped"
import GroupTasks from "@/components/pages/GroupTasks"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<All />} />
          <Route path="/ungrouped" element={<Ungrouped />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:groupId" element={<GroupTasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
