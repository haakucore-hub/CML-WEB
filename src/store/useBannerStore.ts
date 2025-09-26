import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface BannerStore {
  banners: string[];  
  loading: boolean;
  error: string | null;

  fetchBanners: () => Promise<void>;
}

const useBannerStore = create<BannerStore>((set) => ({
  banners: [],
  loading: false,
  error: null,

  fetchBanners: async () => {
    set({ loading: true, error: null });
    try {
      const docRef = doc(db, "banners", "banners");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        set({ banners: data.banners || [], loading: false });
      } else {
        set({ banners: [], loading: false });
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      set({ error: "Failed to fetch banners", loading: false });
    }
  },
}));

export default useBannerStore;
