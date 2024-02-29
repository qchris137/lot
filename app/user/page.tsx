"use client";

import { useSearchParams } from "next/navigation";
import "./page.css";
import airports from "@/public/airports.json";
import React, { Suspense } from "react";
import { nameWithIata } from "../types/Airport";
import { LuBaby } from "react-icons/lu";
import { MdFace } from "react-icons/md";
import Link from "next/link";
import { UserDataErrors } from "../components/Errors";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa6";
import BigHeaderText from "../components/BigHeaderText";
import NumberInput from "../components/NumberInput";
import ChangeLocalizationButton from "../components/ChangeLocalizationButton";
import TextInput from "../components/TextInput";
const airports_list = airports.flatMap((value) => value.airports);

function HeaderText({ useLocalizedNames, searchParams }: any) {
  return (
    <div
      id="headertext"
      className="flex flex-col md:flex-row items-center justify-center w-screen"
    >
      <FaPlaneDeparture className="m-2 mr-0" />
      <span className="dark:bg-slate-800 dark:text-slate-100 bg-slate-200 text-slate-900 p-2 rounded-md mx-2 no-underline text-base font-normal w-1/2">
        {nameWithIata(
          airports_list.find(
            (value) => value.iata == searchParams.get("from")
          )!,
          useLocalizedNames
        )}
      </span>
      <FaPlaneArrival className="m-2 mr-0" />
      <span className="dark:bg-slate-800 dark:text-slate-100 bg-slate-200 text-slate-900 p-2 rounded-md mx-2 no-underline text-base font-normal w-1/2">
        {nameWithIata(
          airports_list.find((value) => value.iata == searchParams.get("to"))!,
          useLocalizedNames
        )}
      </span>
    </div>
  );
}

export default function Page() {
  const [useLocalizedNames, setUseLocalizedNames] =
    React.useState<boolean>(true);
  const [errors, setErrors] = React.useState<boolean>(true);
  const [email, setEmail] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [adults, setAdults] = React.useState<number>(1);
  const [kids, setKids] = React.useState<number>(0);

  return (
    <Suspense>
      <main className="flex flex-col p-4 items-center min-h-screen w-screen dark:bg-slate-900 dark:text-slate-100 bg-slate-100 text-slate-900">
        <header>
          <BigHeaderText text="Dane osobowe" />
          <div
            className="flex w-screen flex-col md:flex-row items-center justify-center text-xl font-bold text-center p-2"
            id="tripinfo"
          >
            <HeaderText
              useLocalizedNames={useLocalizedNames}
              searchParams={useSearchParams()}
            />
            <ChangeLocalizationButton
              onChange={(bool) => setUseLocalizedNames(!useLocalizedNames)}
              useLocalizedNames={useLocalizedNames}
            />
          </div>
        </header>
        <div className="flex flex-col items-center justify-center" id="content">
          Wybierz ilość pasażerów:
          <div className="flex items-center justify-center w-screen my-1">
            <LuBaby className="mr-1" /> Dzieci
            <NumberInput
              onChange={(event) => setKids(Number(event.target.value))}
              max={100}
              min={0}
              defaultValue={0}
            />
            <MdFace className="mr-1" /> Dorośli
            <NumberInput
              onChange={(event) => setAdults(Number(event.target.value))}
              max={100}
              min={0}
              defaultValue={0}
            />
          </div>
          <div className="flex items-center justify-center w-screen my-1">
            Podaj imię: <TextInput onChange={(value) => setName(value)} />
          </div>
          <div className="flex items-center justify-center w-screen my-1">
            Podaj nazwisko:{" "}
            <TextInput onChange={(value) => setLastName(value)} />
          </div>
          <div className="flex items-center justify-center w-screen my-1">
            Podaj adres email:{" "}
            <TextInput onChange={(value) => setEmail(value)} />
          </div>
          <UserDataErrors
            adults={adults}
            kids={kids}
            email={email}
            firstName={name}
            lastName={lastName}
            onErrors={setErrors}
          />
        </div>
        <footer className="flex flex-col mt-auto">
          <Link
            className={`dark:text-slate-900 text-slate-100 p-1 rounded-md text-center ${
              errors
                ? "pointer-events-none cursor-not-allowed bg-slate-400"
                : "dark:bg-sky-300 bg-sky-500"
            }`}
            href={{
              pathname: "/summary",
              query: {
                name: name,
                lastName: lastName,
                email: email,
                kids: kids,
                adults: adults,
                from: useSearchParams().get("from"),
                to: useSearchParams().get("to"),
                depart: useSearchParams().get("depart"),
                arrive: useSearchParams().get("arrive"),
              },
            }}
          >
            Dalej
          </Link>
          &copy; 2024, Krzysztof Antonowski
        </footer>
      </main>
    </Suspense>
  );
}
