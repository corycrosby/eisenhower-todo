import { useEffect, useState } from "react";
import List from "../components/list";
import styles from "./layout.module.scss";
import Todo from "../lib/data";

export default function Layout() {
  const [sortedTasks, setSortedTasks] = useState([[], [], [], []]);

  useEffect(() => {
    const taskData = Todo.getTaskData();
    setSortedTasks(Todo.getSortedTasks(taskData))
  }, []);

  return (
    <div className={styles.container}>
      { sortedTasks.map((tasks, idx) => {
          return <List key={idx} title="list title" priority={idx + 1} tasks={tasks} />
      })}
    </div>
  )
}