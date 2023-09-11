import { create } from "zustand";
type DrawerState = {
  drawerStatus: boolean;
  content: JSX.Element;
  title: string;
};

type DrawerActions = {
  toggleDrawerStatus: () => void;
  setDrawerStatus: (status: boolean) => void;
  changeContent: (ele: JSX.Element) => void;
  changeTitle: (title: string) => void;
};

const useDrawerStore = create<DrawerState & DrawerActions>((set) => ({
  drawerStatus: false,
  title: "",
  content: <></>,
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
  changeTitle: (title: string) => {
    return set(() => {
      return {
        title,
      };
    });
  },
}));

type NoticeState = {
  noticeStatus: boolean;
  noticeOptions: {
    mes: string;
    confirmBtn: boolean;
    confirmStatus: boolean | null;
    autoClose: boolean;
    autoCloseTime: number;
  };
};

type NoticeActions = {
  toggleNotice: () => void;
  setNoticeOptions: (options: {
    mes: string;
    confirmBtn?: boolean;
    confirmStatus?: boolean | null;
    autoClose?: boolean;
    autoCloseTime?: number;
  }) => void;
  showNotice: () => void;
  closeNotice: () => void;
};

const useNoticeStore = create<NoticeState & NoticeActions>((set) => ({
  noticeStatus: false,
  noticeOptions: {
    mes: "",
    confirmBtn: false,
    confirmStatus: null,
    autoClose: true,
    autoCloseTime: 3000,
  },
  toggleNotice: () => set((state) => ({ noticeStatus: !state.noticeStatus })),
  setNoticeOptions: (options) => {
    return set((state) => {
      return {
        noticeOptions: {
          ...state.noticeOptions,
          ...options,
          //这里options必须在state.noticeOptions后面展开 因为后面会覆盖前面的!
        },
      };
    });
  },
  showNotice: () => set(() => ({ noticeStatus: true })),
  closeNotice: () => set(() => ({ noticeStatus: false })),
}));

/* type NewTaskState = {
  taskTitle: string;
  description: string;
  endTime: Date | null;
  reminder: Date | null;
  important: boolean;
  categoryId: number;
};

type NewTaskActions = {
  setTaskTitle: (newTitle: string) => void;
  setDescription: (newDescription: string) => void;
  setEndTime: (time: Date) => void;
  setReminder: (time: Date) => void;
  setImportant: (status: boolean) => void;
  setCategoryId: (id: number) => void;
};

const useNewTaskStore = create<NewTaskState & NewTaskActions>((set) => ({
  taskTitle: "",
  description: "",
  endTime: null,
  reminder: null,
  important: false,
  categoryId: 1,
  setTaskTitle: (title: string) => {
    return set(() => {
      return {
        taskTitle: title,
      };
    });
  },
  setDescription: (newDescription: string) => {
    return set(() => {
      return {
        description: newDescription,
      };
    });
  },
  setEndTime(time) {
    return set(() => {
      return {
        endTime: time,
      };
    });
  },
  setReminder(time) {
    return set(() => {
      return {
        reminder: time,
      };
    });
  },
  setImportant(status) {
    
    return set(() => {
      return {
        important: status,
      };
    });
  },
  setCategoryId(id) {
    return set(() => {
      return {
        categoryId: id,
      };
    });
  },
})); */

export { useDrawerStore, useNoticeStore };
