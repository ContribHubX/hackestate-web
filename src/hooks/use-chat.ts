import { useState, useCallback } from "react";
import { nanoid } from "nanoid";
import { ChatMessage } from "@/types/shared";


// https://prod.liveshare.vsengsaas.visualstudio.com/join?1BE7545AF26C04146CA4A4319937F59E76A9

// Sample chat messages for demonstration
const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "I'm looking for a 2-bedroom property in Cebu City",
    timestamp: new Date(Date.now() - 360000).toISOString()
  },
  {
    id: "2",
    role: "assistant",
    content: "I've found a few options in Cebu City that match your requirements. Here are some properties with 2 bedrooms:\n\n1. The \"Luxury Condo near IT Park\" is available for rent at ₱35,000/month. It's fully furnished and includes amenities like a gym, pool, and 24/7 security.\n\n2. The \"Family Home Near School\" in Banilad might also interest you. It's for sale at ₱5,200,000 and offers 3 bedrooms, a garden, and is located in a quiet area near schools.\n\nWould you like more details about either of these properties?",
    timestamp: new Date(Date.now() - 300000).toISOString()
  },
  {
    id: "3",
    role: "user",
    content: "Can you compare these properties based on investment potential?",
    timestamp: new Date(Date.now() - 240000).toISOString()
  },
  {
    id: "4",
    role: "assistant",
    content: "Here's a comparison of the investment potential for these properties:\n\n**Luxury Condo near IT Park (Rental)**\n- Pros: Located near IT Park, a growing business district that attracts professionals and expats. High rental demand potentially offers consistent rental income.\n- Cons: Monthly rent of ₱35,000 is on the higher end, which might limit your tenant pool.\n- ROI: Typically, condos in IT Park can yield 5-7% annual returns through rental income. Property value appreciation is estimated at 3-5% annually due to the developing commercial area.\n\n**Family Home in Banilad (Sale)**\n- Pros: Banilad is a prime residential area with good appreciation potential. The proximity to schools makes it attractive to families, ensuring stable demand.\n- Cons: Higher initial capital investment at ₱5,200,000.\n- ROI: If used as a rental, you might expect 4-6% annual returns. Property value appreciation could be 4-7% annually due to the established neighborhood and amenities.\n\nRecommendation:\n- Short-term investment: The luxury condo offers quicker returns through monthly rental income with less initial capital.\n- Long-term investment: The family home in Banilad has better appreciation potential and more rental stability for family tenants.\n\nWould you like me to suggest more properties with good investment potential in Cebu City?",
    timestamp: new Date(Date.now() - 180000).toISOString()
  }
];

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to send a message and get a streaming response
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Generate unique IDs for both messages
    const userMessageId = nanoid();
    const assistantMessageId = nanoid();
    
    // Add user message to state
    const userMessage: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    try {
      // Create an initial empty assistant message
      const assistantMessage: ChatMessage = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString(),
      };
      
      // Add empty assistant message that will be updated with streaming
      setMessages(prev => [...prev, assistantMessage]);
      
      // Prepare message history for API
      // const messageHistory = [
      //   ...messages.map(msg => ({ role: msg.role, content: msg.content })),
      //   { role: 'user', content }
      // ];
      
      // For demo purposes, simulate a response instead of using the API
      // This avoids the need for the actual OpenAI integration during testing
      setTimeout(() => {
        let responseContent = "";
        
        // Create different responses based on user input
        if (content.toLowerCase().includes("investment")) {
          responseContent = "When considering real estate investments, it's important to analyze multiple factors:\n\n**Location Analysis**\n- Properties near business districts typically have higher rental potential\n- Areas with planned infrastructure projects may see better appreciation\n- School proximity increases appeal for family rentals\n\n**Financial Considerations**\n- Rental yield: Typically 4-7% annually in urban areas\n- Appreciation potential: Historical average of 5-8% in growing neighborhoods\n- Maintenance costs: Usually 1-2% of property value annually\n\nFor the properties you're considering, I'd recommend analyzing the rental demand in those specific neighborhoods and checking historical price trends in those areas.\n\nWould you like me to analyze any specific properties in your saved list?";
        } else if (content.toLowerCase().includes("compare")) {
          responseContent = "Here's a comparison of your saved properties:\n\n**Luxury Condo vs. Family Home**\n\n*Price Point*\n- Luxury Condo: ₱35,000/mo (rental) - lower initial commitment\n- Family Home: ₱5,200,000 (purchase) - significant investment\n\n*Space Efficiency*\n- Luxury Condo: 75 sqm, optimized layout with amenities\n- Family Home: 100 sqm, larger space with garden\n\n*Target Market*\n- Luxury Condo: Young professionals, expats, small families\n- Family Home: Growing families, long-term residents\n\n*Investment Outlook*\n- Luxury Condo: 5-7% rental yield, moderate appreciation\n- Family Home: 4-6% rental yield, higher appreciation potential\n\nBased on your preferences, which aspect is most important to you?";
        } else if (content.toLowerCase().includes("cebu")) {
          responseContent = "Cebu City is a great real estate market right now! Here are some key highlights:\n\n1. The IT Park area continues to see development, making properties there attractive for both living and investment.\n\n2. The Family Home in Banilad (₱5.2M) offers excellent value with its proximity to schools and quiet neighborhood.\n\n3. The Luxury Condo (₱35k/mo) provides modern amenities and is walking distance to business centers.\n\nWould you like more detailed information about specific neighborhoods in Cebu?";
        } else {
          responseContent = "I've analyzed your requirements and found several properties that might interest you. The most suitable options in our database include:\n\n1. The Luxury Condo near IT Park with premium amenities\n2. The Family Home in Banilad with excellent proximity to schools\n3. The Mountain View Cabin in Tagaytay offering a unique living experience\n\nEach of these properties offers different advantages depending on your specific needs. Would you like me to provide more detailed information about any of these properties?";
        }
        
        // Simulate streaming by updating the message content character by character
        let currentIndex = 0;
        const streamInterval = setInterval(() => {
          if (currentIndex <= responseContent.length) {
            const streamedContent = responseContent.substring(0, currentIndex);
            setMessages(prev => 
              prev.map(msg => 
                msg.id === assistantMessageId 
                  ? { ...msg, content: streamedContent } 
                  : msg
              )
            );
            currentIndex += 3; // Increase by 3 characters each time for faster streaming
          } else {
            clearInterval(streamInterval);
            setIsLoading(false);
          }
        }, 15); // Update every 15ms for a smooth effect
      }, 500); // Start after a 500ms delay to simulate network latency
    } catch (err) {
      setError("Failed to send message");
      setIsLoading(false);
      console.error("Chat error:", err);
    }
  }, [messages]);

  return {
    messages,
    sendMessage,
    isLoading,
    error
  };
}
