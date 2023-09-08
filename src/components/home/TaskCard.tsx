import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
interface TaskCardProps {
  icon: string;
  iconBg: string;
  title: string;
  count: number;
}

function TaskCard(props: TaskCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 1.1, transition: { type: "spring" } }}
      className=" rounded-2xl bg-white dark:bg-neutral-800  p-4 flex flex-col justify-between shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className={`${props.iconBg} p-1.5 rounded-full text-white`}>
          <Icon icon={props.icon} className="text-2xl" />
        </div>
        <div className="font-bold text-2xl">{props.count}</div>
      </div>
      <div className="font-medium text-slate-500 dark:text-slate-300 text-sm">
        {props.title}
      </div>
    </motion.div>
  );
}

export default TaskCard;
