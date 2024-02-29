import { MdErrorOutline } from "react-icons/md";
import { Airport } from "../types/Airport";

interface AirportDateErrorsProps {
  onErrors: (errors: boolean) => void;
  departureAirport: Airport | undefined;
  arrivalAirport: Airport | undefined;
  departureDate: Date | undefined;
  arrivalDate: Date | undefined;
}

export function AirportDateErrors({
  onErrors,
  arrivalAirport,
  arrivalDate,
  departureAirport,
  departureDate,
}: AirportDateErrorsProps) {
  if (!arrivalAirport || !departureAirport || !arrivalDate || !departureDate) {
    onErrors(true);
  } else {
    onErrors(false);
    return null;
  }

  return (
    <div
      className="flex flex-row items-center justify-center dark:text-red-400 text-red-600"
      id="airportdateerrors"
    >
      {
        // arrival airport not selected
        !arrivalAirport ? (
          <div className="flex flex-row items-center justify-center px-2">
            <MdErrorOutline className="mr-1" />
            Nie wybrano miejsca przylotu
          </div>
        ) : null
      }
      {
        // departure airport not selected
        !departureAirport ? (
          <div className="flex flex-row items-center justify-center px-2">
            <MdErrorOutline className="mr-1" />
            Nie wybrano miejsca wylotu
          </div>
        ) : null
      }
      {
        // arrival date not set
        !arrivalDate ? (
          <div className="flex flex-row items-center justify-center px-2">
            <MdErrorOutline className="mr-1" />
            Nie podano dnia przylotu
          </div>
        ) : null
      }
      {
        // departure date not set
        !departureDate ? (
          <div className="flex flex-row items-center justify-center px-2">
            <MdErrorOutline className="mr-1" />
            Nie podano dnia wylotu
          </div>
        ) : null
      }
      {
        // departure date after arrival date
        arrivalDate && departureDate && arrivalDate < departureDate ? (
          <div className="flex flex-row items-center justify-center px-2">
            <MdErrorOutline className="mr-1" />
            Błędna data wylotu oraz przylotu
          </div>
        ) : null
      }
    </div>
  );
}
