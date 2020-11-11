import styles from "./task.module.scss";

type Props = {
  description: string;
  priority: number;
}

export default function Task({description}: Props) {
  return (
    <li className={styles.container}>
      <p>{description}</p>
      <div className={styles.controls}>
        <div>move</div>
        <div>done</div>
      </div>
    </li>
  )
}