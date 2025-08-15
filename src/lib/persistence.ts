import { openDB } from 'idb';

const DB_NAME = 'estimator-meta';
const STORE = 'meta';

export interface UserMeta {
  recents: string[];
  prefs: Record<string, any>;
}

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    },
  });
}

export async function loadMeta(): Promise<UserMeta> {
  const db = await getDB();
  const recents = ((await db.get(STORE, 'recents')) as string[]) || [];
  const prefs = ((await db.get(STORE, 'prefs')) as Record<string, any>) || {};
  return { recents, prefs };
}

export async function saveMeta(update: Partial<UserMeta>): Promise<void> {
  const db = await getDB();
  if (update.recents) await db.put(STORE, update.recents, 'recents');
  if (update.prefs) await db.put(STORE, update.prefs, 'prefs');
}

