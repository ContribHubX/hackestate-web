import { useState } from "react"
import { LayoutHeader } from "@/components/layouts/LayoutHeader"
import { useGetPersonas } from "@/service/persona/get-personas."
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  AlertCircle,
  CheckCircle,
  DollarSign,
  Home,
  MapPin,
  MinusCircle,
  PlusCircle,
  Search,
  ThumbsDown,
  Timer,
  User,
  XCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { personas } from "@/data/personas"

export interface BuyerPersona {
  verdict: "High Potential" | "Medium Potential" | "Low Potential" | "Not a Buyer"
  confidence: "High" | "Medium" | "Low"
  reason: string
  profile?: {
    budget?: string
    propertyType?: string
    locationPriorities?: string
    mustHaveFeatures?: string[]
    dealBreakers?: string[]
    timeline?: string
  }
  positiveIndicators?: string
  negativeIndicators?: string
}

export type Persona = {
  id: string
  createdAt: Date | null
  userId: string
  listingName: string
  personaDetails: string
  approved: boolean
}

export default function Agents() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const { data: personaList = [] } = useGetPersonas()

  console.log(`personas from api: ${JSON.stringify(personaList, null, 2)}`)

  // Use personaList if available, otherwise use the sample data
  const allPersonas = personaList.length > 0 ? personaList : personas

  // Filter personas based on search query
  const filteredPersonas = allPersonas.filter(
    (persona) =>
      persona.listingName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.personaDetails.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedPersona = selectedPersonaId ? filteredPersonas.find((p) => p.id === selectedPersonaId) : null

  // Parse the personaDetails JSON string to object
  const parsePersonaDetails = (detailsString: string): BuyerPersona => {
    try {
      return JSON.parse(detailsString)
    } catch (error) {
      console.error("Error parsing persona details:", error)
      return {
        verdict: "Medium Potential",
        confidence: "Low",
        reason: "Error parsing details",
        profile: {
          budget: "",
          propertyType: "",
          locationPriorities: "",
          mustHaveFeatures: [],
          dealBreakers: [],
          timeline: "",
        },
      }
    }
  }

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Format date to readable string
  const formatDate = (createdAt: Date | string | null) => {
    if (!createdAt) return "—"
  
    const date = new Date(createdAt)
    if (isNaN(date.getTime())) return "Invalid Date"
  
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const personaDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  
    const diffTime = today.getTime() - personaDate.getTime()
    const diffDays = diffTime / (1000 * 3600 * 24)
  
    if (diffDays < 1) return "Today"
    if (diffDays < 2) return "Yesterday"
  
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: today.getFullYear() !== date.getFullYear() ? "numeric" : undefined,
    })
  }
  

  // Get badge color based on verdict
  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "High Potential":
        return "bg-green-50 text-green-700 border-green-200"
      case "Medium Potential":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Low Potential":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "Not a Buyer":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  // Get confidence level as percentage
  const getConfidencePercentage = (confidence: string) => {
    switch (confidence) {
      case "High":
        return 90
      case "Medium":
        return 60
      case "Low":
        return 30
      default:
        return 50
    }
  }

  // Get icon based on verdict
  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case "High Potential":
        return <CheckCircle className="h-4 w-4" />
      case "Medium Potential":
        return <AlertCircle className="h-4 w-4" />
      case "Low Potential":
        return <ThumbsDown className="h-4 w-4" />
      case "Not a Buyer":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <LayoutHeader />

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-80 lg:w-96 border-r bg-muted/10 flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search leads..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredPersonas.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No leads found</div>
            ) : (
              filteredPersonas.map((persona) => {
                const details = parsePersonaDetails(persona.personaDetails)
                return (
                  <div
                    key={persona.id}
                    className={`flex gap-3 p-4 hover:bg-muted/50 cursor-pointer border-b transition ${
                      selectedPersonaId === persona.id ? "bg-muted/50" : ""
                    }`}
                    onClick={() => setSelectedPersonaId(persona.id)}
                  >
                    <Avatar className="h-10 w-10 mt-1">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(persona.listingName)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm truncate">{persona.listingName}</span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {formatDate(persona.createdAt)}
                          {/* (date here) */}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant="outline"
                          className={`flex items-center gap-1 ${getVerdictColor(details.verdict)}`}
                        >
                          {getVerdictIcon(details.verdict)}
                          <span>{details.verdict}</span>
                        </Badge>
                      </div>

                      <div className="text-xs text-muted-foreground line-clamp-2">
                        {details.profile?.budget ? (
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" /> {details.profile.budget}
                          </span>
                        ) : (
                          details.reason
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Persona Details */}
        <div className="w-full md:flex-1 overflow-y-auto bg-background">
          {selectedPersona ? (
            <div className="max-w-3xl mx-auto p-4 sm:p-8">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(selectedPersona.listingName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{selectedPersona.listingName}</CardTitle>
                        <CardDescription>Lead • {formatDate(selectedPersona.createdAt)}</CardDescription>
                      </div>
                    </div>

                    {(() => {
                      const details = parsePersonaDetails(selectedPersona.personaDetails)
                      return (
                        <Badge className={`flex items-center gap-1 ${getVerdictColor(details.verdict)}`}>
                          {getVerdictIcon(details.verdict)}
                          <span>{details.verdict}</span>
                        </Badge>
                      )
                    })()}
                  </div>
                </CardHeader>

                <Separator />

                <CardContent className="pt-6">
                  {(() => {
                    const details = parsePersonaDetails(selectedPersona.personaDetails)
                    return (
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium">Buyer Assessment</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">Confidence:</span>
                              <span className="text-xs font-medium">{details.confidence}</span>
                            </div>
                          </div>
                          <Progress value={getConfidencePercentage(details.confidence)} className="h-2" />
                          <p className="mt-3 text-muted-foreground">{details.reason}</p>
                        </div>

                        {/* Positive and Negative Indicators */}
                        {(details.positiveIndicators || details.negativeIndicators) && (
                          <>
                            <Separator />
                            <div className="space-y-4">
                              {details.positiveIndicators && (
                                <div className="flex items-start gap-2">
                                  <PlusCircle className="h-5 w-5 text-green-600 mt-0.5" />
                                  <div className="flex-1">
                                    <h3 className="text-sm font-medium mb-1 text-green-700">Positive Indicators</h3>
                                    <p className="text-muted-foreground">{details.positiveIndicators}</p>
                                  </div>
                                </div>
                              )}

                              {details.negativeIndicators && (
                                <div className="flex items-start gap-2">
                                  <MinusCircle className="h-5 w-5 text-red-600 mt-0.5" />
                                  <div className="flex-1">
                                    <h3 className="text-sm font-medium mb-1 text-red-700">Negative Indicators</h3>
                                    <p className="text-muted-foreground">{details.negativeIndicators}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        )}

                        <Separator />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-start gap-2">
                              <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                              <div className="flex-1">
                                <h3 className="text-sm font-medium mb-1">Budget</h3>
                                <p className="text-muted-foreground">{details.profile?.budget || "Not specified"}</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <Home className="h-5 w-5 text-muted-foreground mt-0.5" />
                              <div className="flex-1">
                                <h3 className="text-sm font-medium mb-1">Property Type</h3>
                                <p className="text-muted-foreground">
                                  {details.profile?.propertyType || "Not specified"}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                              <div className="flex-1">
                                <h3 className="text-sm font-medium mb-1">Location Priorities</h3>
                                <p className="text-muted-foreground">
                                  {details.profile?.locationPriorities || "Not specified"}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-start gap-2">
                              <Timer className="h-5 w-5 text-muted-foreground mt-0.5" />
                              <div className="flex-1">
                                <h3 className="text-sm font-medium mb-1">Timeline</h3>
                                <p className="text-muted-foreground">{details.profile?.timeline || "Not specified"}</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                              <div className="flex-1">
                                <h3 className="text-sm font-medium mb-1">Must-Have Features</h3>
                                {details.profile?.mustHaveFeatures?.length ? (
                                  <ul className="list-disc pl-5 text-muted-foreground">
                                    {details.profile.mustHaveFeatures.map((feature, index) => (
                                      <li key={index}>{feature}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-muted-foreground">None specified</p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-start gap-2">
                              <XCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                              <div className="flex-1">
                                <h3 className="text-sm font-medium mb-1">Deal Breakers</h3>
                                {details.profile?.dealBreakers?.length ? (
                                  <ul className="list-disc pl-5 text-muted-foreground">
                                    {details.profile.dealBreakers.map((dealBreaker, index) => (
                                      <li key={index}>{dealBreaker}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="text-muted-foreground">None specified</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </CardContent>

                <CardFooter className="flex justify-between border-t pt-6">
                  <div className="text-sm text-muted-foreground">Lead ID: {selectedPersona.id}</div>
                  <Button>Contact Lead</Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="bg-muted/30 rounded-full p-6 mb-4">
                <User className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No Lead Selected</h3>
              <p className="text-muted-foreground max-w-md">
                Select a lead from the list to view their buyer profile and assessment details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
