import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface SocialOutreach {
  date: string;
  dateID: number;
  icon: string;
  id: string;
  image: string;
  likes: string;
  link: string;
  logo: string;
  msg: string;
  shares: string;
  tags: string[];
  type: string;
}

interface SocialOutreachStore {
  socialOutreachs: SocialOutreach[];
  loading: boolean;
  error: string | null;
  fetchSocialOutreachs: () => Promise<void>;
}

const useSocialOutreachStore = create<SocialOutreachStore>((set, get) => ({
  socialOutreachs: [],
  loading: false,
  error: null,

  fetchSocialOutreachs: async () => {
    const state = get();
    if (state.socialOutreachs.length > 0) return; 
    set({ loading: true, error: null });

    try {
      const querySnapshot = await getDocs(collection(db, "social_outreachs"));
      const data: SocialOutreach[] = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as SocialOutreach),
      }));

      console.log("Fetched social_outreachs data:", data);
      set({ socialOutreachs: data, loading: false });
    } catch (error) {
      console.error("Error fetching social_outreachs:", error);
      set({ error: "Failed to fetch social outreachs", loading: false });
    }
  },
}));

export default useSocialOutreachStore;
