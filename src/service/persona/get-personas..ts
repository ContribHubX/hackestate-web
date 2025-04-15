import { apiExpress } from "@/lib/axios";
import { Persona } from "@/types";
import { useQuery } from "@tanstack/react-query";

const getPersonas = (): Promise<Persona[]> =>
    apiExpress.get(`/api/personas`).then((res) => res.data);

export const useGetPersonas = () =>
    useQuery({
        queryKey: ["personas"],
        queryFn: () => getPersonas(),
    });
