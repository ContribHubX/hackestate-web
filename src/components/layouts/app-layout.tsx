import { PropsWithChildren } from "react"
import { ModeToggle } from "../ui/mode-toggle"

const AppLayout = ({ children }: PropsWithChildren) => {

  return (
    <div className="h-screen container bg-background mx-auto">
        <header className="py-2 flex justify-end">
            <ModeToggle />
        </header>

        <main>
            {children}
        </main>
    </div>
  )
}

export default AppLayout
