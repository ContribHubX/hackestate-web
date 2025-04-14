// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import {usePropertyContext} from "@/providers/property";
import { Search, Filter, ClipboardList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PropertyCard from "./property-card";
import { useState } from "react";
import { parseCommaDelimited } from "@/lib/utils";


export default function PropertySidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"All" | "For Sale" | "For Rent">("All");
  
  const { savedProperties, isAdviser, toggleAdviser } = usePropertyContext();
  const isLoading = false;

  // Filter properties based on search term and filter
  const filteredProperties = savedProperties
    .filter(property => {
    

      // Filter by status if not "All"
      if (filter !== "All" && property.status !== filter) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          property.title.toLowerCase().includes(searchLower) ||
          property.location.toLowerCase().includes(searchLower) ||
          parseCommaDelimited(property.amenities).some(amenity => 
            amenity.toLowerCase().includes(searchLower)
          )
        );
      }
      
      return true;
    });

  return (
    <aside className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => toggleAdviser()}
        >
          {isAdviser ? "Adviser"  : "Recommender"}  
        </button>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search properties..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-2">
            <Button 
              variant={filter === "All" ? "default" : "outline"}
              size="sm" 
              className="rounded-full text-sm"
              onClick={() => setFilter("All")}
            >
              All
            </Button>
            <Button 
              variant={filter === "For Sale" ? "default" : "outline"}
              size="sm" 
              className="rounded-full text-sm"
              onClick={() => setFilter("For Sale")}
            >
              For Sale
            </Button>
            <Button 
              variant={filter === "For Rent" ? "default" : "outline"}
              size="sm" 
              className="rounded-full text-sm"
              onClick={() => setFilter("For Rent")}
            >
              For Rent
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-sm text-primary hover:text-primary-dark flex items-center"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filters
          </Button>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <h3 className="font-medium text-gray-700">Saved ({savedProperties.length})</h3>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-sm text-primary hover:text-primary-dark flex items-center"
            // onClick={toggleShowComparison}
            disabled={savedProperties.length < 2}
          >
            <ClipboardList className="h-4 w-4 mr-1" />
            Compare
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard
              key={property.id} 
              property={property}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            {savedProperties.length > 0 
              ? "No properties match your filters" 
              : "No saved properties yet"}
          </div>
        )}
      </div>
    </aside>
  );
}
