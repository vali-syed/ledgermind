import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUploadStore = create(
  persist(
    (set) => ({
      uploadData: null,
      setUploadData: (uploadData) => set({ uploadData }),
      clearUploadData: () => set({ uploadData: null }),
    }),
    { name: 'ledgermind-store' },
  ),
)

export default useUploadStore
