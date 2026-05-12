import { create } from "zustand";
import { persist } from "zustand/middleware";

type PopupStore = {
  imageUrl: string;
  lastFetchedAt: string;
  loading: boolean;
  error: string;

  setImageUrl: (imageUrl: string) => void;
  setLastFetchedAt: (lastFetchedAt: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
};

export const usePopupStore = create<PopupStore>()(
  persist(
    (set) => ({
      imageUrl: "",
      lastFetchedAt: "",
      loading: false,
      error: "",

      setImageUrl: (imageUrl) => set({ imageUrl }),
      setLastFetchedAt: (lastFetchedAt) => set({ lastFetchedAt }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
    }),
    {
      name: "popup-store",
      partialize: (state) => ({
        imageUrl: state.imageUrl,
        lastFetchedAt: state.lastFetchedAt,
      }),
    }
  )
);