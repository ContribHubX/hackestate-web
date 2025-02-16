import { api } from "@/lib/axios";
import { queryOptions, useQuery } from "@tanstack/react-query";


type Params = {
    code: string, provider: string
}

const handleCallback = async ({code, provider}: Params) => {
    const response = await api.get(`/api/auth/${provider}/callback${code}`);
    return response.data;
}

const SocialLoginCallbackConfig = (data: Params) =>
    queryOptions({
        queryKey: ['social-login', data.code],
        queryFn: () => handleCallback(data)
    })

export const useSocialLoginCallback = (data: Params) => 
    useQuery(SocialLoginCallbackConfig(data));

