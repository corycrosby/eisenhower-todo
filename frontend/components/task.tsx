import React, { useState } from "react";
import styles from "./task.module.scss";
import Tasks from "../lib/tasks";

type Props = {
  description: string;
  priority: number;
  idx: number;
}

export default function Task(props: Props) {
  const [drag, setDrag] = useState(false);

  function handleDragStart(e: React.DragEvent<HTMLLIElement>, idx: number) {
    e.dataTransfer.setData("text/plain", `${JSON.stringify(props)}`)
    e.dataTransfer.effectAllowed = "move";

    // Tasks.deleteTask(props.priority, props.idx)
    localStorage.setItem("prev_pos", JSON.stringify(idx));
  }

  function handleDragEnter(e: React.DragEvent<HTMLLIElement>, idx: number) {
    e.preventDefault();
    e.stopPropagation();

    localStorage.setItem("next_pos", JSON.stringify(idx));
    setDrag(true)
  }

  function handleDragLeave(e: React.DragEvent<HTMLLIElement>) {
    e.preventDefault();
    e.stopPropagation();

    setDrag(false)
  }

  function handleDrop(e: React.DragEvent<HTMLLIElement>) {
    e.preventDefault();

    // Tasks.updateList(props.priority)
    setDrag(false);
  }

  function handleDragEnd() {
    localStorage.removeItem("prev_pos");
    localStorage.removeItem("next_pos");

    console.log("task end", props.priority, props.idx)
    // Tasks.deleteTask(props.priority, props.idx)
  }

  const classNames = drag ? `${styles.container} ${styles.drag}` : `${styles.container}`;

  return (
    <li 
      className={classNames} 
      draggable="true" 
      onDragStart={(e) => handleDragStart(e, props.idx)}
      onDragEnter={(e) => handleDragEnter(e, props.idx)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDrop={(e) => handleDrop(e)}
      onDragEnd={() => handleDragEnd()}
    >
      <p>{props.description}</p>
      <div className={styles.controls}>
        <div>options</div>
        <div>done</div>
      </div>
    </li>
  )
}