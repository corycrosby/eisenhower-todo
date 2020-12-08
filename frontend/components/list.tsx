import React from "react";
import { State, TaskData } from "../lib/types";
import Action from "../lib/actions";
import Task from "./task";
import styles from "./list.module.scss";

type Props = {
  priority: number;
  title: string;
  createTaskValue: string;
  taskList: TaskData[];
  setState: (state: State) => void
}

export default function List (props: Props) {
  function handleSubmitTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const updateData = { priority: props.priority, description: props.createTaskValue };
    Action.createTask(updateData, props.setState);
  }
  
  function handleUpdateCreateTask(e: React.ChangeEvent<HTMLInputElement>) {
    Action.updateCreateTaskValue(e.target.value, props.setState)
  }

  function handleDragEnter(e: React.DragEvent<HTMLOListElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    return false;
  }

  function handleDrop(e: React.DragEvent<HTMLOListElement>) {
    const { description, priority, idx } = JSON.parse(e.dataTransfer.getData("text/plain"));
    const updateData = { 
      dropPriority: props.priority, 
      dragPriority: priority, 
      taskIdx: idx, 
      description: description
    };

    Action.dropIntoList(updateData, props.setState);
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h3>{ props.title}</h3>
        <span className={styles.count}>{props.taskList.length}</span>
      </header>
      <form onSubmit={(e) => handleSubmitTask(e)} className={styles.form}>
        <input 
          placeholder="Create new task" 
          onChange={(e) => handleUpdateCreateTask(e)} 
          value={props.createTaskValue}
        />
      </form>
      <ol 
        className={styles.list} 
        onDragEnter={(e) => handleDragEnter(e)} 
        onDragOver={(e) => e.preventDefault()} 
        onDrop={(e) => handleDrop(e)} 
      >
        { props.taskList.map((task, idx) => {
          return (
            <Task 
              key={idx} 
              description={task.description} 
              priority={props.priority} 
              idx={idx} 
              setState={props.setState}
            />
          );
        })}
      </ol>
    </section>
  )
}
