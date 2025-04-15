import { useState } from "react"
import { Search } from "lucide-react"
import { usePropertyContext } from "@/providers/property"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PropertyCard from "./property-card"
import { parseCommaDelimited } from "@/lib/utils"

export default function PropertySidebar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState<"All" | "For Sale" | "For Rent">("All")

  const { savedProperties, isAdviser, toggleAdviser } = usePropertyContext()
  const isLoading = false

  const filteredProperties = savedProperties.filter((property) => {
    if (filter !== "All" && property.status !== filter) return false

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        property.title.toLowerCase().includes(searchLower) ||
        property.location.toLowerCase().includes(searchLower) ||
        parseCommaDelimited(property.amenities).some((amenity) => amenity.toLowerCase().includes(searchLower))
      )
    }

    return true
  })

  return (
    <aside className="w-full md:w-80  bg-background border-r border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-800 p-3 sm:p-4">
        {/* AI Toggle */}
        <div className="flex flex-col gap-2 sm:gap-3 items-center justify-center p-2">
          <span className="text-xs sm:text-sm text-center">Need {isAdviser ? "Recommendations" : "Adviser"}</span>
          <Button onClick={toggleAdviser} size="sm" className="w-full text-xs sm:text-sm">
            {isAdviser ? "Try Hestia AI" : "Try Athena AI"}
          </Button>
        </div>

        {/* Search */}
        <div className="relative mt-2">
          <Input
            type="text"
            placeholder="Search properties..."
            className="w-full pl-9 pr-3 py-1.5 sm:pl-10 sm:pr-4 sm:py-2 rounded-lg text-xs sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="h-4 w-4 sm:h-5 sm:w-5 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Filter Buttons */}
        <div className="mt-2 sm:mt-3">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {["All", "For Sale", "For Rent"].map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "outline"}
                size="sm"
                className="rounded-full text-xs h-7 px-2.5 sm:h-8 sm:px-3 flex-1 sm:flex-none"
                onClick={() => setFilter(status as typeof filter)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        {/* Saved Properties Header */}
        <div className="mt-2 sm:mt-3 flex items-center justify-center">
          <h3 className="font-medium text-primary text-xs sm:text-sm">Saved ({savedProperties.length})</h3>
        </div>
      </div>

      {/* Property List */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-2 sm:space-y-3">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-primary"></div>
          </div>
        ) : filteredProperties.length > 0 ? (
          filteredProperties.map((property) => <PropertyCard key={property.id} property={property} />)
        ) : (
          <div className="text-center text-gray-500 py-6 sm:py-8 text-xs sm:text-sm">
            {savedProperties.length > 0 ? "No properties match your filters" : "No saved properties yet"}
          </div>
        )}
      </div>
    </aside>
  )
}
