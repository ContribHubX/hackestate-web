import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

export default function NavRails() {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const links = [
		{ name: "Home", path: "/" },
		{ name: "Properties", path: "/properties" },
		{ name: "Events", path: "/events" },
	];

	return (
		<>
			{/* Desktop Nav */}
			<NavigationMenu className="hidden md:flex">
				<NavigationMenuList>
					{links.map((link, index) => (
						<NavigationMenuItem
							key={index}
							onClick={() => navigate(link.path)}
							className="cursor-pointer px-4 py-2 hover:bg-secondary rounded"
						>
							{link.name}
						</NavigationMenuItem>
					))}
				</NavigationMenuList>
			</NavigationMenu>

			{/* Mobile Hamburger Nav */}
			<div className="md:hidden">
				<Popover open={isOpen} onOpenChange={setIsOpen}>
					<PopoverTrigger asChild>
						<Button size="icon" variant="ghost">
							<Menu className="w-5 h-5" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-40 flex flex-col space-y-2">
						{links.map((link, index) => (
							<Button
								key={index}
								variant="ghost"
								onClick={() => {
									navigate(link.path);
									setIsOpen(false);
								}}
							>
								{link.name}
							</Button>
						))}
					</PopoverContent>
				</Popover>
			</div>
		</>
	);
}
