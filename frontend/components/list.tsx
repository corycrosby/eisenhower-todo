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

    const newState = { ...props.state, priority: props.priority, description: description };
    Action.submitTask( props.state, newState, props.setState);
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

    Action.addToList(props.state, newState, props.setState);
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
