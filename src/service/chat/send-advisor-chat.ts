import { useMutation } from "@tanstack/react-query";
import { openai } from "@/lib/openai";
import { z } from "zod";

export const sendAdviserChatSchema = z.object({
    query: z.string()
})

export type sendAdviserChatSchema = z.infer<typeof sendAdviserChatSchema>;

const sendAdviserChat = async (data: sendAdviserChatSchema): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an AI real estate assistant helping the user decide which property to choose based on their preferences. The user will ask a question in the context of saved properties.
                  Analyze the properties and provide insights such as value for money, location pros and cons, and potential appreciation.
                  Respond in **valid Markdown format** to ensure it is easy for the user to read. Use headings, bullet points, and bold text where appropriate.`
      },
      {
        role: "user",
        content: data.query
      }
    ],
    temperature: 0.7,
    max_tokens: 1000
  });

  return response.choices[0].message.content || "No response";
};


export const useSendAdviserChat = () => useMutation({
    mutationFn: sendAdviserChat
});




// Generate property comparison using OpenAI
export async function generatePropertyComparison(properties: any[]): Promise<string> {
  if (!properties || properties.length < 2) {
    return "I need at least two properties to make a comparison.";
  }

  try {
    // Format properties for the prompt
    const propertiesInfo = properties.map(p => {
      return `
        Property: ${p.title}
        Location: ${p.location}
        Price: ₱${p.price.toLocaleString()} ${p.listingType === 'For Rent' ? '/month' : ''}
        Type: ${p.propertyType}
        Size: ${p.size} sqm
        Bedrooms: ${p.bedrooms}
        Bathrooms: ${p.bathrooms}
        Amenities: ${p.amenities.join(', ')}
        Description: ${p.description}
      `;
    }).join("\n\n");

    const prompt = `
      Compare the following properties as investment opportunities:
      
      ${propertiesInfo}
      
      Please analyze:
      1. Value for money
      2. Location benefits and drawbacks
      3. Potential for appreciation
      4. Rental yield potential (if applicable)
      5. Overall recommendation
      
      Provide a structured comparison with pros and cons for each property.
    `;

    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        { 
          role: "system", 
          content: "You are an expert real estate investment analyst providing detailed property comparisons." 
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content || "I couldn't generate a comparison at this time.";
  } catch (error) {
    console.error("Error generating property comparison:", error);
    return "I apologize, but I'm having trouble comparing these properties right now. Please try again later.";
  }
}