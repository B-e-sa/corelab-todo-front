import { TodoEntity } from "../components/todo/TodoEntity";
import { api } from "../lib/axios";

export default function updateTodo({
  id,
  color,
  description,
  favorite,
  title,
}: TodoEntity) {
  return api.patch("/todos", {
    id,
    color,
    description,
    title,
    favorite,
  });
}
