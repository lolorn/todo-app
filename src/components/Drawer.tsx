"use client";
import { useDrawerStore } from "@/store/store";
import { motion, AnimatePresence } from "framer-motion";

const variantsDrawer = {
  open: { height: "90vh" },
  closed: { height: 0 },
};

const variantsMask = {
  open: { scale: 1 },
  closed: { scale: 0 },
};

function Drawer() {
  const visible = useDrawerStore((state) => state.drawerStatus);
  const toggle = useDrawerStore((state) => state.toggleDrawerStatus);
  const setDrawerStatus = useDrawerStore((state) => state.setDrawerStatus);
  const content = useDrawerStore((state) => state.content);
  const title = useDrawerStore((state) => state.title);
  return (
    <AnimatePresence>
      {visible ? (
        <>
          <motion.div
            animate={visible ? "open" : "closed"}
            variants={variantsMask}
            className="fixed z-30 w-full h-screen top-0 left-0 flex items-end backdrop-blur-[2px] backdrop-brightness-75"
            onClick={() => {
              setDrawerStatus(false);
            }}
          >
            <motion.div
              animate={visible ? "open" : "closed"}
              variants={variantsDrawer}
              exit={{ height: 0 }}
              className={
                "bg-white dark:bg-neutral-900 absolute z-40 left-0 right-0 rounded-t-2xl"
              }
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4">
                <span className="w-10"></span>
                <span className="text-2xl">{title}</span>
                <span className="text-blue-500 w-10" onClick={toggle}>
                  完成
                </span>
              </div>
              {content}
            </motion.div>
          </motion.div>
        </>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
}

export default Drawer;
