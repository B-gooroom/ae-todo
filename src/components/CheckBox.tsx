export default function CheckBox({
  checked,
  onCheck,
}: {
  checked: boolean;
  onCheck: () => void;
}) {
  return (
    <div className="flex items-start gap-2">
      <input
        type="checkbox"
        className="
    w-4.5 h-4.5 rounded-full border-2 border-gray-400
    appearance-none cursor-pointer
    flex items-center justify-center
    checked:bg-gray-400 checked:border-gray-400
    relative
    transition-all
    after:content-['']
    after:block
    after:rounded-full
    after:bg-blue-300
    after:w-3.5 after:h-3.5
    after:scale-0
    checked:after:scale-100
    checked:after:bg-blue-300
    after:transition-transform
    after:absolute
    after:top-1/2 after:left-1/2
    after:-translate-x-1/2 after:-translate-y-1/2
  "
        checked={checked}
        onChange={onCheck}
        onMouseDown={(e) => e.preventDefault()}
      />
    </div>
  );
}
