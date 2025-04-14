// import { useState } from "react";

import PropertySidebar from "@/components/ai/property-sidebar"
// import ComparisonView from "@/components/ai/comparison-view";
// import { usePropertyContext } from "@/providers/property";
import ChatInterface from "@/components/ai/chat-interface";

export default function AiChat() {
  // const { showComparison, setShowComparison } = usePropertyContext();
  
  return (
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
  );
}
