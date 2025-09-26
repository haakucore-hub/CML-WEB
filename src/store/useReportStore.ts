import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ReportStore {
  reports: string[];           // stores report items
  loading: boolean;
  error: string | null;
  fetchReports: () => Promise<void>;
}

const useReportStore = create<ReportStore>((set) => ({
  reports: [],
  loading: false,
  error: null,

  fetchReports: async () => {
    set({ loading: true, error: null });

    try {
      const docRef = doc(db, "reports", "reports"); // collection and doc
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        set({ reports: data.reports || [], loading: false }); // array inside doc
      } else {
        set({ reports: [], loading: false });
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      set({ error: "Failed to fetch reports", loading: false });
    }
  },
}));

export default useReportStore;
