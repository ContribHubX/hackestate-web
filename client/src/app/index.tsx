import MainAppProvider from "./main-provider"
import { AppRouter } from "./router"
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  return (
    <MainAppProvider>
        <AppRouter />
        <Toaster />
    </MainAppProvider>
  )
}



export default App

