import { ReactNode } from "react";
import { Home } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function ChatLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-semibold text-gray-800">Hestia Homes</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                  JD
                </span>
                <span className="text-sm text-gray-700 hidden md:inline">
                  John Doe
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
