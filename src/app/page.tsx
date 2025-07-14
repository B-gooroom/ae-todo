"use client";

import React, { useState } from "react";
import TodoItem from "../components/TodoItem";
import {
  useDeleteTodos,
  useGetTodos,
  useInsertTodos,
  useUpdateTodos,
} from "@/hooks/todos/useTodos";
import Image from "next/image";

export default function Home() {
  const { data: todosData } = useGetTodos();
  const { mutate: insertTodo } = useInsertTodos();
  const { mutate: updateTodo } = useUpdateTodos();
  const { mutate: deleteTodo } = useDeleteTodos();
  console.log(todosData);

  const [todos, setTodos] = useState([
    { text: "", memo: "", checked: false, tags: [] as string[] },
  ]);

  const handleChange = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTodos = [...todos];
    newTodos[idx].text = e.target.value;
    setTodos(newTodos);
  };

  const handleMemoChange = (
    idx: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newTodos = [...todos];
    newTodos[idx].memo = e.target.value;
    setTodos(newTodos);
  };

  const handleCheck = (id: number, checked: boolean) => {
    updateTodo({ id, checked });
  };

  const handleKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value.trim();
      if (value !== "" && idx === todos.length - 1) {
        insertTodo(
          {
            text: todos[idx].text,
            memo: todos[idx].memo,
            checked: false,
            tags: todos[idx].tags,
          },
          {
            onSuccess: (response) => {
              console.log("추가완료", response);
            },
            onError: (error) => {
              console.log("추가실패", error);
            },
          }
        );
        setTodos([...todos, { text: "", memo: "", checked: false, tags: [] }]);
      }
    }
  };

  const handleTagAdd = (idx: number, tag: string) => {
    if (tag.trim() === "" || !tag.startsWith("#")) return;

    const newTodos = [...todos];
    if (!newTodos[idx].tags.includes(tag)) {
      newTodos[idx].tags.push(tag);
      setTodos(newTodos);
    }
  };

  const handleTagRemove = (idx: number, tag: string) => {
    const newTodos = [...todos];
    newTodos[idx].tags = newTodos[idx].tags.filter((t) => t !== tag);
    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    deleteTodo(id);
  };

  return (
    <div className="flex h-screen gap-8">
      <div className="w-1/4 h-full bg-[#2B2D32] border-r-2 border-gray-500 p-4">
        <div className="flex flex-col gap-4">
          <p className="text-xl font-bold">æ-todo</p>
          <div className="flex flex-col gap-2">
            <p>오늘 할 일</p>
            <p>내일 할 일</p>
          </div>
        </div>
      </div>
      <main className="flex flex-col gap-[12px] row-start-2 items-start w-full max-w-md py-14 px-4 ">
        <p className="text-xl font-bold">해낸다.</p>
        <div className="flex flex-col gap-[4px] w-full">
          {todosData &&
            todosData.map((todo, idx) => {
              const { id, text, memo, tags, checked } = todo;
              return (
                <div key={idx} className="flex gap-[4px]">
                  <TodoItem
                    value={text}
                    memo={memo}
                    tags={tags}
                    onChange={(e) => handleChange(idx, e)}
                    onMemoChange={(e) => handleMemoChange(idx, e)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    checked={checked}
                    onCheck={() => handleCheck(id, checked)}
                    onTagAdd={(tag) => handleTagAdd(idx, tag)}
                    onTagRemove={(tag) => handleTagRemove(idx, tag)}
                    autoFocus={idx === todos.length - 1 && text === ""}
                  />
                  <div
                    className="cursor-pointer self-center"
                    onClick={() => handleDelete(id)}
                  >
                    <Image
                      src="/delete.svg"
                      alt="delete"
                      width={16}
                      height={16}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </div>
  );
}
