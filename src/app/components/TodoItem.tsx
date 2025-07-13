import CheckBox from "./CheckBox";

export default function TodoItem({
  value,
  onChange,
  onKeyDown,
  checked,
  onCheck,
  autoFocus,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  checked: boolean;
  onCheck: () => void;
  autoFocus?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 w-full py-1">
      <CheckBox checked={checked} onCheck={onCheck} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
        placeholder="메모"
        className={`bg-transparent outline-none w-full px-2 rounded text-sm ${
          checked ? "line-through text-gray-400" : ""
        }`}
      />
    </div>
  );
}
