import React, { createContext, useContext, useState, useEffect } from "react";
import { Tip } from "../types";
import {
  initDb,
  getAllTips,
  addTip as dbAddTip,
  updateTip as dbUpdateTip,
  deleteTip as dbDeleteTip,
} from "../lib/db";

interface TipsContextType {
  tips: Tip[];
  loading: boolean;
  error: string | null;
  addTip: (tip: Omit<Tip, "id">) => Promise<void>;
  removeTip: (id: string) => Promise<void>;
  updateTip: (id: string, tip: Omit<Tip, "id">) => Promise<void>;
}

const TipsContext = createContext<TipsContextType | undefined>(undefined);

export const TipsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tips on component mount
  useEffect(() => {
    const initialize = async () => {
      try {
        await initDb();
        const fetchedTips = await getAllTips();
        setTips(fetchedTips);
      } catch (err) {
        setError("Failed to load tips");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, []);

  const addTip = async (newTip: Omit<Tip, "id">) => {
    try {
      await dbAddTip(newTip);
      // Refresh tips after adding
      const updatedTips = await getAllTips();
      setTips(updatedTips);
    } catch (err) {
      setError("Failed to add tip");
      console.error(err);
    }
  };

  const removeTip = async (id: string) => {
    try {
      await dbDeleteTip(id);
      // Refresh tips after deleting
      const updatedTips = await getAllTips();
      setTips(updatedTips);
    } catch (err) {
      setError("Failed to delete tip");
      console.error(err);
    }
  };

  const updateTip = async (id: string, updatedTip: Omit<Tip, "id">) => {
    try {
      await dbUpdateTip(id, updatedTip);
      // Refresh tips after updating
      const updatedTips = await getAllTips();
      setTips(updatedTips);
    } catch (err) {
      setError("Failed to update tip");
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TipsContext.Provider
      value={{
        tips,
        loading,
        error,
        addTip,
        removeTip,
        updateTip,
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
