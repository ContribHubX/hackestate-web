import { Outlet } from "react-router-dom";
import AuthLayout from "@/components/layouts/auth";

const AuthRoot = () => {
  return (
    <AuthLayout>
        <Outlet />
    </AuthLayout>
  )
}

export default AuthRoot;