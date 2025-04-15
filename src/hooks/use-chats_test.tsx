import { useState, useCallback } from "react";
import { nanoid } from "nanoid";
import { ChatMessage } from "@/types/shared";
import { useSendChat } from "@/service/chat/send-chat";
import { usePropertyContext } from "@/providers/property";
import { useSendAdviserChat } from "@/service/chat/send-advisor-chat";

export function useChat() {
  // const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAdviser, savedProperties, addMessage, addAdvisorMessage } = usePropertyContext();

  const sendChatMutation = useSendChat();
  const sendAdviserChatMutation = useSendAdviserChat();

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return;

      const userMessageId = nanoid();
      const assistantMessageId = nanoid();

      const userMessage: ChatMessage = {
        id: userMessageId,
        role: "user",
        content,
        timestamp: new Date().toISOString(),
      };

      // setMessages((prev) => [...prev, userMessage]);
      addMessage(userMessage);
      setIsLoading(true);
      setError(null);

      try {
        const assistantMessage: ChatMessage = {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          timestamp: new Date().toISOString(),
        };

        // setMessages((prev) => [...prev, assistantMessage]);
        addMessage(assistantMessage);

        const mutation = isAdviser ? sendAdviserChatMutation : sendChatMutation;

        let query = content;

        if (isAdviser) {
          console.log("chatting with adviser");
          const propertyContext = savedProperties
            .map((prop, i) => {
              const amenitiesList = prop.amenities
                ? prop.amenities.split(",").map((a) => a.trim()).filter(Boolean).join(", ")
                : "None";

              return `${i + 1}. Title: ${prop.title}
                Location: ${prop.location}
                Price: ${prop.price}
                Category: ${prop.category ?? "N/A"}
                Type: ${prop.type ?? "N/A"}
                Area: ${prop.area_sqm ? `${prop.area_sqm} sqm` : "N/A"}
                Amenities: ${amenitiesList}`;
                            })
                            .join("\n\n");

                          query = `
                ${propertyContext}

                User query: ${content}

                Please analyze:
                1. Value for money
                2. Location benefits and drawbacks
                3. Potential for appreciation
                4. Rental yield potential (if applicable)
                5. Overall recommendation
                `.trim();
        }

        const response = await mutation.mutateAsync({ query });

        const responseContent = JSON.stringify(response); // Optionally format this better

        // setMessages((prev) =>
        //   prev.map((msg) =>
        //     msg.id === assistantMessageId ? { ...msg, content: responseContent } : msg
        //   )
        // );
        addAdvisorMessage(assistantMessageId, responseContent);

        setIsLoading(false);
      } catch (err) {
        setError("Failed to send message");
        setIsLoading(false);
        console.error("Chat error:", err);
      }
    },
    [sendChatMutation, sendAdviserChatMutation, savedProperties, isAdviser]
  );

  const getMessages = () => {
    // TODO: check from local storage then retrieve
  };

  const sendMessageHandler = () => {
    // TODO: call sendMessage then update local storage
  };

  return {
    sendMessage,
    isLoading,
    error,
    getMessages,
    sendMessageHandler,
  };
}
