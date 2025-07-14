"use client";

import React, { memo, useState } from "react";
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
            todosData.length > 0 &&
            todosData.map((todo, idx) => {
              const { id, text, memo, tags, checked } = todo;
              return (
                <div key={idx} className="flex gap-[4px]">
                  <TodoItem
                    value={text}
                    memo={memo}
                    tags={tags}
                    onChange={(e) => handleChange(e)}
                    onMemoChange={(e) => handleMemoChange(e)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    checked={checked}
                    onCheck={() => handleCheck(id, checked)}
                    onTagAdd={(tag) => handleTagAdd(tag)}
                    onTagRemove={(tag) => handleTagRemove(tag)}
                    autoFocus={
                      idx === (todosData?.length ?? 0) - 1 && text === ""
                    }
                  />
                  <div
                    className="cursor-pointer self-center w-[32px] h-[32px]"
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
          <div className="flex gap-[4px]">
            <TodoItem
              value={newTodo.text}
              memo={newTodo.memo}
              tags={newTodo.tags}
              onChange={(e) => handleChange(e)}
              onMemoChange={(e) => handleMemoChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
              checked={newTodo.checked}
              onCheck={() => handleCheck(0, newTodo.checked)}
              onTagAdd={(tag) => handleTagAdd(tag)}
              onTagRemove={(tag) => handleTagRemove(tag)}
              autoFocus={newTodo.text === ""}
            />
            <div
              className="cursor-pointer self-center w-[32px] h-[32px]"
              onClick={() => handleDelete(0)}
            >
              <Image src="/delete.svg" alt="delete" width={16} height={16} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
