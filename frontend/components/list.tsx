import React, { Dispatch, useState } from "react";
import { State } from "../lib/types";
import Action from "../lib/actions";
import Task from "./task";
import styles from "./list.module.scss";

type Props = {
  priority: number;
  title: string;
  state: State;
  setState: (state: State) => void
}

export default function List (props: Props) {
  const [description, setDescription] = useState("")

  function handleSubmitTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newState = { ...props.state, priority: props.priority, description: description }
    Action.submitTask( props.state, newState, props.setState)
  }

  function handleDragEnter(e: React.DragEvent<HTMLOListElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    return false;
  }

  function handleDrop(e: React.DragEvent<HTMLOListElement>) {
    // const { description } = JSON.parse(e.dataTransfer.getData("text/plain"));
    // Tasks.updateTasks(description, props.priority)

    const task = JSON.parse(e.dataTransfer.getData("text/plain"));
    // Tasks.updateList(props.priority, task)
  }

  function handleDragEnd() {
    // props.setTaskData(Tasks.getTaskData())
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h3>{ props.title }</h3>
        <span className={styles.count}>{props.state.lists.length}</span>
      </header>
      <form onSubmit={(e) => handleSubmitTask(e)}>
        <input 
          placeholder="Create new task" 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </form>
      <hr />
      <ol 
        className={styles.ol} 
        onDragEnter={(e) => handleDragEnter(e)} 
        onDragOver={(e) => e.preventDefault()} 
        onDrop={(e) => handleDrop(e)} 
        onDragEnd={() => handleDragEnd()}
      >
        { props.state.lists[props.priority].map((task, idx) => {
          return (
            <Task 
              key={idx} 
              description={task.description} 
              priority={0} 
              idx={idx} 
            />
          );
        })}
      </ol>
    </section>
  )
}
