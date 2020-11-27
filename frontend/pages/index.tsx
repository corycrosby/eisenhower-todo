import { useEffect, useState } from "react";
import { seedData } from "../lib/store";
import Head from "next/head";
import Layout from "../components/layout";
import styles from "./index.module.scss";

export default function Home() {
  const [state, setState] = useState(null)

  useEffect(() => {
    if (!state) {
      const state = { lists: seedData, description: null, priority: null }
      setState(state)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Todo List</title>
      </Head>
      <header className={styles.container}>
        <h1>Eisenhower</h1>
        <span className={styles.span}>List</span>
      </header>
      <main>
        { state ? 
          <Layout state={state} setState={setState} /> : 
          <div>loading data refesh page...</div>
        }
      </main>
    </>
  )
}
