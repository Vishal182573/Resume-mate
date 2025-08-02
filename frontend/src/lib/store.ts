import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  description: string;
}

interface FormState {
  data: FormData;
  setData: (data: FormData) => void;
}
const sessionStorageAdapter = {
  getItem: (name: string) => {
    if (typeof window !== 'undefined') {
      return window.sessionStorage.getItem(name);
    }
    return null;
  },
  setItem: (name: string, value: string) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(name, value);
    }
  },
  removeItem: (name: string) => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(name);
    }
  },
};

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      data: {
        name: '',
        email: '',
        phone: '',
        position: '',
        description: '',
      },
      setData: (data) => set({ data }),
    }),
    {
      name: 'pdf-form-storage',
      storage: createJSONStorage(() => sessionStorageAdapter),
    }
  )
);