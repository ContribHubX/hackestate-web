import { ArrowLeft, Heart, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LayoutHeader } from "@/components/layouts/LayoutHeader"
import { usePropertyContext } from "@/providers/property"
import { useNavigate } from "react-router-dom"
import { useMemo, useState } from "react"
import { useGenerateUserPersona } from "@/service/chat/generate-user-persona"
import { useContactAgent } from "@/service/agent/contact-agent"
import { getUser } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Spinner } from "@/components/ui/spinner"

export const PropertyDetails = () => {
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate();
	const { toast } = useToast()
	const { selectedProperty, messages } = usePropertyContext()
	const {mutateAsync} = useGenerateUserPersona();
	const {mutateAsync: contactAgentAsync} = useContactAgent();

	const userMessages = useMemo(() => {
		if (!messages || messages.length === 0) return ""
		return JSON.stringify(messages.filter((msg) => msg.role === "user"))
	}, [messages]) 

	// Fallback data in case selectedProperty is null
	const property = selectedProperty || {
		id: 1,
		title: "Family Home Near School (Fallback)",
		location: "Banilad, Cebu City",
		price: "₱5,200,000",
		type: "House",
		area_sqm: 120,
		status: "For Sale",
		image: "/placeholder.svg?height=600&width=1200",
		amenities: "Garden,Near Schools,Quiet Area",
		postedOn: "2023-04-15",
		category: "Residential",
		url: null,
	}

	// Parse amenities string to array
	const amenitiesList = property.amenities.split(",")

	const handleContactAgent = async () => {
		setIsLoading(true)
		const generatedPersona = await mutateAsync(userMessages)
		const user = getUser();
		const persona = await contactAgentAsync({
			userId : user!.id,
			listingName: selectedProperty!.title,
			personaDetails: JSON.stringify(generatedPersona)
		})
		console.log("persona: ", persona);
		toast({
			description: "Contacted the agent",
		})
		setIsLoading(false)
	}

	return (
		<div className="bg-background mx-auto min-h-screen flex flex-col">
			<LayoutHeader />

			<div className="bg-background flex-grow flex justify-center px-4 py-6">
				<div className="w-full max-w-6xl">
					<div className="mb-6">
						<Button
							onClick={() => navigate("/chat")}
							variant={"outline"}
							className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							<ArrowLeft className="mr-1 h-4 w-4" />
							Back to listings
						</Button>
					</div>

					<div className="relative rounded-lg overflow-hidden mb-6">
						<div className="absolute top-4 left-4 z-10">
							<Badge className="bg-green-600 hover:bg-green-700">{property.status}</Badge>
						</div>
						<img
							src={property.image || "/placeholder.svg"}
							alt={property.title}
							width={1200}
							height={400}
							className="w-full h-[400px] object-cover"
						/>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
						<div className="lg:col-span-2">
							<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
								<div>
									<h1 className="text-2xl md:text-3xl font-bold mb-1">{property.title}</h1>
									<p className="text-muted-foreground">{property.location}</p>
								</div>
								<div className="mt-2 md:mt-0 text-destructive">
									<p className="text-2xl md:text-3xl font-bold">{property.price}</p>
								</div>
							</div>

							<div className="flex flex-wrap gap-2 mb-6">
								<Button variant="outline" size="sm" className="gap-2">
									<Heart className="h-4 w-4" />
									Save Property
								</Button>
								<Button variant="outline" size="sm">
									Add to Compare
								</Button>
								<Button variant="outline" size="sm" className="gap-2">
									<MessageSquare className="h-4 w-4" />
									Ask AI Assistant
								</Button>
							</div>

							<Card className="mb-8">
								<CardContent className="p-6">
									<h2 className="text-lg md:text-base font-semibold mb-4">Property Details</h2>
									<div className="grid grid-cols-2 gap-y-4">
										<div>
											<p className="text-muted-foreground">Type</p>
											<p className="font-medium">{property.type}</p>
										</div>
										<div className="text-right">
											<p className="text-muted-foreground">Size</p>
											<p className="font-medium">{property.area_sqm} sqm</p>
										</div>
										<div>
											<p className="text-muted-foreground">Bedrooms</p>
											<p className="font-medium">3</p>
										</div>
										<div className="text-right">
											<p className="text-muted-foreground">Bathrooms</p>
											<p className="font-medium">2</p>
										</div>
									</div>
								</CardContent>
							</Card>

							<div className="mb-8">
								<h2 className="text-xl font-semibold mb-4">Amenities</h2>
								<div className="flex flex-wrap gap-2">
									{amenitiesList.map((amenity, index) => (
										<Badge key={index} variant="outline">
											{amenity}
										</Badge>
									))}
								</div>
							</div>

							<div className="mb-8">
								<h2 className="text-xl font-semibold mb-4">Description</h2>
								<p className="text-muted-foreground">
									Spacious family home located in a quiet residential area. Features a garden, 3 bedrooms, and is located
									near prestigious schools.
								</p>
							</div>
						</div>

						<div>
							<Card>
								<CardContent className="p-6">
									<h2 className="text-xl font-semibold mb-4">Location</h2>
									<p className="mb-4">{property.location}</p>
									<div className="bg-muted rounded-md h-[300px] flex items-center justify-center">
										<p className="text-muted-foreground text-sm">Map view not available</p>
									</div>
								</CardContent>
							</Card>

							<div className="mt-6">
								<Button className="w-full" size="lg" onClick={handleContactAgent}>
								{isLoading && (
									<Spinner size="medium" className="text-card" />
								)}
									Contact Agent
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
