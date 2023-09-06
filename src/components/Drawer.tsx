"use client";

import useToggle from "@/hooks/Toggle";
import { useEffect } from "react";

interface DrawerProps {}
function Drawer(props: DrawerProps) {
  const [visible, setVisible] = useToggle();
  useEffect(() => {
    setVisible(true);
  }, []);
  return (
    <div
      className="fixed z-40 w-full h-screen top-0 left-0 flex items-end backdrop-blur-[2px] backdrop-brightness-75"
      onClick={setVisible}
    >
      <div
        className={`bg-white absolute z-50 left-0 right-0 h-[90%] ${
          visible ? "top-[10vh]" : "top-[100vh]"
        }  transition-[top] duration-300 rounded-t-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        111
      </div>
    </div>
  );
}

export default Drawer;
