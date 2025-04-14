import { Button } from "../ui/button"
import { ModeToggle } from "../ui/mode-toggle"
import NavRails from "./NavRails"

export const LayoutHeader = () => {
	return (
		<header className="py-2 bg-white dark:bg-black flex justify-between items-center px-4">
            <div className="flex items-center gap-2 w-[200px]">
                <h1 className="text-2xl font-bold text-muted-foreground">App Logo</h1>
            </div>

            <NavRails />

			<div className="flex gap-4">
            	<ModeToggle />
				<span className="flex gap-2">
					<Button className="" variant="outline"> 
						Signup
					</Button>
					<Button className="bg-primary"> 
						Login
					</Button>
				</span>
			</div>
        </header>
	)
}