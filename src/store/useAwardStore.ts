import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface AwardStore {
  awards: any[] ;           // store list of award objects or strings
  loading: boolean;
  error: string | null;
  fetchAwards: () => Promise<void>;
}

const useAwardStore = create<AwardStore>((set,get) => ({
  awards: [],
  loading: false,
  error: null,

  fetchAwards: async () => {
          const state = get();
    if(state.awards.length>0) return;
    set({ loading: true, error: null });

    try {
      const docRef = doc(db, "awards", "awards"); // Firestore collection and doc
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        set({ awards: data.awards || [], loading: false });
      } else {
        set({ awards: [], loading: false });
      }
    } catch (error) {
      console.error("Error fetching awards:", error);
      set({ error: "Failed to fetch awards", loading: false });
    }
  },
}));

export default useAwardStore;
