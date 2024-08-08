import { Inter } from "next/font/google";
import NewTodo from "./components/todo/new-todo/new-todo";
import Todo from "./components/todo/editable-todo";
import styles from "./page.module.scss";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const favoritedTodos = Array(2).fill(5);
  const otherTodos = Array(10).fill(5);

  return (
    <main className={`${styles.main} ${inter.className}`}>
      <NewTodo className={styles["new-todo"]}/>
      <div className={styles.favorites}>
        <p className={styles.label}>Favoritas</p>
        <div className={styles["favorite-todos-container"]}>
          {favoritedTodos.map((_, i) => {
            return <Todo key={i} />;
          })}
        </div>
      </div>
      <div className={styles.other}>
        <p className={styles.label}>Outras</p>
        <div className={styles["todos-container"]}>
          {otherTodos.map((_, i) => {
            return <Todo key={i} />;
          })}
        </div>
      </div>
    </main>
  );
}
