// import { useState } from "react";

import PropertySidebar from "@/components/ai/property-sidebar"
// import ComparisonView from "@/components/ai/comparison-view";
// import { usePropertyContext } from "@/providers/property";
import ChatInterface from "@/components/ai/chat-interface";
import ChatLayout from "@/components/layouts/chat-layout";

export default function AiChat() {
  // const { showComparison, setShowComparison } = usePropertyContext();
  
  return (
      <ChatLayout>
        <main className="flex-1 flex overflow-hidden">
          <PropertySidebar />
        
          <div className="flex-1 flex flex-col">
            {/* {showComparison && (
              <ComparisonView
                onClose={() => setShowComparison(false)}
              />
            )} */}
        
            <ChatInterface />
          </div>
        </main>
      </ChatLayout>
  );
}
