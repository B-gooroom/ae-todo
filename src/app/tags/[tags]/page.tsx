"use client";

import { useTodoHandlers } from "@/hooks/handlers/useTodoHandlers";
import { useGetTodosByTags } from "@/hooks/todos/useTags";
import { useParams } from "next/navigation";
import TodoItem from "@/components/TodoItem";
import Image from "next/image";

export default function TagsPage() {
  const { tags } = useParams();
  const { data: todosDataByTags } = useGetTodosByTags(tags as string[]);

  const {
    handleCheck,
    handleTagAdd,
    handleTagRemove,
    handleDelete,
    handleUpdate,
  } = useTodoHandlers();

  return (
    <div className="flex h-screen w-full">
      <main className="flex flex-col gap-[12px] row-start-2 items-start w-full max-w-md py-14 px-4 ">
        <p className="text-xl font-bold">#{tags}</p>
        <div className="flex flex-col gap-[4px] w-full">
          {todosDataByTags &&
            todosDataByTags.length > 0 &&
            todosDataByTags.map((todo, idx) => {
              const { id, text, memo, tags, checked } = todo;
              return (
                <div key={idx} className="flex gap-[4px]">
                  <TodoItem
                    value={text}
                    memo={memo}
                    tags={tags}
                    checked={checked}
                    onCheck={() => handleCheck(id, !checked)}
                    onTagAdd={(tag) => handleTagAdd(tag)}
                    onTagRemove={(tag) => handleTagRemove(tag)}
                    onUpdate={(updateFields) => handleUpdate(id, updateFields)}
                    autoFocus={
                      idx === (todosDataByTags?.length ?? 0) - 1 && text === ""
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
        </div>
      </main>
    </div>
  );
}
