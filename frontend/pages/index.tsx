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
          <h1>Eisenhower</h1>
          <span className={styles.span}>List</span>
        </header>
        <main className={styles.main}>
          { state ? 
            <Layout state={state} setState={setState} /> : 
            <div>loading data refesh page...</div>
          }
        </main>
      </div>
    </>
  )
}
