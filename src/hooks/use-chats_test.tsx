import { useState, useCallback, useEffect } from "react";
import { nanoid } from "nanoid";
import { ChatMessage } from "@/types/shared";
import { useSendChat } from "@/service/chat/send-chat";
import { usePropertyContext } from "@/providers/property";
import { useSendAdviserChat } from "@/service/chat/send-advisor-chat";

const LOCAL_STORAGE_KEY = "chat_messages";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAdviser, savedProperties } = usePropertyContext();

  const sendChatMutation = useSendChat();
  const sendAdviserChatMutation = useSendAdviserChat();

  // ✅ Retrieve messages from localStorage and set state
  const getMessages = useCallback((): ChatMessage[] => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed: ChatMessage[] = saved ? JSON.parse(saved) : [];
      setMessages(parsed);
      return parsed;
    } catch (err) {
      console.error("Failed to load chat messages from localStorage:", err);
      return [];
    }
  }, []);

  // ✅ Save messages to localStorage
  const saveMessagesToLocal = (updatedMessages: ChatMessage[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMessages));
  };

  // ✅ Call sendMessage and update localStorage afterward
  const sendMessageHandler = async (content: string) => {
    await sendMessage(content);
    saveMessagesToLocal([...messages]); // ensure latest state is saved
  };

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

      setMessages((prev) => {
        const updated = [...prev, userMessage];
        saveMessagesToLocal(updated);
        return updated;
      });

      setIsLoading(true);
      setError(null);

      try {
        const assistantMessage: ChatMessage = {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => {
          const updated = [...prev, assistantMessage];
          saveMessagesToLocal(updated);
          return updated;
        });

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

        const responseContent = typeof response === "string" ? response : JSON.stringify(response, null, 2);

        setMessages((prev) => {
          const updated = prev.map((msg) =>
            msg.id === assistantMessageId ? { ...msg, content: responseContent } : msg
          );
          saveMessagesToLocal(updated);
          return updated;
        });

        setIsLoading(false);
      } catch (err) {
        setError("Failed to send message");
        setIsLoading(false);
        console.error("Chat error:", err);
      }
    },
    [sendChatMutation, sendAdviserChatMutation, savedProperties, isAdviser]
  );

  // ✅ Load messages on mount
  useEffect(() => {
    getMessages();
  }, [getMessages]);

  return {
    messages,
    sendMessage,
    sendMessageHandler,
    getMessages,
    isLoading,
    error,
  };
}
