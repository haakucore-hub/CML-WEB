import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface BoardMemberStore {
  boardMembers: string[];   
  members: string[];      
  loading: boolean;
  error: string | null;
  fetchBoardMembers: () => Promise<void>;
  fetchMembers: () => Promise<void>;
}

const useBoardMemberStore = create<BoardMemberStore>((set,get) => ({
  boardMembers: [],
  members: [],
  loading: false,
  error: null,

  fetchBoardMembers: async () => {
         const state = get();
    if(state.boardMembers.length>0) return;
    set({ loading: true, error: null });
    try {
      const docRef = doc(db, "board_members", "board_members");
      const docSnap = await getDoc(docRef);
     
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Fetched board members data:", data);
        set({ boardMembers: data.board_members || [], loading: false });
      } else {
        set({ boardMembers: [], loading: false });
      }
    } catch (error) {
      console.error("Error fetching board members:", error);
      set({ error: "Failed to fetch board members", loading: false });
    }
  },

  fetchMembers: async () => {
       const state = get();
    if(state.members.length>0) return;
    set({ loading: true, error: null });
    try {
      const docRef = doc(db, "board_members", "members");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Fetched members data:", data);
        set({ members: data.members || [], loading: false });
      } else {
        set({ members: [], loading: false });
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      set({ error: "Failed to fetch members", loading: false });
    }
  },
}));

export default useBoardMemberStore;
