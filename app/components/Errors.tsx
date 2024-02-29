import { MdErrorOutline } from "react-icons/md";
import { Airport } from "../types/Airport";
import { isValidEmail } from "../utils/email";

interface AirportDateErrorsProps {
  onErrors: (errors: boolean) => void;
  departureAirport: Airport | undefined;
  arrivalAirport: Airport | undefined;
  departureDate: Date | undefined;
  arrivalDate: Date | undefined;
}

interface UserDataErrorsProps {
  onErrors: (errors: boolean) => void;
  firstName: string;
  lastName: string;
  email: string;
  kids: number;
  adults: number;
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
      className="w-screen flex flex-col lg:flex-row items-center justify-center dark:text-red-400 text-red-600"
      id="airportdateerrors"
    >
      {
        // Nie wybrano miejsca przylotu
        !arrivalAirport ? (
          <div className="flex flex-row items-center justify-center px-2">
            <MdErrorOutline className="mr-1" />
            Nie wybrano miejsca przylotu
          </div>
        ) : null
      }
      {
        // Nie wybrano miejsca wylotu
        !departureAirport ? (
          <div className="flex flex-row items-center justify-center px-2">
            <MdErrorOutline className="mr-1" />
            Nie wybrano miejsca wylotu
          </div>
        ) : null
      }
      {
        // Nie wybrano dnia przylotu
        !arrivalDate ? (
          <div className="flex flex-row items-center justify-center px-2">
            <MdErrorOutline className="mr-1" />
            Nie podano dnia przylotu
          </div>
        ) : null
      }
      {
        // Nie wybrano dnia wylotu
        !departureDate ? (
          <div className="flex flex-row items-center justify-center px-2">
            <MdErrorOutline className="mr-1" />
            Nie podano dnia wylotu
          </div>
        ) : null
      }
      {
        // Przylot przed odlotem
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

export function UserDataErrors({
  adults,
  email,
  firstName,
  kids,
  lastName,
  onErrors,
}: UserDataErrorsProps) {
  if (
    email.length == 0 ||
    !isValidEmail(email) ||
    firstName.length == 0 ||
    lastName.length == 0 ||
    (adults == 0 && kids > 0) ||
    adults == 0
  ) {
    onErrors(true);
  } else {
    onErrors(false);
    return null;
  }

  return (
    <div
      className="w-screen flex flex-col lg:flex-row items-center justify-center dark:text-red-400 text-red-600"
      id="userdataerrors"
    >
      {
        // Zły adres e-mail
        !isValidEmail(email) && email.length != 0 ? (
          <div className="flex flex-row items-center justify-center px-2">
            <MdErrorOutline className="mr-1" />
            Zły adres e-mail
          </div>
        ) : null
      }
      {
        // Brak adresu e-mail
        email.length == 0 ? (
          <div className="flex flex-row items-center justify-center px-2">
            <MdErrorOutline className="mr-1" />
            Brak adresu e-mail
          </div>
        ) : null
      }
      {
        // Brak imienia
        firstName.length == 0 ? (
          <div className="flex flex-row items-center justify-center px-2">
            <MdErrorOutline className="mr-1" />
            Brak imienia
          </div>
        ) : null
      }
      {
        // Brak nazwiska
        lastName.length == 0 ? (
          <div className="flex flex-row items-center justify-center px-2">
            <MdErrorOutline className="mr-1" />
            Brak nazwiska
          </div>
        ) : null
      }
      {
        // Brak osoby dorosłej
        adults == 0 && kids > 0 ? (
          <div className="flex flex-row items-center justify-center px-2">
            <MdErrorOutline className="mr-1" />
            Wymagana osoba dorosła
          </div>
        ) : null
      }
      {
        // 0 pasażerów
        adults == 0 && kids == 0 ? (
          <div className="flex flex-row items-center justify-center px-2">
            <MdErrorOutline className="mr-1" />
            Co najmniej jedna osoba musi polecieć
          </div>
        ) : null
      }
    </div>
  );
}
