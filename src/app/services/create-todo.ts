import { TodoEntity } from "../components/todo/TodoEntity";
import { api } from "../lib/axios";

export default function createTodo({
  description,
  favorite,
  title,
}: TodoEntity) {
  return api.post("/todos", {
    description,
    favorite,
    title,
  });
}
