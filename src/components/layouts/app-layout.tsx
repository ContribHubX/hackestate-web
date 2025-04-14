import { PropsWithChildren } from "react"
import { LayoutHeader } from "./LayoutHeader"

const AppLayout = ({ children }: PropsWithChildren) => {

  return (
    <div className="h-screen container bg-background mx-auto">
        <LayoutHeader />

        <main>
            {children}
        </main>
    </div>
  )
}

export default AppLayout
