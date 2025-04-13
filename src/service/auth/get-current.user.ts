import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { LoginResponse } from "./login";

const getCurrentUser = (): Promise<LoginResponse> =>
    api.get(`/api/auth/me`).then((res) => res.data);

export const useGetCurrentUser = () =>
    useQuery({
        queryKey: ["current-user"],
        queryFn: () => getCurrentUser(),
    });
