import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const uploadSingleFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/api/test-result', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });

  return response.data;
}

export const useFileUpload = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: uploadSingleFile,
      onSuccess: () => {
        queryClient.invalidateQueries({  queryKey: ['test-results']  });
      },
    });
  };
