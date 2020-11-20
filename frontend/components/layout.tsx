import { useEffect, useState } from "react";
import List from "../components/list";
import styles from "./layout.module.scss";
import Tasks from "../lib/tasks";
import { TaskData } from "../lib/types";

export default function Layout() {
  const [taskData, setTaskData] = useState(null);

  useEffect(() => {
    setTaskData(Tasks.getTaskData());
  }, []);

  return (
    <div className={styles.container}>
      {taskData ? 
        taskData.map((tasks: TaskData[], idx: number) => {
          return <List key={idx} title="list title" priority={idx} tasks={tasks} setTaskData={setTaskData} />
        }) : 
        <div>loading data refesh page...</div>
      }
    </div>
  )
}