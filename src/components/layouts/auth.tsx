import { PropsWithChildren } from "react"
import { ModeToggle } from "../ui/mode-toggle"

const AuthLayout = ({ children }: PropsWithChildren) => {

  return (
    <div className="bg-muted h-screen">
        <header className="p-2 absolute right-1">
            <ModeToggle />
        </header>

        <main>
            {children}
        </main>
    </div>
  )
}

export default AuthLayout
