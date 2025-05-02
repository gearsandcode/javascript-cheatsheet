import React, { createContext, useContext, useState, useEffect } from "react";
import { Tip } from "../types";
import { v4 as uuidv4 } from "uuid";
import {
  initDb,
  getAllTips,
  addTip as dbAddTip,
  updateTip as dbUpdateTip,
  deleteTip as dbDeleteTip,
} from "../lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../lib/db";
interface TipsContextType {
  tips: Tip[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  addTip: (tip: Omit<Tip, "id">) => void;
  removeTip: (id: string) => void;
  updateTip: (id: string, tip: Omit<Tip, "id">) => void;
  colorMode: "dark" | "light";
  toggleColorMode: () => void;
  resolution: "compact" | "comfortable" | "spacious";
  setResolution: (resolution: "compact" | "comfortable" | "spacious") => void;
}

const TipsContext = createContext<TipsContextType | undefined>(undefined);

export const TipsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [colorMode, setColorMode] = useState<"light" | "dark">("dark");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [resolution, setResolution] = useState<
    "compact" | "comfortable" | "spacious"
  >("comfortable");

  const tips = useLiveQuery(() => db.tips.toArray()) ?? [];

  useEffect(() => {
    if (colorMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [colorMode]);

  // Initialize with dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const initialize = async () => {
      await initDb();
      setIsInitialized(true);
    };
    initialize();
  }, []);

  const addTip = async (newTip: Omit<Tip, "id">) => {
    const tipWithId = {
      ...newTip,
      id: uuidv4(),
    };
    await dbAddTip(tipWithId);
  };

  const removeTip = async (id: string) => {
    await dbDeleteTip(id);
  };

  const updateTip = async (id: string, updatedTip: Omit<Tip, "id">) => {
    await dbUpdateTip(id, updatedTip);
  };

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <TipsContext.Provider
      value={{
        tips,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        addTip,
        removeTip,
        updateTip,
        colorMode,
        toggleColorMode,
        resolution,
        setResolution,
      }}
    >
      {children}
    </TipsContext.Provider>
  );
};

export const useTips = () => {
  const context = useContext(TipsContext);
  if (context === undefined) {
    throw new Error("useTips must be used within a TipsProvider");
  }
  return context;
};
