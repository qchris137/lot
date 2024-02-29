"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import React from "react";
import { Airport, nameWithIata } from "../types/Airport";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";

interface AirportMapProps {
  departureAirport: Airport | undefined;
  arrivalAirport: Airport | undefined;
  useLocalizedNames: boolean;
}

export default function AirportMap({
  departureAirport,
  arrivalAirport,
  useLocalizedNames,
}: AirportMapProps) {
  var center = [0, 0];
  var zoom = 2;

  if (arrivalAirport && departureAirport) {
    const delta = Math.max(
      Math.abs(
        departureAirport.coordinates.longitude -
          arrivalAirport.coordinates.longitude
      ),
      Math.abs(
        departureAirport.coordinates.latitude -
          arrivalAirport.coordinates.latitude
      )
    );

    for (var i = zoom; i < 20; i++) {
      zoom = i;
      if (delta >= 180.0 / Math.pow(2, zoom - 70 / 96)) {
        break;
      }
    }

    center = [
      (departureAirport.coordinates.latitude +
        arrivalAirport.coordinates.latitude) /
        2,
      (departureAirport.coordinates.longitude +
        arrivalAirport.coordinates.longitude) /
        2,
    ];
  } else if (arrivalAirport) {
    center = [
      arrivalAirport.coordinates.latitude,
      arrivalAirport.coordinates.longitude,
    ];
    zoom = 12;
  } else if (departureAirport) {
    center = [
      departureAirport.coordinates.latitude,
      departureAirport.coordinates.longitude,
    ];
    zoom = 12;
  }

  return (
    <div className="w-screen">
      <MapContainer
        preferCanvas={true}
        center={center as LatLngExpression}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{
          height: "65vh",
          width: "98vw",
          margin: "1vw",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          /* arrival airport */
          arrivalAirport ? (
            <Marker
              position={[
                arrivalAirport.coordinates.latitude,
                arrivalAirport.coordinates.longitude,
              ]}
            >
              <Popup>{nameWithIata(arrivalAirport, useLocalizedNames)}</Popup>
            </Marker>
          ) : null
        }
        {
          /* departure airport */
          departureAirport ? (
            <Marker
              position={[
                departureAirport.coordinates.latitude,
                departureAirport.coordinates.longitude,
              ]}
            >
              <Popup>{nameWithIata(departureAirport, useLocalizedNames)}</Popup>
            </Marker>
          ) : null
        }
        {
          /* line between airports */
          departureAirport && arrivalAirport ? (
            <Polyline
              positions={[
                [
                  departureAirport.coordinates.latitude,
                  departureAirport.coordinates.longitude,
                ],
                [
                  arrivalAirport.coordinates.latitude,
                  arrivalAirport.coordinates.longitude,
                ],
              ]}
            />
          ) : null
        }
        <SetView center={center} zoom={zoom} />
      </MapContainer>
    </div>
  );
}

function SetView({ center, zoom }: any) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}
