import { create } from "zustand";
import {axiosInstance} from '../lib/axios';  // <-- assuming default export

const useSuggestionsStore = create((set) => ({
  suggestions: [],
  loading: false,
  error: null,

  fetchSuggestions: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/suggestions", { withCredentials: true });  // <-- use axiosInstance
      set({ suggestions: res.data.suggestions, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  clearSuggestions: () => set({ suggestions: [], error: null })
}));

export default useSuggestionsStore;
