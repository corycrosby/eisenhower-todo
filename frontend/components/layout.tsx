import { Dispatch } from "react";
import { State } from "../lib/types";
import List from "../components/list";
import styles from "./layout.module.scss";

interface Props {
  state: State
  setState: Dispatch<any>
}

export default function Layout(props: Props) {
  return (
    <div className={styles.container}>
      { props.state.lists.map((list, idx: number) => {
          return (< List 
            key={idx} 
            filter={props.state.filterData.selectedFilter}
            listIdx={idx} 
            title={props.state.listTitles[idx]}
            listData={list}
            setState={props.setState} 
            />
          )
        }) 
      }
    </div>
  )
}
