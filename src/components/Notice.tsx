"use client";
import { useNoticeStore } from "@/store/store";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Icon } from "@iconify/react";

function Notice() {
  const { noticeOptions, noticeStatus, closeNotice } = useNoticeStore(
    (state) => state
  );
  useEffect(() => {
    if (noticeStatus && noticeOptions.autoClose) {
      const _temp = setTimeout(() => {
        closeNotice();
      }, noticeOptions.autoCloseTime);
      return () => {
        clearInterval(_temp);
      };
    }
  }, [noticeStatus]);
  return (
    <AnimatePresence>
      {noticeStatus && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring" }}
          drag="x"
          dragConstraints={{ left: 0, right: window.innerWidth }}
          dragElastic={0.2}
          className="fixed w-[90%] z-40 left-[5%] top-4 p-4 rounded-lg bg-white dark:bg-black shadow-md"
        >
          <div className="flex items-center">
            <div className="flex gap-2 items-center p-1">
              <Icon icon="mdi:bell" className="text-2xl text-amber-500" />
            </div>
            <div className="flex-1 font-bold text-lg">{noticeOptions.mes}</div>
            <div onClick={closeNotice}>
              <Icon icon="mdi:close" className="text-2xl text-red-500" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Notice;
