import { loginUser } from "@/redux/slice/auth";
import { useGetCurrentUser } from "@/service/auth/get-current.user";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface AuthGuardProp {
  navigateTo: string;
}

export default function AuthGuard({ children, navigateTo }: PropsWithChildren<AuthGuardProp>) {
  const { data, error, isLoading} = useGetCurrentUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (data) {
        console.log(`API RESPONSE: ${data}`);
        dispatch(loginUser({
          admin: data.admin,
          token:data.token
        }));
    }

    if (error) {
        console.log("failed to get me, redirecting to login: ", error);
        // if(!navigateTo.includes('auth')){
        // }
        navigate(navigateTo);
    } else {
        navigate(navigateTo);
    }

  }, [data, dispatch, error, isLoading])

  return (
    <>{children}</>
  )
}
