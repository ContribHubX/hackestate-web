import { useMutation } from "@tanstack/react-query";
import { openai } from "@/lib/openai";
import { z } from "zod";

export const generateUserPersonaSchema = z.object({
    query: z.string()
})

export type GenerateUserPersonaSchema = z.infer<typeof generateUserPersonaSchema>;

export interface BuyerPersona {
    verdict: "High Potential" | "Medium Potential" | "Low Potential" | "Not a Buyer";
    confidence: "High" | "Medium" | "Low";
    reason: string;
    profile?: {
      budget?: string;
      propertyType?: string;
      locationPriorities?: string;
      mustHaveFeatures?: string[];
      dealBreakers?: string[];
      timeline?: string;
    };
    positiveIndicators? : string,
    negativeIndicators? : string
  }
  
  const generateUserPersona = async (messages: string): Promise<BuyerPersona> => {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Analyze real estate chat messages and return a JSON object with:
          1. Buyer potential assessment (verdict, confidence, reason)
          2. Profile details (only if verdict is High/Medium Potential)
          
          Required JSON format:
          {
            "verdict": "High Potential" | "Medium Potential" | "Low Potential" | "Not a Buyer",
            "confidence": "High" | "Medium" | "Low",
            "reason": "string explaining assessment",
            "profile": {
              "budget": "string if mentioned",
              "propertyType": "string if mentioned",
              "locationPriorities": "string if mentioned",
              "mustHaveFeatures": ["array", "of", "features"],
              "dealBreakers": ["array", "of", "dealbreakers"],
              "timeline": "string if mentioned"
            },
            "positiveIndicators" : "string sentence of the positive indicators",
            "negativeIndicators" : "string sentence of the negative indicators",
          }

          remove the json tags \`\`\`json
          
          Analysis criteria:
          - Positive indicators: Specific requirements, budget range, timeline, must-have features
          - Negative indicators: Vague responses, unrealistic expectations, no commitment signals
          
          Rules:
          1. Only include profile if verdict is High/Medium Potential
          2. Only include fields with explicitly mentioned details
          3. Keep reasons factual and concise` 
        },
        {
          role: "user",
          content: `Analyze these messages: ${messages}`
        }
      ],
      temperature: 0.2,
      max_tokens: 400
    });
  
    try {
      const result = JSON.parse(response.choices[0]?.message?.content || "{}");
      return result as BuyerPersona;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        verdict: "Not a Buyer",
        confidence: "Low",
        reason: "Unable to analyze messages"
      };
    }
  };

export const useGenerateUserPersona = () => useMutation({
    mutationFn: generateUserPersona
});


// - Budget range (if mentioned)
// - Property type preferences
// - Location priorities
// - Must-have features
// - Deal-breakers
// - Timeline (urgency)

// Format concisely in bullet points. Example:
// "• Budget: $500k-$600k
// • Seeks: 3BR suburban home with backyard
// • Priorities: Good school district, quiet neighborhood
// • Timeline: Buying in 3-6 months"