import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Outfit {
  id: string;
  name: string;
  description?: string;
  image: string;
  favorite: boolean;
  dateAdded: string;
  [key: string]: any;
}

interface OutfitContextType {
  outfits: Outfit[];
  addOutfit: (newOutfit: Outfit) => void;
  toggleFavorite: (id: string) => void;
  deleteOutfit: (id: string) => void;
  editOutfit: (id: string, updatedOutfit: Outfit) => void;
  loading: boolean;
}

const OutfitContext = createContext<OutfitContextType | undefined>(undefined);

const STORAGE_KEY = "outfit_journal_data";

interface OutfitProviderProps {
  children: ReactNode;
}

export const OutfitProvider = ({ children }: OutfitProviderProps) => {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);

  // Load outfits from AsyncStorage on mount
  useEffect(() => {
    const loadOutfits = async () => {
      try {
        const storedOutfits = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedOutfits) {
          setOutfits(JSON.parse(storedOutfits));
        }
      } catch (error) {
        console.error("Failed to load outfits from storage:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOutfits();
  }, []);

  // Save outfits to AsyncStorage whenever they change
  useEffect(() => {
    const saveOutfits = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(outfits));
      } catch (error) {
        console.error("Failed to save outfits to storage:", error);
      }
    };

    // Don't save on initial load
    if (!loading) {
      saveOutfits();
    }
  }, [outfits, loading]);

  const addOutfit = (newOutfit: Outfit) => {
    setOutfits((prev) => [...prev, newOutfit]);
  };

  const toggleFavorite = (id: string) => {
    setOutfits((prev) =>
      prev.map((outfit) =>
        outfit.id === id ? { ...outfit, favorite: !outfit.favorite } : outfit
      )
    );
  };

  const deleteOutfit = (id: string) => {
    setOutfits((prev) => prev.filter((outfit) => outfit.id !== id));
  };

  const editOutfit = (id: string, updatedOutfit: Outfit) => {
    setOutfits((prev) =>
      prev.map((outfit) => (outfit.id === id ? updatedOutfit : outfit))
    );
  };

  return (
    <OutfitContext.Provider
      value={{ 
        outfits, 
        addOutfit, 
        toggleFavorite, 
        deleteOutfit, 
        editOutfit,
        loading 
      }}>
      {children}
    </OutfitContext.Provider>
  );
};

export const useOutfits = () => {
  const context = useContext(OutfitContext);
  if (!context) {
    throw new Error("useOutfits must be used within an OutfitProvider");
  }
  return context;
};