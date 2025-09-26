import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface TendersStore {
  tenders: string[];
  loading: boolean;
  error: string | null;
  fetchTenders: () => Promise<void>;
}

const useTendersStore = create<TendersStore>((set) => ({
  tenders: [],
  loading: false,
  error: null,

  fetchTenders: async () => {
    set({ loading: true, error: null });
    try {
      // both collection and doc name are "tenders"
      const docRef = doc(db, "tenders", "tenders");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        set({ tenders: data.tenders || [], loading: false });
      } else {
        set({ tenders: [], loading: false });
      }
    } catch (error) {
      console.error("Error fetching tenders:", error);
      set({ error: "Failed to fetch tenders", loading: false });
    }
  },
}));

export default useTendersStore;
