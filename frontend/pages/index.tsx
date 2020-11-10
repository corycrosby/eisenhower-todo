import Head from "next/head";
import Layout from "../components/layout";
import styles from "./index.module.scss";

export default function Home() {
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
