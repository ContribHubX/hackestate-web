import { PropsWithChildren } from "react"
import { ModeToggle } from "../ui/mode-toggle"

const AuthLayout = ({ children }: PropsWithChildren) => {

  return (
    <section className="bg-muted h-screen">
        <div className="bg-muted p-2 absolute right-1">
            <ModeToggle />
        </div>

        <main>
            {children}
        </main>
    </section>
  )
}

export default AuthLayout