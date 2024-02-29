"use client";

import React from "react";
import { Airport, nameWithIata } from "../types/Airport";
import { FaPlane } from "react-icons/fa6";

interface AirportPickerProps {
  airports: {
    country: string;
    airports: Airport[];
  }[];
  onDepartureChange: (newCode: string) => void;
  onArrivalChange: (newCode: string) => void;
  onLocalizedNamesChange: (newValue: boolean) => void;
}

export default function AirportPicker({
  airports,
  onArrivalChange,
  onDepartureChange,
  onLocalizedNamesChange,
}: AirportPickerProps) {
  const [selectedDeparture, setSelectedDeparture] = React.useState<
    string | undefined
  >(undefined);
  const [selectedArrival, setSelectedArrival] = React.useState<
    string | undefined
  >(undefined);
  const [useLocalizedNames, setUseLocalizedNames] =
    React.useState<boolean>(true);

  function handleDepartureChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onDepartureChange(event.target.value);
    setSelectedDeparture(event.target.value);
  }

  function handleArrivalChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onArrivalChange(event.target.value);
    setSelectedArrival(event.target.value);
  }

  function handleLocalizedNamesChange() {
    onLocalizedNamesChange(!useLocalizedNames);
    setUseLocalizedNames(!useLocalizedNames);
  }

  return (
    <div
      id="airportlocations"
      className="w-screen flex flex-col md:flex-row items-center justify-center pb-2 text-center"
    >
      <div className="flex w-screen flex-row items-center justify-center text-center p-2 ">
        <select
          className="dark:bg-slate-800 dark:text-slate-100 bg-slate-200 text-slate-900 p-2 rounded-md mx-2 no-underline text-base font-normal w-1/2"
          defaultValue={"undefined"}
          onChange={handleDepartureChange}
        >
          <option value="undefined" disabled>
            Wybierz lotnisko...
          </option>
          {airports.map((country) => (
            <optgroup
              key={country.country}
              id={country.country}
              label={country.country}
            >
              {country.airports.map((airport) => (
                <option
                  value={airport.iata}
                  disabled={selectedArrival == airport.iata}
                  key={airport.iata}
                >
                  {nameWithIata(airport, useLocalizedNames)}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <FaPlane className="mx-4" />

        <select
          className="dark:bg-slate-800 dark:text-slate-100 bg-slate-200 text-slate-900 p-2 rounded-md mx-2 no-underline text-base font-normal w-1/2"
          defaultValue={"undefined"}
          onChange={handleArrivalChange}
        >
          <option value="undefined" disabled>
            Wybierz lotnisko...
          </option>
          {airports.map((country) => (
            <optgroup
              key={country.country}
              id={country.country}
              label={country.country}
            >
              {country.airports.map((airport) => (
                <option
                  value={airport.iata}
                  disabled={selectedDeparture == airport.iata}
                  key={airport.iata}
                >
                  {nameWithIata(airport, useLocalizedNames)}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <button
        className="dark:bg-slate-800 dark:text-slate-100 bg-slate-200 text-slate-900 rounded-md ml-2 max-md:my-2 p-2 md:w-1/5 text-base font-normal"
        onClick={handleLocalizedNamesChange}
      >
        Zmień na nazwy {useLocalizedNames ? "angielskie" : "lokalne"}
      </button>
    </div>
  );
}
