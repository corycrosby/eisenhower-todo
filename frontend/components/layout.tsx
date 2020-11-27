import { Dispatch, useEffect, useState } from "react";
import { State, TaskData } from "../lib/types";
import List from "../components/list";
import styles from "./layout.module.scss";

interface Props {
  state: State
  setState: Dispatch<any>
}

export default function Layout(props: Props) {
  return (
    <div className={styles.container}>
      { props.state.lists.map((tasks: TaskData[], idx: number) => {
          return <List key={idx} {...props} priority={idx} title="list title" />
        }) 
      }
    </div>
  )
}
