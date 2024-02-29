"use client";

import { useSearchParams } from "next/navigation";
import BigHeaderText from "../components/BigHeaderText";
import airports from "@/public/airports.json";
const airports_list = airports.flatMap((value) => value.airports);
import "./page.css";

export default function Home() {
  const searchParams = useSearchParams();
  const departureAirportIATA = searchParams.get("from");
  const arrivalAirportIATA = searchParams.get("to");

  const departureAirport = airports_list.find(
    (value) => value.iata == departureAirportIATA
  );
  const arrivalAirport = airports_list.find(
    (value) => value.iata == arrivalAirportIATA
  );

  return (
    <main className="flex flex-col p-4 items-center justify-between min-h-screen w-screen dark:bg-slate-900 dark:text-slate-100 bg-slate-100 text-slate-900 print:block">
      <header>
        <BigHeaderText text="Podsumowanie" />
      </header>
      <div id="content" className="flex w-screen mt-auto">
        <table
          id="trip"
          className="kolumna text-center items-center justify-center"
        >
          <tr>
            <td>
              <b>Lotnisko startowe</b>
            </td>
            <td>
              <span className="font-thin">
                {departureAirport?.name} ({departureAirportIATA})
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <b>Lotnisko końcowe</b>
            </td>
            <td>
              <span className="font-thin">
                {arrivalAirport?.name} ({arrivalAirportIATA})
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <b>Data wylotu</b>
            </td>
            <td>
              <span className="font-thin">
                {new Date(
                  Number(searchParams.get("depart"))
                ).toLocaleDateString()}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <b>Data powrotu</b>
            </td>
            <td>
              <span className="font-thin">
                {new Date(
                  Number(searchParams.get("arrive"))
                ).toLocaleDateString()}
              </span>
            </td>
          </tr>
        </table>
        <div
          id="pionowalinia"
          className="w-0.5 dark:bg-slate-800 dark:text-slate-100 bg-slate-200 text-slate-900"
        ></div>
        <table
          id="userdata"
          className="kolumna text-center items-center justify-center"
        >
          <tr>
            <td>
              <b>Imię</b>
            </td>
            <td>
              <span className="font-thin">{searchParams.get("name")}</span>
            </td>
          </tr>
          <tr>
            <td>
              <b>Nazwisko</b>
            </td>
            <td>
              <span className="font-thin">{searchParams.get("lastName")}</span>
            </td>
          </tr>
          <tr>
            <td>
              <b>Adres e-mail</b>
            </td>
            <td>
              <span className="font-thin">{searchParams.get("email")}</span>
            </td>
          </tr>
          <tr>
            <td>
              <b>Ilość dzieci</b>
            </td>
            <td>
              <span className="font-thin">{searchParams.get("kids")}</span>
            </td>
          </tr>
          <tr>
            <td>
              <b>Ilość osób dorosłych</b>
            </td>
            <td>
              <span className="font-thin">{searchParams.get("adults")}</span>
            </td>
          </tr>
        </table>
      </div>
      <footer className="flex flex-col mt-auto print:hidden">
        <button
          onClick={(_) => window.print()}
          className="dark:text-slate-900 text-slate-100 p-1 rounded-md text-center dark:bg-sky-300 bg-sky-500"
        >
          Drukuj
        </button>
        &copy; 2024, Krzysztof Antonowski
      </footer>
    </main>
  );
}
