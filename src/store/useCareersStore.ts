import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface CareersStore {
  careers: string[];
  loading: boolean;
  error: string | null;
  fetchCareers: () => Promise<void>;
}

const useCareersStore = create<CareersStore>((set) => ({
  careers: [],
  loading: false,
  error: null,

  fetchCareers: async () => {
    set({ loading: true, error: null });
    try {
      // both collection and doc name are "careers"
      const docRef = doc(db, "careers", "careers");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        set({ careers: data.careers || [], loading: false });
      } else {
        set({ careers: [], loading: false });
      }
    } catch (error) {
      console.error("Error fetching careers:", error);
      set({ error: "Failed to fetch careers", loading: false });
    }
  },
}));

export default useCareersStore;
