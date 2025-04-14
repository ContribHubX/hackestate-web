import { useNavigate } from "react-router-dom"
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "../ui/navigation-menu"

export default function NavRails() {
	const navigate = useNavigate()
	const links = [
		{ name: "Home", path: "/" },
		{ name: "Properties", path: "/properties" },
		{ name: "Events", path: "/events" },
		{ name: "Agents", path: "/agents" },
	]

	return (
		<NavigationMenu>
			<NavigationMenuList>
				{links.map((link, index) => (
					<NavigationMenuItem
						key={index}
						onClick={() => navigate(link.path)}
						className="cursor-pointer px-4 py-2 hover:bg-gray-200 rounded"
					>
						{link.name}
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	)
}
