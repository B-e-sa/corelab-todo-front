import { TodoEntity } from "../components/todo/TodoEntity";
import { api } from "../lib/axios";

export default function changeTodoFavorite({ id, favorite }: TodoEntity) {
  return api.patch("/todos", {
    id,
    favorite,
  });
}
