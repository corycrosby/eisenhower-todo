import React from "react";
import { ListData, State, TaskData } from "../lib/types";
import Action from "../lib/actions";
import Task from "./task";
import styles from "./list.module.scss";

type Props = {
  listIdx: number;
  title: string;
  listData: ListData;
  setState: (state: State) => void
}

export default function List (props: Props) {
  function handleSubmitTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const updateData = { listIdx: props.listIdx, description: props.listData.createTaskValue };
    Action.createTask(updateData, props.setState);
  }
  
  function handleUpdateCreateTask(e: React.ChangeEvent<HTMLInputElement>) {
    const updateData = { listIdx: props.listIdx, createTaskValue: e.target.value };
    Action.updateCreateTaskValue(updateData, props.setState)
  }

  function handleDragEnter(e: React.DragEvent<HTMLOListElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    return false;
  }

  function handleDrop(e: React.DragEvent<HTMLOListElement>) {
    const { description, listIdx, idx } = JSON.parse(e.dataTransfer.getData("text/plain"));
    const updateData = { 
      dropPriority: props.listIdx, 
      dragPriority: listIdx, 
      taskIdx: idx, 
      taskDescription: description,
      insertIdx: null
    };

    Action.dropIntoList(updateData, props.setState);
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h3>{ props.title}</h3>
        <span className={styles.count}>{props.listData.taskLists.length}</span>
      </header>
      <form onSubmit={(e) => handleSubmitTask(e)} className={styles.form}>
        <input 
          placeholder="Create new task" 
          onChange={(e) => handleUpdateCreateTask(e)} 
          value={props.listData.createTaskValue}
        />
      </form>
      <ol 
        className={styles.list} 
        onDragEnter={(e) => handleDragEnter(e)} 
        onDragOver={(e) => e.preventDefault()} 
        onDrop={(e) => handleDrop(e)} 
      >
        { props.listData.taskLists.map((task, idx) => {
          return (
            <Task 
              key={idx} 
              description={task.description} 
              listIdx={props.listIdx} 
              idx={idx} 
              setState={props.setState}
            />
          );
        })}
      </ol>
    </section>
  )
}
