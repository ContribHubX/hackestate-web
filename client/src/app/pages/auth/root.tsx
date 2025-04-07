import { Outlet, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/layouts/auth";
import { useGetCurrentUser } from "@/service/auth/get-current.user";
import { useEffect } from "react";

const AuthRoot = () => {
  const { data, error, isLoading } = useGetCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      console.log("has data, navigating to dashboard");
      navigate("/dashboard");
    } else if (error) {
      console.log("no data or error, stay on login");
      navigate("/auth/login");
    }
  }, [data, error, navigate]);

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}

export default AuthRoot;
