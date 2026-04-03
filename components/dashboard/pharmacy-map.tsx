"use client";

import { useEffect, useRef, useState } from "react";
import { pharmacies } from "@/lib/mock-data";
import { MapPin } from "lucide-react";

// Leaflet map component - uses dynamic import to avoid SSR issues
export function PharmacyMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapRef.current) return;

    // Dynamic import Leaflet
    const initMap = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      // Tanzania center coordinates
      const tanzaniaCenter: [number, number] = [-6.369028, 34.888822];

      // Initialize map
      const map = L.map(mapRef.current!, {
        center: tanzaniaCenter,
        zoom: 6,
        zoomControl: true,
      });

      // Add tile layer (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Custom marker icon
      const pharmacyIcon = L.divIcon({
        html: `<div style="background-color: #10b981; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>`,
        className: "custom-pharmacy-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      // Add markers for each pharmacy
      pharmacies.forEach((pharmacy) => {
        const marker = L.marker(pharmacy.coordinates as [number, number], {
          icon: pharmacyIcon,
        }).addTo(map);

        marker.bindPopup(`
          <div style="padding: 8px; min-width: 150px;">
            <h3 style="font-weight: 600; margin-bottom: 4px; color: #1e3a5f;">${pharmacy.name}</h3>
            <p style="font-size: 12px; color: #6b7280; margin: 0;">${pharmacy.location}</p>
            <p style="font-size: 12px; color: #10b981; margin-top: 4px;">
              ${pharmacy.status === "active" ? "Active" : "Pending"}
            </p>
          </div>
        `);
      });

      // Cleanup
      return () => {
        map.remove();
      };
    };

    initMap();
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-border bg-muted/30">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-5 w-5" />
          <span>Loading map...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="border-b border-border px-4 py-3">
        <h3 className="font-semibold text-foreground">GIS Heatmap</h3>
      </div>
      <div ref={mapRef} className="h-64 w-full" />
    </div>
  );
}

// Simple map placeholder for when Leaflet is not loaded
export function MapPlaceholder({ title = "Location Map" }: { title?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="border-b border-border px-4 py-3">
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <div className="relative h-64 bg-gradient-to-br from-emerald-100 to-blue-100">
        {/* Tanzania outline placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Pharmacy markers */}
            {pharmacies.slice(0, 4).map((pharmacy, index) => (
              <div
                key={pharmacy.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${30 + (index % 2) * 40}%`,
                  top: `${30 + Math.floor(index / 2) * 40}%`,
                }}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-lg">
                  <MapPin className="h-3 w-3" />
                </div>
              </div>
            ))}
            {/* Heatmap overlay effect */}
            <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-red-400/30 blur-xl" />
            <div className="absolute right-1/4 top-1/3 h-24 w-24 rounded-full bg-orange-400/30 blur-xl" />
            <div className="absolute bottom-1/4 left-1/3 h-20 w-20 rounded-full bg-yellow-400/30 blur-xl" />
          </div>
        </div>
        {/* Map attribution */}
        <div className="absolute bottom-2 right-2 rounded bg-white/80 px-2 py-1 text-xs text-muted-foreground">
          Tanzania Region
        </div>
      </div>
    </div>
  );
}
