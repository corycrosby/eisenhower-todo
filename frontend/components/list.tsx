import React, { useState } from "react";
import styles from "./list.module.scss";
import Task from "./task";
import Tasks from "../lib/tasks";
import { TaskData } from "../lib/types";

type Props = {
  title: string;
  priority: number;
  tasks: TaskData[];
  setTaskData: (data: TaskData[][]) => void
}

export default function List (props: Props) {
  const [taskDescription, setTaskDescription] = useState("");

  function handleSubmit() {
    Tasks.createTask(taskDescription, props.priority);
  }

  function handleDragEnter(e: React.DragEvent<HTMLOListElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    return false;
  }

  function handleDrop(e: React.DragEvent<HTMLOListElement>) {
    const { description } = JSON.parse(e.dataTransfer.getData("text/plain"));
    Tasks.updateTasks(description, props.priority)

    props.setTaskData(Tasks.getTaskData())
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
      <ol 
        className={styles.ol} 
        onDragEnter={(e) => handleDragEnter(e)} 
        onDragOver={(e) => e.preventDefault()} 
        onDrop={(e) => handleDrop(e)} 
      >
        { props.tasks.map((task, idx) => {
          return (
            <Task 
              key={idx} 
              description={task.description} 
              priority={task.priority} 
              idx={idx} 
            />
          );
        })}
      </ol>
    </section>
  )
}
