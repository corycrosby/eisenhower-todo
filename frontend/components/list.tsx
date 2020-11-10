import styles from "./list.module.scss";
import Task from "./task";

export default function List () {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h3>Title</h3>
        <span className={styles.count}>count</span>
      </header>
      <div>create task</div>
      <hr />
      <ol>
        <Task />
        <Task />
        <Task />
        <Task />
      </ol>
    </section>
  )
}
