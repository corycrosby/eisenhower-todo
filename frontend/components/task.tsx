import styles from "./task.module.scss";

export default function Task() {
  return (
    <li className={styles.container}>
      <p>task title</p>
      <div className={styles.controls}>
        <div>move</div>
        <div>done</div>
      </div>
    </li>
  )
}