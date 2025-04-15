import { useState } from "react"
import PropertySidebar from "@/components/ai/property-sidebar"
import ChatInterface from "@/components/ai/chat-interface"
import ChatLayout from "@/components/layouts/chat-layout"
import { Button } from "@/components/ui/button"
import { MessageSquare, Bookmark } from "lucide-react"

export default function AiChat() {
  const [activeView, setActiveView] = useState<"chat" | "properties">("chat")

  return (
    <ChatLayout>
      <main className="flex flex-col md:flex-row h-full overflow-hidden">
        {/* Mobile Navigation */}
        <div className="md:hidden flex border-b border-border">
          <Button
            variant={activeView === "properties" ? "default" : "ghost"}
            className="flex-1 rounded-none h-12"
            onClick={() => setActiveView("properties")}
          >
            <Bookmark className="h-5 w-5 mr-2" />
            Properties
          </Button>
          <Button
            variant={activeView === "chat" ? "default" : "ghost"}
            className="flex-1 rounded-none h-12"
            onClick={() => setActiveView("chat")}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Chat
          </Button>
        </div>

        {/* Sidebar - Hidden on mobile when chat is active */}
        <div className={`${activeView === "properties" ? "flex" : "hidden"} md:flex h-[calc(100%-48px)] md:h-full`}>
          <PropertySidebar />
        </div>

        {/* Chat Interface - Hidden on mobile when properties are active */}
        <div
          className={`${activeView === "chat" ? "flex" : "hidden"} md:flex flex-col flex-1 h-[calc(100%-48px)] md:h-full`}
        >
          <ChatInterface />
        </div>
      </main>
    </ChatLayout>
  )
}
