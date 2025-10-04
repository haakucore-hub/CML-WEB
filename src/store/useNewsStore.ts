import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface NewsStore {
  news: any[];
  loading: boolean;
  error: string | null;
  fetchNews: () => Promise<void>;
}

interface NewsItem {
  id: string;
  title: string;
  date: string;
  author:string;
  desc:string[];
  images: string[];
  content: string;
}

interface SingleNewsStore {
  article: NewsItem | null;
  loading: boolean;
  error: string | null;
  fetchNewsById: (uid: string) => Promise<void>;
}


const useNewsStore = create<NewsStore>((set , get) => ({
  news: [],
  loading: false,
  error: null,

  fetchNews: async () => {
    const state = get();
    if(state.news.length>0) return;
    set({ loading: true, error: null });
    try {
      console.log('call')
      const docRef = doc(db, "news", "news");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        set({ news: data.news || [], loading: false });
      } else {
        set({ news: [], loading: false });
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      set({ error: "Failed to fetch news", loading: false });
    }
  },
}));

const useSingleNewsStore = create<SingleNewsStore>((set) => ({
  article: null,
  loading: false,
  error: null,

  fetchNewsById: async (uid: string) => {
    set({ loading: true, error: null });

    try {
      // Reference to the document: collection "news", doc "news"
      const docRef = doc(db, "news", "news");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        // Assuming `news` is an array inside the doc
        const article = (data.news || []).find((item: any) => item.id === uid);

        if (article) {
          set({ article, loading: false });
        } else {
          set({ article: null, error: "Article not found", loading: false });
        }
      } else {
        set({ article: null, error: "No news found", loading: false });
      }
    } catch (error) {
      console.error("Error fetching article:", error);
      set({ error: "Failed to fetch article", loading: false });
    }
  },
}));


export { useNewsStore, useSingleNewsStore };
