import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Outreach {
  date: string;
  dateID: number;
  icon: string;
  image: string;
  title: string;
  description: string;
}

interface OutreachStore {
  outreach: Outreach[];
  loading: boolean;
  error: string | null;
  fetchOutreach: () => Promise<void>;
}

const useOutreachStore = create<OutreachStore>((set , get) => ({
  outreach: [],
  loading: false,
  error: null,

  fetchOutreach: async () => {
     const state = get();
    if(state.outreach.length>0) return;
    set({ loading: true, error: null });
    try {
      // collection: "outreach", doc: "outreach"
      const docRef = doc(db, "outreach", "outreach");
      const docSnap = await getDoc(docRef);
      console.log("Fetching outreach data from Firestore...");
      if (docSnap.exists()) {
        const data = docSnap.data();
        set({ outreach: data.outreach || [], loading: false });
      } else {
        set({ outreach: [], loading: false });
      }
    } catch (error) {
      console.error("Error fetching outreach:", error);
      set({ error: "Failed to fetch outreach", loading: false });
    }
  },
}));

export default useOutreachStore;
