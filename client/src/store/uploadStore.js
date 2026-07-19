import { create } from 'zustand'

const useUploadStore = create((set) => ({
  uploadData: null,
  setUploadData: (uploadData) => set({ uploadData }),
  clearUploadData: () => set({ uploadData: null }),
}))

export default useUploadStore
