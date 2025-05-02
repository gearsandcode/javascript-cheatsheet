import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tip } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { initDb, getAllTips, addTip as dbAddTip, updateTip as dbUpdateTip, deleteTip as dbDeleteTip } from '../lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../lib/db';

interface TipsContextType {
  tips: Tip[];
  addTip: (tip: Omit<Tip, 'id'>) => Promise<void>;
  removeTip: (id: string) => Promise<void>;
  updateTip: (id: string, tip: Omit<Tip, 'id'>) => Promise<void>;
}

const TipsContext = createContext<TipsContextType | undefined>(undefined);

export const TipsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const tips = useLiveQuery(() => db.tips.toArray()) ?? [];

  useEffect(() => {
    const initialize = async () => {
      await initDb();
      setIsInitialized(true);
    };
    initialize();
  }, []);

  const addTip = async (newTip: Omit<Tip, 'id'>) => {
    const tipWithId = {
      ...newTip,
      id: uuidv4(),
    };
    await dbAddTip(tipWithId);
  };

  const removeTip = async (id: string) => {
    await dbDeleteTip(id);
  };

  const updateTip = async (id: string, updatedTip: Omit<Tip, 'id'>) => {
    await dbUpdateTip(id, updatedTip);
  };

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <TipsContext.Provider 
      value={{
        tips,
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
    throw new Error('useTips must be used within a TipsProvider');
  }
  return context;
};