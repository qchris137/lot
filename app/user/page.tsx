"use client";

import { useSearchParams } from "next/navigation";
import "./page.css";
import airports from "@/public/airports.json";
import React, { Suspense } from "react";
import { nameWithIata } from "../types/Airport";
import { LuBaby } from "react-icons/lu";
import { MdErrorOutline, MdFace } from "react-icons/md";
const airports_list = airports.flatMap((value) => value.airports);

function HeaderText({ useLocalizedNames }: any) {
  const searchParams = useSearchParams();

  return (
    <>
      Podróż z{" "}
      <span className="dark:bg-slate-800 dark:text-slate-100 bg-slate-200 text-slate-900 p-2 rounded-md mx-2 no-underline text-base font-normal w-1/4">
        {nameWithIata(
          airports_list.find(
            (value) => value.iata == searchParams.get("from")
          )!,
          useLocalizedNames
        )}
      </span>{" "}
      do{" "}
      <span className="dark:bg-slate-800 dark:text-slate-100 bg-slate-200 text-slate-900 p-2 rounded-md mx-2 no-underline text-base font-normal w-1/4">
        {nameWithIata(
          airports_list.find((value) => value.iata == searchParams.get("to"))!,
          useLocalizedNames
        )}
      </span>
    </>
  );
}

export default function Page() {
  const [useLocalizedNames, setUseLocalizedNames] =
    React.useState<boolean>(true);
  const [email, setEmail] = React.useState<string>("");

  return (
    <Suspense>
      <main className="flex flex-col p-4 items-center justify-between min-h-screen w-screen dark:bg-slate-900 dark:text-slate-100 bg-slate-100 text-slate-900">
        <header className="flex items-center justify-center text-xl font-bold w-screen">
          <HeaderText useLocalizedNames={useLocalizedNames} />
          <button
            className="dark:bg-slate-800 dark:text-slate-100 bg-slate-200 text-slate-900 rounded-md p-2 w-1/5 text-base font-normal"
            onClick={() => setUseLocalizedNames(!useLocalizedNames)}
          >
            Zmień na nazwy&nbsp;
            {useLocalizedNames ? "angielskie" : "lokalne"}
          </button>
        </header>
        <div className="flex flex-col items-center" id="content">
          Wybierz ilość pasażerów:
          <div className="flex items-center justify-center w-screen mb-8">
            <LuBaby className="pr-2" /> Dzieci
            <input
              className="dark:bg-slate-800 bg-slate-200 dark:text-slate-100 text-slate-900 mx-2 rounded-md px-2 py-0.5 w-16 text-center"
              type="number"
              max="100"
              min="0"
              defaultValue={0}
            />
            <MdFace className="pr-2" /> Dorośli
            <input
              className="dark:bg-slate-800 bg-slate-200 dark:text-slate-100 text-slate-900 mx-2 rounded-md px-2 py-0.5 w-16 text-center"
              type="number"
              max="100"
              min="1"
              defaultValue={1}
            />
          </div>
          <div className="flex items-center justify-center w-screen my-1">
            Podaj imię:{" "}
            <input className="dark:bg-slate-800 bg-slate-200 dark:text-slate-100 text-slate-900 mx-2 rounded-md px-2 py-0.5 w-1/2" />
          </div>
          <div className="flex items-center justify-center w-screen my-1">
            Podaj nazwisko:{" "}
            <input className="dark:bg-slate-800 bg-slate-200 dark:text-slate-100 text-slate-900 mx-2 rounded-md px-2 py-0.5 w-1/2" />
          </div>
          <div className="flex items-center justify-center w-screen my-1">
            Podaj adres email:{" "}
            <input
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              className="dark:bg-slate-800 bg-slate-200 dark:text-slate-100 text-slate-900 mx-2 rounded-md px-2 py-0.5 w-1/2"
            />
          </div>
          {!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
            email
          ) ? (
            <div className="flex flex-row items-center justify-center px-2 dark:text-red-400 text-red-600">
              <MdErrorOutline className="mr-1" />
              Zły email
            </div>
          ) : null}
        </div>
        <footer>&copy; 2024, Krzysztof Antonowski</footer>
      </main>
    </Suspense>
  );
}
