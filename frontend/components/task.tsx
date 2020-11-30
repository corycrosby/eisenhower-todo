import React, { useState } from "react";
import { State } from "../lib/types";
import Action from "../lib/actions";
import styles from "./task.module.scss";

type Props = {
  description: string;
  priority: number;
  idx: number;
  state: State;
  setState: (state: State) => void
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

    const newState: State = { ...props.state, insertIdx: props.idx };
    Action.updateInsertIdx(props.state, newState, props.setState)
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

  const classNames = drag ? `${styles.container} ${styles.drag}` : `${styles.container}`;

  return (
    <li 
      className={classNames} 
      draggable="true" 
      onDragStart={(e) => handleDragStart(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDrop={(e) => handleDrop(e)}
    >
      <p>{props.description}</p>
      <div className={styles.controls}>
        <div>options</div>
        <div>done</div>
      </div>
    </li>
  )
}