import { create } from "zustand";
import { collection, addDoc, } from "firebase/firestore";
import { db } from "@/lib/firebase";

// ---------- Types ----------
interface JobApplicant {
  id: string;
  cv_url: string;
  name: string;
  number: string;
  jobName: string;
  date: string;
}


// Store for applying (adding) job applications
interface ApplyJobStore {
  loading: boolean;
  error: string | null;
  success: boolean;
  applyJob: (data: Omit<JobApplicant, "id" | "date">) => Promise<void>;
}


const useApplyJobStore = create<ApplyJobStore>((set) => ({
  loading: false,
  error: null,
  success: false,

  applyJob: async (data) => {
   
    set({ loading: true, error: null, success: false });
    try {
      await addDoc(collection(db, "job_applicant"), {
        ...data,
        date: new Date().toISOString(),
      });
      set({ loading: false, success: true });
    } catch (error) {
      console.error("Error applying job:", error);
      set({ error: "Failed to apply job", loading: false, success: false });
    }
  },
}));

export { useApplyJobStore };
