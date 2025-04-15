// import { api } from "@/lib/axios";
import { apiExpress } from "@/lib/axios";
import { Persona } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const contactAgentSchema = z.object({
    userId: z.string(),
    listingName: z.string(),
    personaDetails: z.string()
})

export type ContactAgentSchema = z.infer<typeof contactAgentSchema>;

const contactAgent = async (data: ContactAgentSchema) : Promise<Persona> => {
    const response = await apiExpress.post("/api/personas", data);
    return response.data;
}

export const useContactAgent= () => useMutation({
    mutationFn: contactAgent
});


