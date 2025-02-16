import { useSocialLoginCallback } from "@/service/auth/login-social"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { loginUser } from "@/redux/slice/auth";
import { Spinner } from "@/components/ui/spinner";

const OAuthCallback = () => {
  const { provider } = useParams(); 
  const { data, isPending } = useSocialLoginCallback({ code: window.location.search,  provider: provider || "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isPending) return;
    
    if (data) {
        dispatch(loginUser({ user: {...data} }));
        navigate("/");
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dispatch, isPending])

  return (
    <div className="flex items-center justify-center h-screen">
        <Spinner size="large" className="" />
    </div>
  )
}

export default OAuthCallback