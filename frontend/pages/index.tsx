import { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import Actions from "../lib/actions";

import styles from "./index.module.scss";

export default function Home() {
  const [state, setState] = useState(null)

  useEffect(() => {
    if (!state) {
      Actions.initState(setState)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Todo List</title>
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.content}>
            <h1 className={styles.h1}>Eisenhower</h1>
            <span className={styles.span}>Todo List</span>
          </div>
        </header>
        <main className={styles.main}>
          { state ? 
            <Layout state={state} setState={setState} /> : 
            <div>Loading Data...</div>
          }
        </main>
      </div>
    </>
  )
}
