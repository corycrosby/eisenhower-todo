import React, { useEffect, useState } from "react";
import Head from "next/head";

import Layout from "../components/layout";
import Actions from "../lib/actions";
import { State } from "../lib/types";

import styles from "./index.module.scss";

export default function Home() {
  const [state, setState] = useState<State>(null)

  useEffect(() => {
    if (!state) {
      Actions.initState(setState)
    }
  }, [])

  function handleToggleFilter() {
    const updateData = !state.isFilterOpen;
    Actions.toggleFilter(updateData, setState);
  }

  function handleOptionSelection(idx: number) {
    Actions.selectFilterIdx(idx, setState)
  }

  return (
    <>
      <Head>
        <title>Todo List</title>
      </Head>
      <div className={styles.container}>
        { !state ? 
          <div className={styles.loading}>Loading Data...</div> : 
          <>
            <header className={styles.header}>
              <div className={styles.content}>
                <div className={styles.title}>
                  <h1 className={styles.h1}>Eisenhower</h1>
                  <span className={styles.span}>Todo List</span>
                </div>
                <div className={styles.filter}>
                  <button className={styles.button} onClick={() => handleToggleFilter()} title="Task Filter"></button>
                  <div className={state.isFilterOpen ? `${styles.menu} ${styles.show}`: `${styles.menu}`}>
                    <span className={styles.menuTitle}>Showing</span>
                    { state.filterData.options.map((opt, idx) => 
                      <span  
                        key={idx}
                        className={state.filterData.selectedFilter == idx ? `${styles.selected}` : ""}
                        onClick={() => handleOptionSelection(idx)}
                      >
                        {opt}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </header>
            <main className={styles.main}>
                <Layout state={state} setState={setState} /> 
            </main> 
          </> 
        }
      </div>
    </>
  )
}
