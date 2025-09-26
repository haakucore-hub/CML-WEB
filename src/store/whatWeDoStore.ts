import { create } from "zustand";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Types
interface Project {
  title: string;
  state: string;
  description: string;
  highlightPoints: string[];
  outcomes: {
    additionalRevenue?: string;
    produce?: string;
    fish?: string;
    incomeIncrease?: string;
  };
  images: string[];
  sdgs: number[]; // Sustainable Development Goals (1,2,...)
  buttonText?: string;
  buttonLink?: string;
}

interface WhatWeDoData {
  projects: Project[];
  updatedAt: Date;
}

interface WhatWeDoStore {
  projects: Project[];
  loading: boolean;
  error: string | null;

  fetchProjects: (tab: string) => Promise<void>;
  updateProjects: (tab: string, projects: Project[]) => Promise<{ success: boolean; message?: string }>;
  addProject: (tab: string, project: Project) => Promise<{ success: boolean; message?: string }>;
  updateProject: (tab: string, index: number, project: Project) => Promise<{ success: boolean; message?: string }>;
  deleteProject: (tab: string, index: number) => Promise<{ success: boolean; message?: string }>;
}

const useWhatWeDoStore = create<WhatWeDoStore>((set, get) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async (tab: string) => {
    set({ loading: true, error: null });
    try {
      const docRef = doc(db, "whatWeDo", tab); // each tab is a doc
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as WhatWeDoData;
        set({ projects: data.projects || [], loading: false });
      } else {
        set({ projects: [], loading: false });
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ error: "Failed to fetch projects", loading: false });
    }
  },

  updateProjects: async (tab: string, projects: Project[]) => {
    set({ loading: true, error: null });
    try {
      const docRef = doc(db, "whatWeDo", tab);
      const updateData = { projects, updatedAt: new Date() };
      await updateDoc(docRef, updateData);

      set({ projects, loading: false });
      return { success: true, message: "Projects updated successfully" };
    } catch (error) {
      console.error("Error updating projects:", error);
      set({ error: "Failed to update projects", loading: false });
      return { success: false, message: "Failed to update projects" };
    }
  },

  addProject: async (tab: string, project: Project) => {
    const current = get().projects;
    const updated = [...current, project];
    return await get().updateProjects(tab, updated);
  },

  updateProject: async (tab: string, index: number, project: Project) => {
    const current = get().projects;
    if (index < 0 || index >= current.length) {
      return { success: false, message: "Invalid project index" };
    }
    const updated = [...current];
    updated[index] = project;
    return await get().updateProjects(tab, updated);
  },

  deleteProject: async (tab: string, index: number) => {
    const current = get().projects;
    if (index < 0 || index >= current.length) {
      return { success: false, message: "Invalid project index" };
    }
    const updated = current.filter((_, i) => i !== index);
    return await get().updateProjects(tab, updated);
  },
}));

export default useWhatWeDoStore;