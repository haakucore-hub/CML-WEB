import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface OurWork {
  date: string;
  dateID: number;
  icon: string;
  image: string;
  title: string;
  description: string;
}

interface OurWorkStore {
  // Full list
  ourWork: OurWork[];
  loadingList: boolean;

  // Single item
  workDetail: OurWork | null;
  loadingDetail: boolean;

  // Errors
  errorList: string | null;
  errorDetail: string | null;

  // Actions
  fetchOurWork: () => Promise<void>;
  fetchWorkById: (id: number | string) => Promise<void>;
}

const useOurWorkStore = create<OurWorkStore>((set) => ({
  // Full list
  ourWork: [],
  loadingList: false,
  errorList: null,

  // Single work detail
  workDetail: null,
  loadingDetail: false,
  errorDetail: null,

  // Fetch all works
  fetchOurWork: async () => {
    set({ loadingList: true, errorList: null });
    try {
      const docRef = doc(db, "our_work", "our_work");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        set({ ourWork: data.our_work || [], loadingList: false });
      } else {
        set({ ourWork: [], loadingList: false });
      }
    } catch (error) {
      console.error("Error fetching our work list:", error);
      set({ errorList: "Failed to fetch our work list", loadingList: false });
    }
  },

  // Fetch single work by ID
  fetchWorkById: async (id) => {
    set({ loadingDetail: true, errorDetail: null, workDetail: null });

    try {
      const docRef = doc(db, "our_work", "our_work");
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        set({ workDetail: null, loadingDetail: false, errorDetail: "No work data found" });
        return;
      }

      const data = docSnap.data();
      const works: OurWork[] = data.our_work || [];

      const work = works.find(
        (item) => String(item.dateID) === String(id) || String(item.id) === String(id)
      );

      if (!work) {
        set({ workDetail: null, loadingDetail: false, errorDetail: "Work not found" });
        return;
      }

      set({ workDetail: work, loadingDetail: false });
    } catch (error) {
      console.error("Error fetching work by ID:", error);
      set({ workDetail: null, loadingDetail: false, errorDetail: "Failed to fetch work" });
    }
  },
}));

export default useOurWorkStore;
