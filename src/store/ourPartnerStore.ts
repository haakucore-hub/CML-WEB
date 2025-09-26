import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface PartnerStore {
  partners: string[];
  loading: boolean;
  error: string | null;
  fetchPartners: () => Promise<void>;
}

const usePartnerStore = create<PartnerStore>((set) => ({
  partners: [],
  loading: false,
  error: null,

  fetchPartners: async () => {
    set({ loading: true, error: null });
    try {
      const docRef = doc(db, "partners", "partners"); // collection and doc name
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        set({ partners: data.partners || [], loading: false });
      } else {
        set({ partners: [], loading: false });
      }
    } catch (error) {
      console.error("Error fetching partners:", error);
      set({ error: "Failed to fetch partners", loading: false });
    }
  },
}));

export default usePartnerStore;
