import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa6";

interface DatePickerProps {
  onArrivalDate: (newDate: Date) => void;
  onDepartureDate: (newDate: Date) => void;
}

export default function DatePicker({
  onArrivalDate,
  onDepartureDate,
}: DatePickerProps) {
  return (
    <div className="flex flex-row items-center justify-center" id="dates">
      <FaPlaneDeparture
        className="mr-2"
      />
      Data wylotu
      <input
        type="datetime-local"
        onChange={(event) => {
          onDepartureDate(new Date(event.target.value));
        }}
        max="275760-09-12T23:59:59"
        min={new Date().toISOString()}
        className="dark:bg-slate-800 bg-slate-200 dark:text-slate-100 text-slate-900 mx-2 rounded-md px-2 py-0.5 w-1/6"
      />
      <FaPlaneArrival className="ml-10 mr-2" />
      Data przylotu
      <input
        type="datetime-local"
        onChange={(event) => {
          onArrivalDate(new Date(event.target.value));
        }}
        max="275760-09-12T23:59:59"
        min={new Date().toISOString()}
        className="dark:bg-slate-800 bg-slate-200 dark:text-slate-100 text-slate-900 mx-2 rounded-md px-2 py-0.5 w-1/6"
      />
    </div>
  );
}
