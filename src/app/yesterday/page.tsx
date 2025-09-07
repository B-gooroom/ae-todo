"use client";

import TodoItem from "@/components/TodoItem";
import { useTodoHandlers } from "@/hooks/handlers/useTodoHandlers";
import { useGetYesterdayMemo } from "@/hooks/memos/useMemos";
import { useGetTodosYesterday } from "@/hooks/todos/useTodos";
import Image from "next/image";
import Memo from "@/components/Memo";

export default function Yesterday() {
  const { data: todosDataYesterday } = useGetTodosYesterday();
  const { data: yesterdayMemo, isLoading: isLoadingMemo } =
    useGetYesterdayMemo();

  const {
    handleCheck,
    handleTagAdd,
    handleTagRemove,
    handleDelete,
    handleUpdate,
  } = useTodoHandlers();

  return (
    <div className="flex w-full">
      <main className="flex flex-col gap-[12px] row-start-2 items-start w-[65%] py-14 px-4 ">
        <p className="text-xl font-bold">어제의 나, 해냈는가.</p>
        <div className="flex flex-col gap-[4px] w-full">
          {todosDataYesterday &&
            todosDataYesterday.length > 0 &&
            todosDataYesterday.map((todo, idx) => {
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
                      idx === (todosDataYesterday?.length ?? 0) - 1 &&
                      text === ""
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
      <Memo
        memoData={yesterdayMemo ?? null}
        isLoading={isLoadingMemo}
        readOnly={true}
      />
    </div>
  );
}
