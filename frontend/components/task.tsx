import React from "react";
import styles from "./task.module.scss";
import Tasks from "../lib/tasks";

type Props = {
  description: string;
  priority: number;
  idx: number;
}

export default function Task(props: Props) {
  function handleDragStart(e: React.DragEvent<HTMLLIElement>) {
    e.dataTransfer.setData("text/plain", `${JSON.stringify(props)}`)
    e.dataTransfer.effectAllowed = "move";
    Tasks.deleteTask(props.priority, props.idx);
  }

  return (
    <li className={styles.container} draggable="true" onDragStart={(e) => handleDragStart(e)}>
      <p>{props.description}</p>
      <div className={styles.controls}>
        <div>options</div>
        <div>done</div>
      </div>
    </li>
  )
}