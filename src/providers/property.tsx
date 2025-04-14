import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Property, Message } from "@/types/shared";
// import { apiRequest } from "@/lib/queryClient";
import { hardcodedProperties } from "@/data/properties";

type PropertyContextType = {
  allProperties: Property[];
  filteredProperties: Property[];
  savedProperties: Property[];
  selectedProperty: Property | null;
  messages: Message[];
  isLoading: boolean;
  isSavedPropertiesSidebarOpen: boolean;
  isDetailsOpen: boolean;
  filters: unknown;
  isAdviser: boolean;
  setFilters: (filters: any) => void;
  toggleSavedProperty: (property: Property) => void;
  isPropertySaved: (propertyId: number) => boolean;
  selectProperty: (property: Property | null) => void;
  setFilteredProperties: (properties: Property[]) => void;
  addMessage: (message: Message) => void;
  toggleSidebar: () => void;
  toggleDetails: () => void;
  compareProperties: () => void;
  toggleAdviser: () => void;

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
  const [isAdviser, setIsAdviser] = useState(false);

  const toggleAdviser = () => {
    setIsAdviser(prev => !prev);
  } 

   // Load properties and saved items from localStorage
   useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);

        // Simulated fetch
        // setAllProperties(hardcodedProperties);
        // setFilteredProperties(hardcodedProperties);

        const localSaved = localStorage.getItem("savedProperties");
        if (localSaved) {
          const parsed = JSON.parse(localSaved) as Property[];
          setSavedProperties(parsed);
        } else {
          const fallback = hardcodedProperties.slice(1, 4);
          setSavedProperties(fallback);
          localStorage.setItem("savedProperties", JSON.stringify(fallback));
        }

      } catch (error) {
        console.error("Error loading properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    localStorage.setItem("savedProperties", JSON.stringify(savedProperties));
  }, [savedProperties]);

  const toggleSavedProperty = (property: Property) => {
    const isAlreadySaved = savedProperties.some(p => p.id === property.id);

    if (isAlreadySaved) {
      setSavedProperties(prev => prev.filter(p => p.id !== property.id));
    } else {
      setSavedProperties(prev => [...prev, property]);
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
      content: `Can you compare these saved properties and help me decide which one is best? ${savedProperties.map(p => p.title).join(", ")}`,
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
        isAdviser,
        setFilters,
        toggleSavedProperty,
        isPropertySaved,
        selectProperty,
        setFilteredProperties,
        addMessage,
        toggleSidebar,
        toggleDetails,
        compareProperties,
        toggleAdviser
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
