import { useState } from "react";
import {
  useInsertTodos,
  useUpdateTodos,
  useDeleteTodos,
} from "../todos/useTodos";

export const useTodoHandlers = () => {
  const { mutate: insertTodo } = useInsertTodos();
  const { mutate: updateTodo } = useUpdateTodos();
  const { mutate: deleteTodo } = useDeleteTodos();

  const [newTodo, setNewTodo] = useState({
    text: "",
    memo: "",
    checked: false,
    tags: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo((prev) => ({ ...prev, text: e.target.value }));
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTodo((prev) => ({ ...prev, memo: e.target.value }));
  };

  const handleCheck = (id: number, checked: boolean) => {
    updateTodo({ id, checked });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      e.preventDefault();
      const value = newTodo.text.trim();
      if (value !== "") {
        insertTodo(newTodo, {
          onSuccess: () => {
            setNewTodo({ text: "", memo: "", checked: false, tags: [] });
          },
        });
      }
    }
  };

  const handleTagAdd = (tag: string) => {
    if (tag.trim() === "" || !tag.startsWith("#")) return;
    if (!newTodo.tags.includes(tag)) {
      setNewTodo((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
  };

  const handleTagRemove = (tag: string) => {
    setNewTodo((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleDelete = (id: number) => {
    deleteTodo(id);
  };

  return {
    newTodo,
    setNewTodo,
    handleChange,
    handleMemoChange,
    handleCheck,
    handleKeyDown,
    handleTagAdd,
    handleTagRemove,
    handleDelete,
  };
};
