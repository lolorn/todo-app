"use client";
import { useDrawerStore } from "@/store/store";
import { motion, AnimatePresence } from "framer-motion";

const variantsDrawer = {
  open: { height: "90vh" },
  closed: { height: 0 },
};

const variantsMask = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

function Drawer() {
  const visible = useDrawerStore((state) => state.drawerStatus);
  const toggle = useDrawerStore((state) => state.toggleDrawerStatus);
  const content = useDrawerStore((state) => state.content);
  return (
    <AnimatePresence>
      {visible ? (
        <>
          <motion.div
            animate={visible ? "open" : "closed"}
            variants={variantsMask}
            className="fixed z-40 w-full h-screen top-0 left-0 flex items-end backdrop-blur-[2px] backdrop-brightness-75"
            onClick={toggle}
          >
            <motion.div
              animate={visible ? "open" : "closed"}
              variants={variantsDrawer}
              exit={{ height: 0 }}
              className={
                "bg-white dark:bg-black absolute z-50 left-0 right-0 rounded-t-2xl"
              }
              onClick={(e) => e.stopPropagation()}
            >
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
