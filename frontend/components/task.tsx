import React, { useState } from "react";
import { State } from "../lib/types";
import Action from "../lib/actions";
import styles from "./task.module.scss";

type Props = {
  description: string;
  priority: number;
  idx: number;
}

export default function Task(props: Props) {
  const [drag, setDrag] = useState(false);

  function handleDragStart(e: React.DragEvent<HTMLLIElement>) {
    e.dataTransfer.setData("text/plain", `${JSON.stringify(props)}`)
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragEnter(e: React.DragEvent<HTMLLIElement>) {
    e.preventDefault();
    e.stopPropagation();

    setDrag(true)
  }

  function handleDragLeave(e: React.DragEvent<HTMLLIElement>) {
    e.preventDefault();
    e.stopPropagation();

    setDrag(false)
  }

  function handleDrop(e: React.DragEvent<HTMLLIElement>) {
    e.preventDefault();

    setDrag(false);
  }

  function handleDragEnd() {
    // Tasks.deleteTask(props.priority, props.idx)
  }

  const classNames = drag ? `${styles.container} ${styles.drag}` : `${styles.container}`;

  return (
    <li 
      className={classNames} 
      draggable="true" 
      onDragStart={(e) => handleDragStart(e)}
      onDragEnter={(e) => handleDragEnter(e)}
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