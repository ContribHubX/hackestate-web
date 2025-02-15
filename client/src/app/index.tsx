import MainAppProvider from "./main-provider"
import { AppRouter } from "./router"

const App = () => {
  return (
    <MainAppProvider>
        <AppRouter />
    </MainAppProvider>
  )
}






export default App

