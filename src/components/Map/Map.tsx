import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  postcode: string;
  selectedCrimeData: { [key: string]: any }[];
  categorySelected: string; // Replace any with actual data type
}

const Map: React.FC<MapProps> = ({ selectedCrimeData, categorySelected, postcode }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize map
      const map = L.map("map").setView([51.505, -0.09], 13); // Set default view coordinates

      // Add tile layer (you may need to replace the URL with your preferred tile provider)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      mapRef.current = map;
    }

    const map = mapRef.current;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add markers for each crime location
    selectedCrimeData.forEach((crime) => {
      if (crime.category === categorySelected) {
        const { latitude, longitude } = crime.location;
        L.marker([latitude, longitude], { icon: L.icon({ iconUrl: "https://i.pinimg.com/originals/0f/61/ba/0f61ba72e0e12ba59d30a50295964871.png", iconSize: [40, 40] }) })
          .addTo(map)
          .bindPopup(
            // this shown general postcode ( is not crime specific)
            `<b>Postcode:</b> ${postcode}<br/>
             <b>Category of Crime:</b> ${crime.category}<br/>
             <b>Date of Crime:</b> ${crime.month}<br/>
             <b>Outcome Status:</b> ${crime.outcomeStatus || "On Going"}`
          );
      }
    });

    // Fit map to bounds of all markers
    const bounds = L.latLngBounds(
      selectedCrimeData
        .filter((crime) => crime.category === categorySelected)
        .map((crime) => [crime.location.latitude, crime.location.longitude])
    );

    if (bounds.isValid()) {
      map.fitBounds(bounds);
    }
  }, [selectedCrimeData, categorySelected, postcode]);

  return <div style={{ width: "600px", height: "500px", marginTop: "20px", marginBottom: "20px" }} id="map"></div>;
};

export default Map;