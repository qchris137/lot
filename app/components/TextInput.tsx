interface TextInputProps {
  onChange: (newText: string) => void;
}

export default function TextInput({ onChange }: TextInputProps) {
  return (
    <input
      onChange={(event) => onChange(event.target.value)}
      className="dark:bg-slate-800 bg-slate-200 dark:text-slate-100 text-slate-900 mx-2 rounded-md px-2 py-0.5 w-1/2"
      required
    />
  );
}
