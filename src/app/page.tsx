"use client";

import React, { useState } from "react";
import TodoItem from "./components/TodoItem";

export default function Home() {
  const [todos, setTodos] = useState([{ text: "", checked: false }]);

  const handleChange = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTodos = [...todos];
    newTodos[idx].text = e.target.value;
    setTodos(newTodos);
  };

  const handleCheck = (idx: number) => {
    const newTodos = [...todos];
    newTodos[idx].checked = !newTodos[idx].checked;
    setTodos(newTodos);
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
        setTodos([...todos, { text: "", checked: false }]);
      }
    }
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
      <main className="flex flex-col gap-[32px] row-start-2 items-start w-full max-w-md py-14 px-4 ">
        <div className="flex flex-col gap-[4px] w-full">
          {todos.map((todo, idx) => (
            <TodoItem
              key={idx}
              value={todo.text}
              onChange={(e) => handleChange(idx, e)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              checked={todo.checked}
              onCheck={() => handleCheck(idx)}
              autoFocus={idx === todos.length - 1 && todo.text === ""}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
