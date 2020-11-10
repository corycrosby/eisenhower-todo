import List from "../components/list";
import styles from "./layout.module.scss";

export default function Layout() {
  return (
    <div className={styles.container}>
      <List />
      <List />
      <List />
      <List />
    </div>
  )
}