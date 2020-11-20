import Head from "next/head";
import Layout from "../components/layout";
import styles from "./index.module.scss";
import { useEffect } from "react";
import Tasks from "../lib/tasks";

export default function Home() {
  useEffect(() => {
    const data = Tasks.getTaskData();
    if(!data) Tasks.seedData();
  });

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
        <Layout />
      </main>
    </>
  )
}
