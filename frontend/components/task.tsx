import React, { useState } from "react";
import { Action, State } from "../lib/types";
import Actions from "../lib/actions";
import styles from "./task.module.scss";

type Props = {
  description: string;
  listIdx: number;
  idx: number;
  isCompleted: boolean;
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

    Actions.updateInsertIdx(props.idx, props.setState)
    setDropTop(true);
  }

  function handleDragEnterBottom(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    Actions.updateInsertIdx(props.idx + 1, props.setState)
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

  function handleCompleted(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const isCompleted = !props.isCompleted

    const updateData = { listIdx: props.listIdx, taskIdx: props.idx, isCompleted: isCompleted };
    Actions.isCompleted(updateData, props.setState)
  }

  function handleDeleteTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const newDeleteData = {
      listIdx: props.listIdx,
      idx: props.idx,
    }

    Actions.deleteTask(newDeleteData, props.setState)
  }

  const topClassNames = dropTop ? `${styles.dropSpacer} ${styles.show}` : `${styles.dropSpacer}`;
  const bottomClassNames = dropBottom ? `${styles.dropSpacer} ${styles.show}` : `${styles.dropSpacer}`;
  const contentClassNames = dropTop ? `${styles.content} ${styles.bottom}` : `${styles.content}`;
  const completeClassNames = props.isCompleted ? `${styles.button} ${styles.complete}` : `${styles.button} ${styles.complete} ${styles.hide}`;
  const deleteClassNames = `${styles.button} ${styles.delete}`;

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
        <div className={styles.spacerBlock}></div>
      </div>
      <div 
        className={bottomClassNames} 
        onDragEnter={(e) => handleDragEnterBottom(e)}
        onDragLeave={(e) => handleDragLeaveBottom(e)}
      >
        <div className={styles.spacerBlock}></div>
      </div>
      <div className={contentClassNames}>
        <button className={completeClassNames} onClick={(e) => handleCompleted(e)}></button>
        <p>{props.description}</p>
        <button className={deleteClassNames} onClick={(e) => handleDeleteTask(e)}></button>
      </div>
    </li>
  )
}