import { useState, useRef, useEffect } from "react"
import { Send, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PropertyCard from "./property-card"
import type { Property } from "@/types/shared"
import { useChat } from "@/hooks/use-chats_test"
import { usePropertyContext } from "@/providers/property"
import Markdown from "react-markdown"
import { Alert, AlertDescription } from "../ui/alert"

export default function ChatInterface() {
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { sendMessage, isLoading } = useChat()
  const { isAdviser, messages } = usePropertyContext()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      sendMessage(message)
      setMessage("")
    }
  }

  const parseMarkdown = (content: string) => content.replace(/\\n/g, "\n")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractJSONArray = (text: string): any[] | null => {
    try {
      const parsed = JSON.parse(text)
      return Array.isArray(parsed) ? parsed : null
    } catch {
      return null
    }
  }

  const renderMessageContent = (content: string) => {
    const parsedArray = extractJSONArray(content)
    if (parsedArray) {
      // Determine how many columns we want based on item count (max 3)
      const itemCount = parsedArray.length

      return (
        <div
          className={`grid gap-4 ${
            // Responsive grid that adapts based on screen size and item count
            itemCount === 1
              ? "grid-cols-1"
              : itemCount === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {parsedArray.map((property: Property) => (
            <PropertyCard key={property.id} property={property} inChat={true} />
          ))}
        </div>
      )
    }
    
    // if (!content.length) return; 
    return <Markdown>{parseMarkdown(content)}</Markdown>
  }

  return (
    <>
      {/* Scrollable Chat Messages */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 sm:space-y-6 bg-secondary">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm sm:text-base">
                AI
              </div>
            </div>
            <div className="flex-1 bg-card rounded-lg shadow-sm p-3 sm:p-4 text-card-foreground text-sm sm:text-base">
              <p>
                Hello! I'm your HomeFinder assistant. I can help you discover properties that match your needs, compare
                listings, and provide personalized recommendations. Try telling me what you're looking for or ask me to
                compare your saved properties.
              </p>
            </div>
          </div>
        )}

        {/* All Messages */}
        {messages.map((msg) => {
          const isUser = msg.role === "user"

          return (
            <div key={msg.id} className={`flex w-full ${isUser ? "justify-end" : "justify-start"} gap-2 sm:gap-4`}>
              {!isUser && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium text-sm sm:text-base">
                    AI
                  </div>
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm shadow-sm
                  ${isUser ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"}`}
              >
                {isUser ? (
                  <p className="leading-relaxed break-words whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none">{renderMessageContent(msg.content)}</div>
                )}
              </div>

              {isUser && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-medium text-sm sm:text-base">
                    JD
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium text-sm sm:text-base">
                AI
              </div>  
            </div>
            <div className="flex-1 bg-card text-card-foreground rounded-lg shadow-sm p-3 sm:p-4">
              <p className="leading-relaxed typing-animation text-sm sm:text-base">Thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Sticky AI Description + Chat Input */}
      <div className="sticky bottom-0 z-10 bg-secondary border-t border-border">
        <div className="p-2 sm:p-4 pt-2">
          <Alert className="bg-background border-muted text-foreground mb-3 sm:mb-4 py-2 sm:py-3">
            <Info className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            {/* <AlertTitle className="text-sm sm:text-base">{isAdviser === true ? "Athena AI" : "Hestia AI"}</AlertTitle> */}
            <AlertDescription className="text-xs sm:text-sm">
              {isAdviser === true ? (
                <>
                 <strong>Athena AI</strong> is your strategic assistant, designed to help you make smarter property decisions using data-driven
                  insights.
                </>
              ) : (
                <>
                  <strong>Hestia AI</strong> is your friendly home companion, focused on lifestyle advice and emotional
                  aspects of choosing the perfect property.
                </>
              )}
            </AlertDescription>
          </Alert>

          <form className="flex items-center space-x-2" onSubmit={handleSubmit}>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 sm:py-3 border border-input rounded-lg bg-background text-foreground text-sm sm:text-base"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="bg-primary hover:bg-opacity-90 text-primary-foreground rounded-lg flex-shrink-0 h-9 w-9 sm:h-10 sm:w-10"
              disabled={isLoading || !message.trim()}
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </form>
        </div>
      </div>

      {/* Typing animation style */}
      <style>{`
        .typing-animation::after {
          content: '';
          width: 3px;
          height: 14px;
          background-color: hsl(var(--muted-foreground));
          display: inline-block;
          animation: cursor-blink 1s infinite;
        }

        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @media (min-width: 640px) {
          .typing-animation::after {
            width: 4px;
            height: 16px;
          }
        }
      `}</style>
    </>
  )
}
