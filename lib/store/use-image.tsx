import { create } from "zustand";

interface ImageState {
  selectedImage: string | null;
  selectedImageAlt: string | null;
  setSelectedImage: (imageUrl: string | null, alt?: string) => void;
  isDialogOpen: boolean;
  setDialogOpen: (isOpen: boolean) => void;
}

export const useImageStore = create<ImageState>()((set) => ({
  selectedImage: null,
  selectedImageAlt: null,
  setSelectedImage: (imageUrl: string | null, alt?: string) =>
    set({ selectedImage: imageUrl, selectedImageAlt: alt ?? null }),
  isDialogOpen: false,
  setDialogOpen: (isOpen: boolean) => set({ isDialogOpen: isOpen }),
}));
