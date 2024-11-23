import {create} from 'zustand';

const useStore = create((set) => ({
  store: 0,
  setStore: (value: number) => {
    set({store: value});
  },
}));

export default useStore;
