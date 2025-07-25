import React, { useState, useEffect } from "react";
import CheckBox from "./CheckBox";
import { UpdateTodoProps } from "@/services/todo/todo-services";

interface TodoItemProps {
  value: string;
  memo: string;
  tags: string[];
  checked: boolean;
  onCheck: () => void;
  onTagAdd: (tag: string) => void;
  onTagRemove: (tag: string) => void;
  onUpdate: (updateFields: UpdateTodoProps) => void;
  autoFocus?: boolean;
}

export default function TodoItem({
  value,
  memo,
  tags,
  checked,
  onCheck,
  onTagAdd,
  onTagRemove,
  onUpdate,
  autoFocus,
}: TodoItemProps) {
  const [editText, setEditText] = useState(value);
  const [editMemo, setEditMemo] = useState(memo);
  const [tagInput, setTagInput] = useState("");

  // value, memo가 바뀌면 내부 상태도 동기화
  useEffect(() => {
    setEditText(value);
  }, [value]);

  useEffect(() => {
    setEditMemo(memo);
  }, [memo]);

  // 텍스트 업데이트
  const handleInputBlur = () => {
    if (editText !== value) {
      onUpdate({ text: editText });
    }
  };

  // 메모 업데이트
  const handleMemoBlur = () => {
    if (editMemo !== memo) {
      onUpdate({ memo: editMemo });
    }
  };

  // 태그 추가
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      let tag = tagInput.trim();
      if (!tag.startsWith("#")) tag = "#" + tag;
      onTagAdd(tag);
      setTagInput("");
    }
  };

  return (
    <div className="flex flex-col gap-[6px] w-full py-1 items-start">
      <div className="flex items-center gap-2 w-full">
        <CheckBox checked={checked} onCheck={onCheck} />
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          autoFocus={autoFocus}
          placeholder="todo"
          className={`bg-transparent outline-none w-full px-2 rounded text-sm leading-none ${
            checked ? "line-through text-gray-400" : ""
          }`}
          onBlur={handleInputBlur}
        />
      </div>
      <textarea
        value={editMemo}
        onChange={(e) => setEditMemo(e.target.value)}
        placeholder="메모 추가..."
        className={`
          transition-all duration-200
          ${
            value?.trim() || memo?.trim()
              ? "opacity-100 translate-y-0 pt-1 pb-0.5"
              : "opacity-0 -translate-y-2 h-0 py-0 pointer-events-none"
          }
          bg-transparent outline-none w-[90%] px-2 flex items-center rounded
          text-xs
          text-gray-300 resize-none ml-6
          sm:ml-4
          whitespace-pre-line
        `}
        rows={2}
        onBlur={handleMemoBlur}
      />
      <div
        className={`transition-all duration-200 ${
          value?.trim()
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        } w-full`}
      >
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-1 pr-2 py-1 w-full ml-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-700 text-xs px-2 pt-1 pb-0.5 rounded-[8px] flex items-center gap-1 leading-none h-[24px]"
              >
                {tag}
                <button
                  type="button"
                  className="ml-1 text-gray-400 hover:text-red-400 leading-none flex items-center justify-center"
                  onClick={() => onTagRemove(tag)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        ) : (
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInputKeyDown}
            placeholder="#태그"
            className="bg-transparent outline-none w-[120px] px-2 py-1 text-xs text-gray-300 leading-none ml-6"
          />
        )}
      </div>
    </div>
  );
}
