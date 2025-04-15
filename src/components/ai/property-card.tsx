"use client"

// import { usePropertyContext } from "@/providers/property";
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "../ui/badge"
import type { Property } from "@/types/shared"
import { usePropertyContext } from "@/providers/property"
import { parseCommaDelimited } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
interface PropertyCardProps {
  property: Property
  inChat?: boolean
}

export default function PropertyCard({ property, inChat = false }: PropertyCardProps) {
  const { toggleSavedProperty, savedProperties, selectProperty } = usePropertyContext()
  const navigate = useNavigate()

  // from context
  const savedPropertyIds = savedProperties.map((p) => p.id)

  const isSaved = savedPropertyIds && savedPropertyIds.includes(property.id)

  const handleSaveToggle = () => {
    toggleSavedProperty(property)
  } 

  const handleOpenDetails = () => {
    selectProperty(property)
    navigate("/properties/details")
  }

  const displayAmenities = parseCommaDelimited(property.amenities)

  return (
    <div
      className={`property-card w-full rounded-lg shadow-sm border border-gray-200 dark:border-0 overflow-hidden ${
        inChat ? "border border-gray-200" : ""
      }`}
      style={{
        maxWidth: "350px",
        width: "100%",
        minWidth: "280px",
        flex: "1 1 300px",
      }}
    >
      <div className="relative">
        <img src={property.image || "/placeholder.svg"} alt={property.title} className="w-full h-40 object-cover" />
        <div
          className={`absolute top-2 left-2 ${property.status === "For Rent" ? "bg-primary" : "bg-primary"} text-white text-xs font-medium px-2 py-1 rounded`}
        >
          {property.status}
        </div>
        <button
          className={`absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm ${isSaved ? "text-primary" : "text-gray-500 hover:text-primary"}`}
          aria-label={isSaved ? "Remove from saved" : "Save property"}
          onClick={handleSaveToggle}
        >
          <Heart className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-foreground mb-1 line-clamp-1">{property.title}</h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-1">{property.location}</p>
        <div className="flex justify-between items-center mb-3">
          <span className={`text-destructive font-semibold`}>{property.price}</span>
          <span className="text-sm text-gray-500">{property.area_sqm} sqm</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {displayAmenities.slice(0, 3).map((amenity, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded truncate max-w-full"
            >
              {amenity}
            </Badge>
          ))}
          {displayAmenities.length > 3 && (
            <Badge variant="outline" className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
              + {displayAmenities.length - 3} more
            </Badge>
          )}
        </div>
        <Button
          className="w-full bg-primary hover:bg-primary-dark text-white rounded-lg py-2 text-sm font-medium transition-colors"
          onClick={handleOpenDetails}
        >
          View Details
        </Button>
      </div>

      <style>{`
        .property-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .property-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        /* This ensures the parent container can display cards in a row */
        .property-card-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        /* This ensures each card takes appropriate space */
        .property-card-container > .property-card {
          flex: 1 1 300px;
          max-width: 400px;
          margin: 0.5rem;
        }
      `}</style>
    </div>
  )
}
