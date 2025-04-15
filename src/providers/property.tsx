import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Property, ChatMessage } from "@/types/shared";
// import { apiRequest } from "@/lib/queryClient";

type PropertyContextType = {
  filteredProperties: Property[];
  savedProperties: Property[];
  selectedProperty: Property | null;
  messages: ChatMessage[];
  isLoading: boolean;
  isSavedPropertiesSidebarOpen: boolean;
  isDetailsOpen: boolean;
  filters: unknown;
  isAdviser: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFilters: (filters: any) => void;
  toggleSavedProperty: (property: Property) => void;
  isPropertySaved: (propertyId: number) => boolean;
  selectProperty: (property: Property | null) => void;
  setFilteredProperties: (properties: Property[]) => void;
  addMessage: (message: ChatMessage) => void;
  toggleSidebar: () => void;
  toggleDetails: () => void;
  toggleAdviser: () => void;
  logOut: () => void;

  addAdvisorMessage: (assistantMessageId: string, responseContent: string) => void

  // fetchProperties: () => void;
  // toggleShowComparison: () => void;
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
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
        }

        // messages local
        const localMessagesSaved = localStorage.getItem("messages");
        if (localMessagesSaved) {
          const parsed = JSON.parse(localMessagesSaved) as ChatMessage[];
          setMessages(parsed);
        }

         // selected local
         const localSelectedProperty = localStorage.getItem("selectedProperty");
         if (localSelectedProperty) {
           const parsed = JSON.parse(localSelectedProperty) as Property;
           setSelectedProperty(parsed);
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
    const localSaved = localStorage.getItem("savedProperties");
    if (localSaved && savedProperties.length === 0) 
      return;
      
    localStorage.setItem("savedProperties", JSON.stringify(savedProperties));
  }, [savedProperties]);

  useEffect(() => {
    const localMessagesSaved = localStorage.getItem("messages");
    if (localMessagesSaved && messages.length === 0) 
      return;
      
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const localSelectedProperty = localStorage.getItem("selectedProperty");
    if (localSelectedProperty && !selectedProperty) 
      return;
      
    localStorage.setItem("selectedProperty", JSON.stringify(selectedProperty));
  }, [selectedProperty]);

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
    // if (property) {
    //   setIsDetailsOpen(true);
    // }
  };

  const addMessage = (message: ChatMessage) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const toggleSidebar = () => {
    setIsSavedPropertiesSidebarOpen(prev => !prev);
  };

  const toggleDetails = () => {
    setIsDetailsOpen(prev => !prev);
  };

  const addAdvisorMessage = (assistantMessageId: string, responseContent: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === assistantMessageId ? { ...msg, content: responseContent } : msg
      )
    );
  }

  const logOut = () => {
    localStorage.removeItem("savedProperties");
    setSavedProperties([]);
    localStorage.removeItem("messages");
    setMessages([]);
    localStorage.removeItem("user");
    localStorage.removeItem("selectedProperty");
    setSelectedProperty(null);
  } 


  return (
    <PropertyContext.Provider
      value={{
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
        toggleAdviser,
        addAdvisorMessage,
        logOut
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
