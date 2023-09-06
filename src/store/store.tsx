import { create } from "zustand";
type State = {
  drawerStatus: boolean;
  content: JSX.Element;
};

type Actions = {
  toggleDrawerStatus: () => void;
  setDrawerStatus: (status: boolean) => void;
  changeContent: (ele: JSX.Element) => void;
};

const useDrawerStore = create<State & Actions>((set) => ({
  drawerStatus: false,
  content: <div className="p-4">111</div>,
  toggleDrawerStatus: () => {
    return set((state) => {
      return {
        drawerStatus: !state.drawerStatus,
      };
    });
  },
  setDrawerStatus: (status: boolean) => {
    return set(() => {
      return {
        drawerStatus: status,
      };
    });
  },
  changeContent: (ele: JSX.Element) => {
    return set(() => {
      return {
        content: ele,
      };
    });
  },
}));

export { useDrawerStore };
