"use client";

import CheckBox from "./CheckBox";

interface TodoItemProps {
  value: string;
  memo: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMemoChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  checked: boolean;
  onCheck: () => void;
  autoFocus?: boolean;
}

export default function TodoItem({
  value,
  memo,
  onChange,
  onMemoChange,
  onKeyDown,
  checked,
  onCheck,
  autoFocus,
}: TodoItemProps) {
  return (
    <div className="flex flex-col gap-2 w-full py-1 items-start">
      <div className="flex items-center gap-2 w-full">
        <CheckBox checked={checked} onCheck={onCheck} />
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoFocus={autoFocus}
          placeholder="제목"
          className={`bg-transparent outline-none w-full px-2 rounded text-sm ${
            checked ? "line-through text-gray-400" : ""
          }`}
        />
      </div>
      {(value?.trim() || memo?.trim()) && (
        <textarea
          value={memo}
          onChange={onMemoChange}
          placeholder="메모 추가..."
          className="bg-transparent outline-none w-full px-2 py-1 rounded text-xs text-gray-300 resize-none min-h-[32px]"
          rows={2}
        />
      )}
    </div>
  );
}
