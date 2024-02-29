"use client";

import React from "react";
import { Airport } from "./types/Airport";
import airports from "@/public/airports.json";
import AirportPicker from "./components/AirportPicker";
import dynamic from "next/dynamic";
import Link from "next/link";
import DatePicker from "./components/DatePicker";
import { AirportDateErrors } from "./components/Errors";
import BigHeaderText from "./components/BigHeaderText";

const AirportMap = dynamic(() => import("./components/AirportMap"), {
  ssr: false,
  loading: () => (
    <div
      className="flex flex-col items-center justify-center text-center"
      role="status"
    >
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-slate-100 animate-spin dark:text-slate-900 fill-sky-500"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <p className="dark:text-slate-100 text-slate-900">Wczytywanie mapy...</p>
    </div>
  ),
});

const airports_list = airports.flatMap((value) => value.airports);

export default function Home({}: any) {
  // variables
  const [departureAirport, setDepartureAirport] = React.useState<
    Airport | undefined
  >(undefined);
  const [arrivalAirport, setArrivalAirport] = React.useState<
    Airport | undefined
  >(undefined);
  const [useLocalizedNames, setUseLocalizedNames] =
    React.useState<boolean>(true);
  const [arrivalDate, setArrivalDate] = React.useState<Date | undefined>(
    undefined
  );
  const [departureDate, setDepartureDate] = React.useState<Date | undefined>(
    undefined
  );
  const [errors, setErrors] = React.useState<boolean>(true);

  // helper functions
  function handleDepartureChange(newCode: string) {
    setDepartureAirport(airports_list.find((value) => value.iata === newCode));
  }

  function handleArrivalChange(newCode: string) {
    setArrivalAirport(airports_list.find((value) => value.iata === newCode));
  }

  function handleLocalizedNamesChange(newValue: boolean) {
    setUseLocalizedNames(newValue);
  }

  function handleArrivalDate(newDate: Date | undefined) {
    setArrivalDate(newDate);
  }

  function handleDepartureDate(newDate: Date | undefined) {
    setDepartureDate(newDate);
  }

  function handleSetErrors(errors: boolean) {
    setErrors(errors);
  }

  // ui
  return (
    <main className="flex flex-col p-4 items-center min-h-screen w-screen dark:bg-slate-900 dark:text-slate-100 bg-slate-100 text-slate-900">
      <header>
        <BigHeaderText text="Chiński LOT" />
        <AirportPicker
          airports={airports}
          onArrivalChange={handleArrivalChange}
          onDepartureChange={handleDepartureChange}
          onLocalizedNamesChange={handleLocalizedNamesChange}
        />
        <DatePicker
          onArrivalDate={handleArrivalDate}
          onDepartureDate={handleDepartureDate}
        />
        <AirportDateErrors
          arrivalAirport={arrivalAirport}
          arrivalDate={arrivalDate}
          departureAirport={departureAirport}
          departureDate={departureDate}
          onErrors={handleSetErrors}
        />
      </header>
      <section id="content">
        <AirportMap
          departureAirport={departureAirport}
          arrivalAirport={arrivalAirport}
          useLocalizedNames={useLocalizedNames}
        />
      </section>
      <footer className="flex flex-col mt-auto">
        <Link
          className={`dark:text-slate-900 text-slate-100 p-1 rounded-md text-center ${
            errors
              ? "pointer-events-none cursor-not-allowed bg-slate-400"
              : "dark:bg-sky-300 bg-sky-500"
          }`}
          href={{
            pathname: "/user",
            query: {
              from: departureAirport?.iata,
              to: arrivalAirport?.iata,
              depart: departureDate?.valueOf(),
              arrive: arrivalDate?.valueOf(),
            },
          }}
          onClick={(_) => {
            if (arrivalAirport?.iata == "TPE") {
              alert(
                "你确定吗？ 如果你去那里你将失去1000信用分！\nyou sure? you go there lose 1000 credit point!"
              );
            }
          }}
        >
          Dalej
        </Link>
        &copy; 2024, Krzysztof Antonowski
      </footer>
    </main>
  );
}
