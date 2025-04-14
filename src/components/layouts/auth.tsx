import { PropsWithChildren } from "react"
import { LayoutHeader } from "./LayoutHeader"

const AuthLayout = ({ children }: PropsWithChildren) => {

  return (
    <div className="bg-muted h-screen">
        <LayoutHeader />

        <main>
            {children}
        </main>
    </div>
  )
}

export default AuthLayout
