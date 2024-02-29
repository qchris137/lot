interface ChangeLocalizationButtonProps {
  onChange: (useLocalizedName: boolean) => void;
  useLocalizedNames: boolean;
}

export default function ChangeLocalizationButton({
  onChange,
  useLocalizedNames,
}: ChangeLocalizationButtonProps) {
  return (
    <button
      className="dark:bg-slate-800 dark:text-slate-100 bg-slate-200 text-slate-900 rounded-md ml-2 max-md:my-2 p-2 md:w-1/5 text-base font-normal"
      onClick={() => onChange(!useLocalizedNames)}
    >
      Zmień na nazwy {useLocalizedNames ? "angielskie" : "lokalne"}
    </button>
  );
}
