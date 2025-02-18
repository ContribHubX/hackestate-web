import { ThemeProvider } from "@/providers/theme"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"
import { PropsWithChildren } from "react" 
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import AuthProvider from "@/providers/auth";
import SocketContextComponent from "@/providers/socket/component";


const MainAppProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <SocketContextComponent>
            <ThemeProvider>
              <AuthProvider>{children}</AuthProvider>
            </ThemeProvider>
          </SocketContextComponent>
        </Provider>
    </QueryClientProvider>
  )
}

export default MainAppProvider