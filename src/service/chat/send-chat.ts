// import { api } from "@/lib/axios";
import { api } from "@/lib/axios";
import { Property } from "@/types/shared";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const sendChatSchema = z.object({
    query: z.string()
})

export type SendChatSchema = z.infer<typeof sendChatSchema>;

const sendChat = async (data: SendChatSchema) : Promise<Property[]> => {
    //todo change to open ai call
    const response = await api.post("/api/agent/chat", data);
    return response.data;
}

export const useSendChat= () => useMutation({
    mutationFn: sendChat
});


