import { api } from "@/lib/axios";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const getCurrentUser = (): Promise<User> =>
    api.get(`/api/auth/me/`).then((res) => res.data);
  
export const useGetCurrentUser = () =>
    useQuery({
        queryKey: ["current-user"],
        queryFn: () => getCurrentUser(),
    }); 