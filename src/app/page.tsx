"use client";

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Todo from "./components/todo/editable-todo";
import NewTodo from "./components/todo/new-todo/new-todo";
import { api } from "./lib/axios";
import styles from "./page.module.scss";
import { useTodoStore } from "./stores/todo-store";
import { useInView } from "react-intersection-observer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    increaseApiCallQuantity,
    apiCallQuantity,
    updateStoreTodos,
    favoriteTodos,
    otherTodos,
  } = useTodoStore((state) => state);

  const [inMidRequest, setInMidRequest] = useState(false);

  const { ref: favoritesRef, inView: favoritesBottomInView } = useInView();
  const { ref: othersRef, inView: othersBottomInView } = useInView();

  useEffect(() => {
    if (othersBottomInView || favoritesBottomInView) {
      if (!inMidRequest) {
        setInMidRequest(true);
        api
          .get("/todos", { params: { skip: apiCallQuantity * 10 } })
          .then((res) => {
            updateStoreTodos(res.data);
            increaseApiCallQuantity();
          })
          .catch(() => {
            toast(
              "Algum erro ocorreu ao recuperar seus todos. Tente novamente"
            );
          })
          .finally(() => setInMidRequest(false));
      }
    }
  }, [othersBottomInView, favoritesBottomInView]);

  return (
    <main className={`${styles.main} ${inter.className}`}>
      <NewTodo className={styles["new-todo"]} />
      {favoriteTodos.length !== 0 && (
        <div className={styles.favorites}>
          <p className={styles.label}>Favoritas</p>
          <div className={styles["favorite-todos-container"]}>
            {favoriteTodos?.map((todo) => {
              return <Todo key={todo.id} todoId={todo.id} {...(todo as any)} />;
            })}
            <div ref={favoritesRef} className={styles.loader}></div>
          </div>
        </div>
      )}
      <div className={styles.other}>
        <p className={styles.label}>Outras</p>
        <div className={styles["todos-container"]}>
          {otherTodos?.map((todo) => {
            return (
              <Todo
                key={todo.id}
                todoId={todo.id}
                {...(todo as any)}
              />
            );
          })}
          <div ref={othersRef} className={styles.loader}></div>
        </div>
      </div>
    </main>
  );
}
