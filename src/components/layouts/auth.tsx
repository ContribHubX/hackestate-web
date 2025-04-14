import { PropsWithChildren } from "react"
import { ModeToggle } from "../ui/mode-toggle"

const AuthLayout = ({ children }: PropsWithChildren) => {

  return (
    <div className="bg-muted h-screen">
        <header className="py-2 bg-white dark:bg-black flex justify-between items-center px-4">
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-muted-foreground">App Logo</h1>
            </div>

            <nav>

            </nav>

            <ModeToggle />
        </header>

        <main>
            {children}
        </main>
    </div>
  )
}

export default AuthLayout
