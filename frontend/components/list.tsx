import React, { useState } from "react";
import { State } from "../lib/types";
import Action from "../lib/actions";
import Task from "./task";
import styles from "./list.module.scss";
import actions from "../lib/actions";

type Props = {
  priority: number;
  state: State;
  setState: (state: State) => void
}

export default function List (props: Props) {
  function handleSubmitTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newState = { ...props.state, priority: props.priority, description: props.state.createTaskValue };
    Action.createTask( props.state, newState, props.setState);
  }
  
  function handleUpdateCreateTask(e: React.ChangeEvent<HTMLInputElement>) {
    Action.updateCreateTaskValue(props.state, e.target.value, props.setState)
  }

  function handleDragEnter(e: React.DragEvent<HTMLOListElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    return false;
  }

  function handleDrop(e: React.DragEvent<HTMLOListElement>) {
    const { description, priority, idx } = JSON.parse(e.dataTransfer.getData("text/plain"));
    const newState = { 
      ...props.state, 
      priority: props.priority,
      dragData: { 
        dropPriority: props.priority, 
        dragPriority: priority, 
        taskIdx: idx, 
        description: description
      }
    };

    Action.dropIntoList(props.state, newState, props.setState);
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h3>{ props.state.listTitles[props.priority]}</h3>
        <span className={styles.count}>{props.state.lists[props.priority].length}</span>
      </header>
      <form onSubmit={(e) => handleSubmitTask(e)} className={styles.form}>
        <input 
          placeholder="Create new task" 
          onChange={(e) => handleUpdateCreateTask(e)} 
          value={props.state.createTaskValue}
        />
      </form>
      <ol 
        className={styles.list} 
        onDragEnter={(e) => handleDragEnter(e)} 
        onDragOver={(e) => e.preventDefault()} 
        onDrop={(e) => handleDrop(e)} 
      >
        { props.state.lists[props.priority].map((task, idx) => {
          return (
            <Task 
              key={idx} 
              description={task.description} 
              priority={props.priority} 
              idx={idx} 
              state={props.state}
              setState={props.setState}
            />
          );
        })}
      </ol>
    </section>
  )
}
