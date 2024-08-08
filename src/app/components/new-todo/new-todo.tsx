"use client";
import { ChangeEvent, ComponentProps, useState } from "react";
import ActiveStarIcon from "../icons/active-star";
import InactiveStarIcon from "../icons/inactive-star";
import style from "./new-todo.module.scss";

type NewTodoProps = ComponentProps<"div"> & {
  title?: string;
  description?: string;
  favorite?: boolean;
};

export default function NewTodo({
  title = "",
  description = "",
  favorite = false,
  ...props
}: NewTodoProps) {
  // TODO: implement API call to create todo fields
  const [todoTitle, setTodoTitle] = useState(title);
  const [todoDescription, setTodoDescription] = useState(description);

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.currentTarget.value);
  };

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTodoDescription(e.currentTarget.value);
  };

  return (
    <div
      {...props}
      style={{ ...props.style, backgroundColor: "white" }}
      className={`${props.className} ${style.todo}`}
    >
      <div className={style.head}>
        <input
          type="text"
          placeholder="Título"
          value={todoTitle}
          onChange={handleTitle}
        />
        {/* TODO: implement API call to favorite todo */}
        {favorite ? <ActiveStarIcon /> : <InactiveStarIcon />}
      </div>
      <div className={style.body}>
        <textarea
          placeholder="Criar nota..."
          value={todoDescription}
          onChange={handleDescription}
        />
      </div>
    </div>
  );
}
