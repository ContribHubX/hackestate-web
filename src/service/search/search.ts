import { z } from "zod"

export const searchTypeSchema = z.union([z.literal("property"), z.literal("agent")])

export const searchPropertySchema = z.object({
	title: z.string(),
	location: z.string(),
	status: z.union([z.literal("rent"), z.literal("sale")]),
	beds: z.number(),
	baths: z.number(),
})

export const searchAgentSchema = z.object({
	name: z.string().min(1, {message: "Agent name is required."}),
})


export type SearchProperty = z.infer<typeof searchPropertySchema>
export type SearchAgent = z.infer<typeof searchAgentSchema>