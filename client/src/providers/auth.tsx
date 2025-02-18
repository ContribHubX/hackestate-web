import { loginUser } from "@/redux/slice/auth";
import { useGetCurrentUser } from "@/service/auth/get-current.user";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { data, error, isLoading} = useGetCurrentUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) return;

    if (data) {
        dispatch(loginUser({ user: data }));
    } 

    if (error) {
        // alert(error);
        console.log(error)
    } 

  }, [data, dispatch, error, isLoading])

  return <>{children}</>;
}

export default AuthProvider;