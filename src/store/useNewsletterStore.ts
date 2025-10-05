import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface NewsletterStore {
 
  newsLetter: string[];      // stores newsletter items
  loading: boolean;
  error: string | null;
  fetchNewsLetter: () => Promise<void>;
}

const useNewsletterStore = create<NewsletterStore>((set,get) => ({
  newsLetter: [],
  loading: false,
  error: null,

  fetchNewsLetter: async () => {
           const state = get();
    if(state.newsLetter.length>0) return;
    set({ loading: true, error: null });

    try {
      const docRef = doc(db, "news_letter", "news_letter"); // collection and doc
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        set({ newsLetter: data.news_letter || [], loading: false }); // array inside doc
      } else {
        set({ newsLetter: [], loading: false });
      }
    } catch (error) {
      console.error("Error fetching newsletter:", error);
      set({ error: "Failed to fetch newsletter", loading: false });
    }
  },
}));

export default useNewsletterStore;
