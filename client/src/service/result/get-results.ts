import { api } from "@/lib/axios";
import { TestResult } from "@/types/test-result";
import { useQuery } from "@tanstack/react-query";

const getResults = (): Promise<TestResult[]> =>
    api.get(`/api/test-result`).then((res) => res.data);

export const useGetResults = () =>
    useQuery({
        queryKey: ["test-results"],
        queryFn: () => getResults(),
    });
