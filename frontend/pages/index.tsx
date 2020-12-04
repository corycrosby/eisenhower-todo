import { useEffect, useState } from "react";
import { stateInit } from "../lib/store";
import Head from "next/head";
import Layout from "../components/layout";
import styles from "./index.module.scss";

export default function Home() {
  const [state, setState] = useState(null)

  useEffect(() => {
    if (!state) {
      const state = stateInit
      setState(state)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Todo List</title>
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Eisenhower</h1>
          <span className={styles.span}>List</span>
        </header>
        <main>
          { state ? 
            <Layout state={state} setState={setState} /> : 
            <div>loading data refesh page...</div>
          }
        </main>
      </div>
    </>
  )
}
