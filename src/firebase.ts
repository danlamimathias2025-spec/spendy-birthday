import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  increment 
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize or reuse Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore using the provisioned database ID
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export interface BirthdayWish {
  id: string;
  senderName: string;
  message: string;
  createdAt: string;
  isGenesis?: boolean;
}

export interface CelebrationStats {
  totalUnlocks: number;
  lastUnlockedAt: string;
  honoree: string;
  level: number;
}

// Default genesis wish from Splenzzy
export const GENESIS_WISH: Omit<BirthdayWish, 'id'> = {
  senderName: 'SPLENZZY',
  message: 'Happy 24th Birthday Spendy! You are entering Level 24 with unlimited upside, zero transaction fees, and pure momentum. Proud of you always!',
  createdAt: '2026-09-15T00:00:00.000Z',
  isGenesis: true,
};

// Increment celebration unlock counter
export async function recordProtocolUnlock(): Promise<number> {
  try {
    const statsRef = doc(db, 'stats', 'celebration');
    await setDoc(
      statsRef,
      {
        totalUnlocks: increment(1),
        lastUnlockedAt: new Date().toISOString(),
        honoree: 'SPENDY',
        level: 24,
      },
      { merge: true }
    );
    const snap = await getDoc(statsRef);
    if (snap.exists()) {
      return snap.data().totalUnlocks || 1;
    }
  } catch (err) {
    console.warn('Firebase stats sync fallback:', err);
  }
  return 1;
}

// Subscribe to real-time celebration stats
export function subscribeToStats(callback: (stats: CelebrationStats) => void) {
  const statsRef = doc(db, 'stats', 'celebration');
  return onSnapshot(
    statsRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        callback({
          totalUnlocks: data.totalUnlocks || 1,
          lastUnlockedAt: data.lastUnlockedAt || new Date().toISOString(),
          honoree: data.honoree || 'SPENDY',
          level: data.level || 24,
        });
      } else {
        // Initialize default
        const initial: CelebrationStats = {
          totalUnlocks: 1,
          lastUnlockedAt: new Date().toISOString(),
          honoree: 'SPENDY',
          level: 24,
        };
        setDoc(statsRef, initial).catch(console.warn);
        callback(initial);
      }
    },
    (error) => {
      console.warn('Stats listener error, using local state:', error);
      callback({
        totalUnlocks: 1,
        lastUnlockedAt: new Date().toISOString(),
        honoree: 'SPENDY',
        level: 24,
      });
    }
  );
}

// Subscribe to real-time birthday wishes
export function subscribeToWishes(callback: (wishes: BirthdayWish[]) => void) {
  const wishesCol = collection(db, 'wishes');
  const q = query(wishesCol, orderBy('createdAt', 'desc'), limit(25));

  return onSnapshot(
    q,
    (snapshot) => {
      const list: BirthdayWish[] = [];
      snapshot.forEach((docSnap) => {
        const d = docSnap.data();
        list.push({
          id: docSnap.id,
          senderName: d.senderName || 'Anonymous Friend',
          message: d.message || '',
          createdAt: d.createdAt || new Date().toISOString(),
          isGenesis: d.isGenesis || false,
        });
      });

      // Ensure Genesis wish exists if collection is empty
      if (list.length === 0) {
        callback([
          {
            id: 'genesis-wish',
            ...GENESIS_WISH,
          },
        ]);
      } else {
        callback(list);
      }
    },
    (error) => {
      console.warn('Wishes listener error, fallback to genesis wish:', error);
      callback([
        {
          id: 'genesis-wish',
          ...GENESIS_WISH,
        },
      ]);
    }
  );
}

// Send a new birthday wish to Spendy
export async function sendBirthdayWish(senderName: string, message: string): Promise<boolean> {
  try {
    const cleanSender = senderName.trim().slice(0, 50) || 'Friend';
    const cleanMsg = message.trim().slice(0, 500);
    if (!cleanMsg) return false;

    const wishesCol = collection(db, 'wishes');
    await addDoc(wishesCol, {
      senderName: cleanSender,
      message: cleanMsg,
      createdAt: new Date().toISOString(),
      isGenesis: false,
    });
    return true;
  } catch (err) {
    console.error('Failed to submit birthday wish to Firebase:', err);
    return false;
  }
}
