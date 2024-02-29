interface NumberInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  defaultValue: number;
}

export default function NumberInput({
  onChange,
  defaultValue,
  max,
  min,
}: NumberInputProps) {
  return (
    <input
      onChange={onChange}
      className="dark:bg-slate-800 bg-slate-200 dark:text-slate-100 text-slate-900 mx-2 rounded-md px-2 py-0.5 w-16 text-center"
      type="number"
      max={max}
      min={min}
      defaultValue={defaultValue}
    />
  );
}
