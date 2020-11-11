import { useState } from "react";
import styles from "./list.module.scss";
import Task from "./task";
import Tasks from "../lib/tasks";
import { TaskData } from "../lib/types";

type Props = {
  title: string;
  priority: number;
  tasks: TaskData[];
}

export default function List (props: Props) {
  const [taskDescription, setTaskDescription] = useState("")

  function handleSubmit() {
    Tasks.createTask(taskDescription, props.priority);
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h3>{ props.title }</h3>
        <span className={styles.count}>{props.tasks.length}</span>
      </header>
      <form onSubmit={() => handleSubmit()}>
        <input 
          placeholder="Create new task" 
          onChange={(e) => setTaskDescription(e.target.value)} 
        />
      </form>
      <hr />
      <ol>
        { props.tasks.map((task, idx) => {
          return <Task key={idx} description={task.description} priority={props.priority} />;
        })}
      </ol>
    </section>
  )
}
