import { useEffect, useState } from "react";
import List from "../components/list";
import styles from "./layout.module.scss";
import Tasks from "../lib/tasks";

export default function Layout() {
  const [sortedTasks, setSortedTasks] = useState([[], [], [], []]);

  useEffect(() => {
    const taskData = Tasks.getTaskData();
    setSortedTasks(Tasks.getSortedTasks(taskData))
  }, []);

  return (
    <div className={styles.container}>
      { sortedTasks.map((tasks, idx) => {
          return <List key={idx} title="list title" priority={idx + 1} tasks={tasks} />
      })}
    </div>
  )
}