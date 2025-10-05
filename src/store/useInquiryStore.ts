import { create } from "zustand";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// ---------- Types ----------
interface Region {
  district: string;
  state: string;
}



interface Inquiry {
  id: string;
  Regions: Region[];
  createdAt: string;
  designation: string;
  email: string;
  file?: string; // optional if you plan to store file URL
  interests: [];
  msg: string;
  name: string;
  pending_inquiries: number;
  phone: string;
}

// Store for adding inquiries
interface InquiryStore {
  loading: boolean;
  error: string | null;
  success: boolean;
  addInquiry: (data: Omit<Inquiry, "id" | "createdAt">) => Promise<void>;
}

const useInquiryStore = create<InquiryStore>((set) => ({
  loading: false,
  error: null,
  success: false,

  addInquiry: async (data) => {
    set({ loading: true, error: null, success: false });
    try {
      await addDoc(collection(db, "inquiries"), {
        ...data,
        createdAt: new Date().toISOString(),
      });
      set({ loading: false, success: true });
    } catch (error) {
      console.error("Error adding inquiry:", error);
      set({ error: "Failed to add inquiry", loading: false, success: false });
    }
  },
}));

export { useInquiryStore };
