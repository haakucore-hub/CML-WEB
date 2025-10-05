import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface StoryStore {
  stories: string[];
  loading: boolean;
  error: string | null;
  fetchStories: () => Promise<void>;
}

const useStoryStore = create<StoryStore>((set, get) => ({
  stories: [],
  loading: false,
  error: null,

  fetchStories: async () => {
    const state = get();
    if (state.stories.length > 0) return;
    set({ loading: true, error: null });
    try {
      const docRef = doc(db, "stories", "stories"); // collection and doc name
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        set({ stories: data.stories || [], loading: false });
      } else {
        set({ stories: [], loading: false });
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
      set({ error: "Failed to fetch stories", loading: false });
    }
  },
}));

export default useStoryStore;
