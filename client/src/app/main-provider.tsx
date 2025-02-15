import { ThemeProvider } from "@/providers/theme"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"
import { PropsWithChildren } from "react" 

const MainAppProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider>
            {children}
        </ThemeProvider>
    </QueryClientProvider>
  )
}

export default MainAppProvider