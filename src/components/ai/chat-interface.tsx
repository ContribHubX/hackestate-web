import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PropertyCard from "./property-card"
import { Property } from "@/types/shared";
import { useChat } from "@/hooks/use-chat";
import { usePropertyContext } from "@/providers/property";

export default function ChatInterface() {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isLoading } = useChat();
  const {allProperties : properties}= usePropertyContext();

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      sendMessage(message);
      setMessage("");
    }
  };

  // Helper function to render property cards when present in a message
  const renderMessageContent = (content: string) => {
    // Check if the message contains property recommendations
    const hasProperties = content.includes("recommendations") || 
                          content.includes("recommend") ||
                          content.includes("Here are");
    
    if (!hasProperties || !properties || properties.length === 0) {
      return <p className="text-gray-800 leading-relaxed">{content}</p>;
    }
    
    // Select a subset of properties to show as recommendations
    // In a real app, this would be based on the AI's actual recommendations
    const recommendedProperties = properties.slice(0, 3);
    
    return (
      <>
        <p className="text-gray-800 leading-relaxed">{content}</p>
        
        {recommendedProperties.length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedProperties.map((property: Property) => (
              <PropertyCard 
                key={property.id}
                property={property}
                inChat={true}
              />
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-medium">
                AI
              </div>
            </div>
            <div className="flex-1 bg-white rounded-lg shadow-sm p-4">
              <p className="text-gray-800 leading-relaxed">
                Hello! I'm your HomeFinder assistant. I can help you discover properties that match your needs, compare listings, and provide personalized recommendations. Try telling me what you're looking for or ask me to compare your saved properties.
              </p>
            </div>
          </div>
        )}

        {/* All Messages */}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start space-x-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role !== 'user' && (
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-medium">
                  AI
                </div>
              </div>
            )}
            
            <div className={`flex-1 ${msg.role === 'user' 
                ? 'bg-primary text-white rounded-lg shadow-sm p-4 max-w-3xl ml-auto' 
                : 'bg-white rounded-lg shadow-sm p-4'}`}>
              {msg.role === 'user' 
                ? <p className="leading-relaxed">{msg.content}</p>
                : renderMessageContent(msg.content)}
            </div>
            
            {msg.role === 'user' && (
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                  JD
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-medium">
                AI
              </div>
            </div>
            <div className="flex-1 bg-white rounded-lg shadow-sm p-4">
              <p className="text-gray-800 leading-relaxed typing-animation">
                Thinking...
              </p>
            </div>
          </div>
        )}

        {/* Empty div for scrolling to bottom */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form className="flex items-center space-x-2" onSubmit={handleSubmit}>
          <div className="relative flex-1">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="pl-4 pr-10 py-3 border border-gray-300 rounded-lg"
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary-dark text-white rounded-lg p-3 flex-shrink-0"
            disabled={isLoading || !message.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>

      <style>{`
        .typing-animation::after {
          content: '';
          width: 4px;
          height: 16px;
          background-color: #6b7280;
          display: inline-block;
          animation: cursor-blink 1s infinite;
        }
        
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </>
  );
}
