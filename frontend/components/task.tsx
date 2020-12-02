import React, { useState } from "react";
import { Action, State } from "../lib/types";
import Actions from "../lib/actions";
import styles from "./task.module.scss";

type Props = {
  description: string;
  priority: number;
  idx: number;
  state: State;
  setState: (state: State) => void
}

export default function Task(props: Props) {
  const [dropTop, setDropTop] = useState(false);
  const [dropBottom, setDropBottom] = useState(false);

  function handleDragStart(e: React.DragEvent<HTMLLIElement>) {
    e.dataTransfer.setData("text/plain", `${JSON.stringify(props)}`)
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragEnterTop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    const newState: State = { ...props.state, insertIdx: props.idx };
    Actions.updateInsertIdx(props.state, newState, props.setState)

    setDropTop(true);
  }

  function handleDragEnterBottom(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    const newState: State = { ...props.state, insertIdx: props.idx + 1 };
    Actions.updateInsertIdx(props.state, newState, props.setState)

    setDropBottom(true);
  }

  function handleDragLeaveTop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    setDropTop(false);
  }

  function handleDragLeaveBottom(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    setDropBottom(false);
  }

  function handleDrop(e: React.DragEvent<HTMLLIElement>) {
    e.preventDefault();

    setDropTop(false);
    setDropBottom(false);
  }

  function handleDeleteTask(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const newDeleteData = {
      priority: props.priority,
      idx: props.idx,
    }

    Actions.deleteTask(props.state, { ...props.state, deleteData: newDeleteData}, props.setState)
  }


  const topClassNames = dropTop ? `${styles.dropTop} ${styles.show}` : `${styles.dropTop}`;
  const bottomClassNames = dropBottom ? `${styles.dropBottom} ${styles.show}` : `${styles.dropBottom}`;
  const contentClassNames = dropTop ? `${styles.content} ${styles.bottom}` : `${styles.content}`;

  return (
    <li 
      className={styles.container} 
      draggable="true" 
      onDragStart={(e) => handleDragStart(e)}
      onDrop={(e) => handleDrop(e)}
    >
      <div 
        className={topClassNames} 
        onDragEnter={(e) => handleDragEnterTop(e)}
        onDragLeave={(e) => handleDragLeaveTop(e)}
      >
        <div className={styles.spacer}></div>
      </div>
      <div 
        className={bottomClassNames} 
        onDragEnter={(e) => handleDragEnterBottom(e)}
        onDragLeave={(e) => handleDragLeaveBottom(e)}
      >
        <div className={styles.spacer}></div>
      </div>
      <div className={contentClassNames}>
        <p>{props.description}</p>
        <div className={styles.controls}>
          <div className={styles.dropdown}>
            <img src="/icons/meatball.svg" className={styles.meatball} />
            <div className={styles.menu}>
              <div onClick={(e) => handleDeleteTask(e)}>Delete</div>
            </div>
          </div>
          <div>done</div>
        </div>
      </div>
    </li>
  )
}