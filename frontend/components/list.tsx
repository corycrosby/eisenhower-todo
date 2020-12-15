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
  function getTotalCompleted(tasks: TaskData[]) {
    let count = 0;

    for (const task of tasks) {
      if (task.isCompleted) count++
    }
    return count;
  }

  function handleSubmitTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const updateData = { listIdx: props.listIdx, task: { description: props.listData.createTaskValue, isCompleted: false, isDragging: false } };
    Action.createTask(updateData, props.setState);
  }
  
  function handleUpdateCreateTask(e: React.ChangeEvent<HTMLInputElement>) {
    const updateData = { listIdx: props.listIdx, createTaskValue: e.target.value };
    Action.updateCreateTaskValue(updateData, props.setState);
  }

  function handleDragEnter(e: React.DragEvent<HTMLOListElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    return false;
  }

  function handleDrop(e: React.DragEvent<HTMLOListElement>) {
    const { listIdx, idx, taskData } = JSON.parse(e.dataTransfer.getData("text/plain"));
    const updateData = { 
      dropPriority: props.listIdx, 
      dragPriority: listIdx, 
      taskIdx: idx, 
      taskDescription: taskData.description,
      insertIdx: null,
      isDragging: taskData.isDragging,
      isCompleted: taskData.isCompleted
    };

    Action.dropIntoList(updateData, props.setState);
  }

  function getContainerClasses(listIdx: number) {
    switch (listIdx) {
      case 0:
        return `${styles.container} ${styles.urgent}`;

      case 1:
        return `${styles.container} ${styles.schedule}`;

      case 2:
        return `${styles.container} ${styles.delegate}`;
    
      default:
        return `${styles.container} ${styles.pass}`;
    }
  }

  const isFullList = props.listData.tasks.length == 8 ? true : false;
  const inputClassNames = isFullList ? `${styles.input} ${styles.disabled}` : `${styles.input}`;

  return (
    <section className={getContainerClasses(props.listIdx)}>
      <header className={styles.header}>
        <h4 className={styles.h4}>{ props.title}</h4>
        <div>
          <span id="tasks-count" className={styles.count}>{props.listData.tasks.length}</span>
          <span className={styles.label}>tasks</span>
          <span id="tasks-count" className={styles.count}>{getTotalCompleted(props.listData.tasks)}</span>
          <span className={styles.label}>completed</span>
        </div>
      </header>
      <form onSubmit={(e) => handleSubmitTask(e)} className={styles.form}>
        <input 
          className={inputClassNames}
          placeholder={"Create new task..."}
          onChange={(e) => handleUpdateCreateTask(e)} 
          value={isFullList ? "Maximum number of tasks" : props.listData.createTaskValue}
          disabled={isFullList}
        />
      </form>
      <ol 
        className={styles.list} 
        onDragEnter={(e) => handleDragEnter(e)} 
        onDragOver={(e) => e.preventDefault()} 
        onDrop={(e) => handleDrop(e)} 
      >
        { props.listData.tasks.map((task, idx) => {
          return (
            <Task 
              key={idx} 
              listIdx={props.listIdx} 
              idx={idx} 
              taskData={task}
              setState={props.setState}
            />
          );
        })}
      </ol>
    </section>
  )
}
