import { loginUser } from "@/redux/slice/auth";
import { useGetCurrentUser } from "@/service/auth/get-current.user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AppRoot = () => {
  const { data, error, isLoading} = useGetCurrentUser();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(isLoading) return;

    if (data){
      dispatch(loginUser({...data}));
    }

    if (error) {
      // navigate("/auth/login");
    }
    
  }, [data, error, navigate]);

  return (
      <Outlet />
  )
}

export default AppRoot;
