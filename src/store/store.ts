import { create } from "zustand";

type State = {
  drawerStatus: boolean;
};

type Actions = {
  toggleDrawerStatus: () => void;
  setDrawerStatus: (status: boolean) => void;
};

const useDrawerStore = create<State & Actions>((set) => ({
  drawerStatus: false,
  toggleDrawerStatus: () => {
    return set((state) => {
      return {
        drawerStatus: !state.drawerStatus,
      };
    });
  },
  setDrawerStatus: (status: boolean) => {
    return set((state) => {
      return {
        drawerStatus: status,
      };
    });
  },
}));

export { useDrawerStore };
