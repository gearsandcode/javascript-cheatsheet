import Dexie, { Table } from 'dexie';
import { Tip } from '../types';
import { initialTips } from '../data/initialTips';

class TipsDatabase extends Dexie {
  tips!: Table<Tip>;

  constructor() {
    super('TipsDatabase');
    this.version(1).stores({
      tips: 'id, title, description, codeSnippet, *categories'
    });
  }
}

export const db = new TipsDatabase();

// Expose db to window object
declare global {
  interface Window {
    tipsDb: {
      db: TipsDatabase;
      reinitDb: () => Promise<void>;
    };
  }
}

export async function initDb() {
  try {
    const count = await db.tips.count();
    if (count === 0) {
      await db.tips.bulkPut(initialTips);
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}

export async function reinitDb() {
  try {
    await db.delete();
    const newDb = new TipsDatabase();
    await newDb.open();
    await newDb.tips.bulkPut(initialTips);
    window.location.reload();
  } catch (error) {
    console.error('Failed to reinitialize database:', error);
  }
}

export async function getAllTips(): Promise<Tip[]> {
  return db.tips.toArray();
}

export async function addTip(tip: Tip) {
  await db.tips.add(tip);
}

export async function updateTip(id: string, tip: Omit<Tip, 'id'>) {
  await db.tips.update(id, tip);
}

export async function deleteTip(id: string) {
  await db.tips.delete(id);
}

// Expose functions to window object
if (typeof window !== 'undefined') {
  window.tipsDb = {
    db,
    reinitDb
  };
}