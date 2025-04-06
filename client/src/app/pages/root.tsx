import AppLayout from "@/components/layouts/app-layout";
import { Outlet } from "react-router-dom";

const AppRoot = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}

export default AppRoot;
