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
  if (!arrivalAirport || !departureAirport || !arrivalDate || !departureDate || departureDate < new Date() || arrivalDate < new Date()) {
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
          <div className='flex flex-row items-center justify-center px-2'>
            <MdErrorOutline className="mr-1" />
            Nie wybrano miejsca przylotu
          </div>
        ) : null
      }
      {
        // departure airport not selected
        !departureAirport ? (
          <div className='flex flex-row items-center justify-center px-2'>
            <MdErrorOutline className="mr-1" />
            Nie wybrano miejsca wylotu
          </div>
        ) : null
      }
      {
        // arrival date not set
        !arrivalDate ? (
          <div className='flex flex-row items-center justify-center px-2'>
            <MdErrorOutline className="mr-1" />
            Nie podano dnia i godziny przylotu
          </div>
        ) : null
      }
      {
        // departure date not set
        !departureDate ? (
          <div className='flex flex-row items-center justify-center px-2'>
            <MdErrorOutline className="mr-1" />
            Nie podano dnia i godziny wylotu
          </div>
        ) : null
      }
      {
        // departure date before today
        (departureDate && departureDate < new Date()) ? (
          <div className='flex flex-row items-center justify-center px-2'>
            <MdErrorOutline className="mr-1" />
            Dzień i godzina wylotu z przeszłości
          </div>
        ) : null
      }
      {
        // arrival date before today
        (arrivalDate && arrivalDate < new Date()) ? (
          <div className='flex flex-row items-center justify-center px-2'>
            <MdErrorOutline className="mr-1" />
            Dzień i godzina przylotu z przeszłości
          </div>
        ) : null
      }
      {
        // departure date after arrival date
        (arrivalDate && departureDate) && (arrivalDate < departureDate) ? (
          <div className='flex flex-row items-center justify-center px-2'>
            <MdErrorOutline className='mr-1'/>
            Błędna data wylotu oraz przylotu
          </div>
        ) : null
      }
    </div>
  );
}
