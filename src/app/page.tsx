"use client";

import React from "react";
import TodoItem from "../components/TodoItem";
import { useGetTodos } from "@/hooks/todos/useTodos";
import Image from "next/image";
import { useTodoHandlers } from "@/hooks/handlers/useTodoHandlers";
import TodoNewItem from "@/components/TodoNewItem";

export default function Home() {
  const { data: todosData } = useGetTodos();
  const {
    newTodo,
    handleCheck,
    handleTagAdd,
    handleTagRemove,
    handleDelete,
    handleUpdate,
    handleMemoChange,
    handleChange,
    handleKeyDown,
  } = useTodoHandlers();

  return (
    <div className="flex h-screen w-full">
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
                    checked={checked}
                    onCheck={() => handleCheck(id, checked)}
                    onTagAdd={(tag) => handleTagAdd(tag)}
                    onTagRemove={(tag) => handleTagRemove(tag)}
                    onUpdate={(updateFields) => handleUpdate(id, updateFields)}
                    autoFocus={
                      idx === (todosData?.length ?? 0) - 1 && text === ""
                    }
                  />
                  <div
                    className="z-10 cursor-pointer self-center w-[32px] h-[32px]"
                    onClick={() => handleDelete(id)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <Image
                      src="/delete.svg"
                      alt="delete"
                      width={16}
                      height={16}
                      className="hover:scale-120 transition-all duration-200 cursor-pointer"
                    />
                  </div>
                </div>
              );
            })}
          <div className="flex gap-[4px]">
            <TodoNewItem
              value={newTodo.text}
              memo={newTodo.memo}
              tags={newTodo.tags}
              checked={newTodo.checked}
              onCheck={() => handleCheck(0, newTodo.checked)}
              onTagAdd={(tag) => handleTagAdd(tag)}
              onTagRemove={(tag) => handleTagRemove(tag)}
              onChange={(e) => handleChange(e)}
              onMemoChange={(e) => handleMemoChange(e)}
              onKeyDown={(e) => handleKeyDown(e)}
              autoFocus={newTodo.text === ""}
            />
            <div
              className="z-10 cursor-pointer self-center w-[32px] h-[32px]"
              onClick={() => handleDelete(0)}
            >
              <Image
                src="/delete.svg"
                alt="delete"
                width={16}
                height={16}
                className="hover:scale-120 transition-all duration-200 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
