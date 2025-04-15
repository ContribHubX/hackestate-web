import { ReactNode } from "react";
import { LayoutHeader } from "./LayoutHeader";

interface AppLayoutProps {
  children: ReactNode;
}

export default function ChatLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <LayoutHeader />

      {children}
    </div>
  );
}
