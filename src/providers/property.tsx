import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Property, Message } from "@/types/shared";
import { apiRequest } from "@/lib/queryClient";

type PropertyContextType = {
  allProperties: Property[];
  filteredProperties: Property[];
  savedProperties: Property[];
  selectedProperty: Property | null;
  messages: Message[];
  isLoading: boolean;
  isSavedPropertiesSidebarOpen: boolean;
  isDetailsOpen: boolean;
  filters: any;
  setFilters: (filters: any) => void;
  toggleSavedProperty: (property: Property) => Promise<void>;
  isPropertySaved: (propertyId: number) => boolean;
  selectProperty: (property: Property | null) => void;
  setFilteredProperties: (properties: Property[]) => void;
  addMessage: (message: Message) => void;
  toggleSidebar: () => void;
  toggleDetails: () => void;
  compareProperties: () => void;

  // fetchProperties: () => void;
  // toggleShowComparison: () => void;
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavedPropertiesSidebarOpen, setIsSavedPropertiesSidebarOpen] = useState(true);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);

        // Hardcoded data
        const hardcodedProperties: Property[] = [
          {
            id: 1,
            name: "Affordable 1BR Condo in Trees Residences",
            address: "Quirino Highway, Novaliches, Quezon City",
            price: 12000,
            status: "For Rent",
            area_sqm: 24,
            amenities: ["Multiple Pools", "Basketball Court", "Parks and Playground", "Near SM Fairview"],
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            link: "https://example.com/property/1"
          },
          {
            id: 2,
            name: "Modern 2BR House in Las Piñas",
            address: "BF Homes, Las Piñas City",
            price: 4500000,
            status: "For Sale",
            area_sqm: 80,
            amenities: ["2 Bedroom", "2 Bath", "Garage", "Garden"],
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            link: "https://example.com/property/2"
          },
          {
            id: 3,
            name: "Luxury Condo near IT Park",
            address: "Cebu IT Park, Cebu City",
            price: 35000,
            status: "For Rent",
            area_sqm: 75,
            amenities: ["Fully Furnished", "Gym", "Pool", "24/7 Security"],
            image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            link: "https://example.com/property/3"
          },
          {
            id: 4,
            name: "Family Home Near School",
            address: "Banilad, Cebu City",
            price: 5200000,
            status: "For Sale",
            area_sqm: 100,
            amenities: ["Near School", "Quiet Area", "3 Bedroom", "2 Bath", "Garden"],
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            link: "https://example.com/property/4"
          },
          {
            id: 5,
            name: "Cozy Studio in Makati",
            address: "Salcedo Village, Makati City",
            price: 18000,
            status: "For Rent",
            area_sqm: 30,
            amenities: ["Fully Furnished", "Rooftop Pool", "Gym", "Business Center"],
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            link: "https://example.com/property/5"
          },
          {
            id: 6,
            name: "Beachfront Villa in Batangas",
            address: "San Juan, Batangas",
            price: 15000000,
            status: "For Sale",
            area_sqm: 250,
            amenities: ["Beachfront", "4 Bedroom", "3 Bath", "Private Pool", "Garden"],
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            link: "https://example.com/property/6"
          },
          {
            id: 7,
            name: "Modern Apartment in BGC",
            address: "Bonifacio Global City, Taguig",
            price: 45000,
            status: "For Rent",
            area_sqm: 85,
            amenities: ["Fully Furnished", "Gym", "Pool", "Smart Home", "Near Malls"],
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            link: "https://example.com/property/7"
          },
          {
            id: 8,
            name: "Suburban House in Laguna",
            address: "Santa Rosa, Laguna",
            price: 3800000,
            status: "For Sale",
            area_sqm: 120,
            amenities: ["3 Bedroom", "2 Bath", "Garden", "Garage", "Near Schools"],
            image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            link: "https://example.com/property/8"
          },
          {
            id: 9,
            name: "Office Space in Ortigas",
            address: "Ortigas Center, Pasig City",
            price: 60000,
            status: "For Rent",
            area_sqm: 150,
            amenities: ["Open Plan", "Meeting Rooms", "Pantry", "24/7 Security", "Parking"],
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            link: "https://example.com/property/9"
          },
          {
            id: 10,
            name: "Mountain View Cabin in Tagaytay",
            address: "Tagaytay, Cavite",
            price: 6500000,
            status: "For Sale",
            area_sqm: 90,
            amenities: ["Mountain View", "2 Bedroom", "Balcony", "Fireplace", "Garden"],
            image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            link: "https://example.com/property/10"
          }
        ];

        setAllProperties(hardcodedProperties);
        setFilteredProperties(hardcodedProperties);

        // Optionally fetch saved properties
        // const savedPropertiesResponse = await fetch("/api/saved-properties");
        // if (savedPropertiesResponse.ok) {
        //   const savedProps = await savedPropertiesResponse.json();
        //   setSavedProperties(savedProps);
        // }

        setSavedProperties(hardcodedProperties);

      } catch (error) {
        console.error("Error loading properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const toggleSavedProperty = async (property: Property) => {
    try {
      const isAlreadySaved = savedProperties.some(p => p.id === property.id);
      
      if (isAlreadySaved) {
        // Remove from saved
        await apiRequest("DELETE", `/api/saved-properties/${property.id}`);
        setSavedProperties(prev => prev.filter(p => p.id !== property.id));
      } else {
        // Add to saved
        await apiRequest("POST", "/api/saved-properties", { propertyId: property.id });
        setSavedProperties(prev => [...prev, property]);
      }
    } catch (error) {
      console.error("Error toggling saved property:", error);
    }
  };

  const isPropertySaved = (propertyId: number) => {
    return savedProperties.some(property => property.id === propertyId);
  };

  const selectProperty = (property: Property | null) => {
    setSelectedProperty(property);
    if (property) {
      setIsDetailsOpen(true);
    }
  };

  const addMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const toggleSidebar = () => {
    setIsSavedPropertiesSidebarOpen(prev => !prev);
  };

  const toggleDetails = () => {
    setIsDetailsOpen(prev => !prev);
  };

  const compareProperties = () => {
    if (savedProperties.length < 2) {
      console.warn("Need at least 2 properties to compare");
      return;
    }

    // Create a comparison message
    const comparisonRequest: Message = {
      id: 1,
      userId: 12,
      role: "user",
      content: `Can you compare these saved properties and help me decide which one is best? ${savedProperties.map(p => p.name).join(", ")}`,
      timestamp: new Date().toISOString(),
    };

    addMessage(comparisonRequest);
  };

  return (
    <PropertyContext.Provider
      value={{
        allProperties,
        filteredProperties,
        savedProperties,
        selectedProperty,
        messages,
        isLoading,
        isSavedPropertiesSidebarOpen,
        isDetailsOpen,
        filters,
        setFilters,
        toggleSavedProperty,
        isPropertySaved,
        selectProperty,
        setFilteredProperties,
        addMessage,
        toggleSidebar,
        toggleDetails,
        compareProperties,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error("usePropertyContext must be used within a PropertyProvider");
  }
  return context;
};
