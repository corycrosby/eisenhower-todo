import React, { useState } from "react";
import { Filter, State, TaskData } from "../lib/types";
import Actions from "../lib/actions";
import styles from "./task.module.scss";

type Props = {
  filter: Filter;
  listIdx: number;
  idx: number;
  taskData: TaskData;
  setState: (state: State) => void
}

export default function Task(props: Props) {
  const [dropTop, setDropTop] = useState(false);
  const [dropBottom, setDropBottom] = useState(false);

  function handleDragStart(e: React.DragEvent<HTMLLIElement>) {
    e.dataTransfer.setData("text/plain", `${JSON.stringify(props)}`);
    e.dataTransfer.effectAllowed = "move";

    const updateData = { listIdx: props.listIdx, taskIdx: props.idx, isDragging: true };
    Actions.isDragging(updateData, props.setState);
  }

  function handleDragEnterTop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    Actions.updateInsertIdx(props.idx, props.setState);
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
    const isCompleted = !props.taskData.isCompleted;
    const updateData = { listIdx: props.listIdx, taskIdx: props.idx, isCompleted: isCompleted };

    Actions.isCompleted(updateData, props.setState);
  }

  function handleDeleteTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const newDeleteData = {
      listIdx: props.listIdx,
      idx: props.idx,
    };

    Actions.deleteTask(newDeleteData, props.setState);
  }

  function getContainerClasses() {
    switch (props.filter) {
      default:
        return `${styles.container}`;

      case Filter.Progress:
        if (!props.taskData.isCompleted) {
          return `${styles.container}`
        } else {
          return `${styles.container} ${styles.hideTask}`
        }

      case Filter.Completed:
        if (props.taskData.isCompleted) {
          return `${styles.container}`
        } else {
          return `${styles.container} ${styles.hideTask}`
        }
    }
  }

  function getContentClassNames() {
    if (props.taskData.isDragging) {
      return `${styles.content} ${styles.dragging}`;
    } else if (dropTop) {
      return `${styles.content} ${styles.bottom}`;
    } else {
      return `${styles.content}`;
    }
  }

  const topClassNames = dropTop ? `${styles.dropSpacer} ${styles.show}` : `${styles.dropSpacer}`;
  const bottomClassNames = dropBottom ? `${styles.dropSpacer} ${styles.show}` : `${styles.dropSpacer}`;
  const completeClassNames = props.taskData.isCompleted ? `${styles.button} ${styles.complete}` : `${styles.button} ${styles.complete} ${styles.hideBackground}`;
  const deleteClassNames = `${styles.button} ${styles.delete}`;

  return (
    <li 
      className={getContainerClasses()} 
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
      <div className={getContentClassNames()}>
        <button className={completeClassNames} onClick={(e) => handleCompleted(e)}></button>
        <p className={styles.description}>{props.taskData.description}</p>
        <button className={deleteClassNames} onClick={(e) => handleDeleteTask(e)}></button>
      </div>
    </li>
  )
}