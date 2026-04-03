"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LocationPickerProps {
  onLocationSelect: (location: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
  initialLocation?: {
    lat: number;
    lng: number;
  };
  onClose?: () => void;
}

// Common Tanzania locations for suggestions
const tanzaniaLocations = [
  { name: "Dar es Salaam CBD", lat: -6.8160, lng: 39.2803, area: "Dar es Salaam" },
  { name: "Mikocheni", lat: -6.7654, lng: 39.2580, area: "Dar es Salaam" },
  { name: "Kinondoni", lat: -6.7757, lng: 39.2454, area: "Dar es Salaam" },
  { name: "Kariakoo", lat: -6.8235, lng: 39.2695, area: "Dar es Salaam" },
  { name: "Mwenge", lat: -6.7689, lng: 39.2289, area: "Dar es Salaam" },
  { name: "Masaki", lat: -6.7534, lng: 39.2867, area: "Dar es Salaam" },
  { name: "Ubungo", lat: -6.7892, lng: 39.2089, area: "Dar es Salaam" },
  { name: "Tegeta", lat: -6.6678, lng: 39.1789, area: "Dar es Salaam" },
  { name: "Mbezi Beach", lat: -6.7123, lng: 39.2156, area: "Dar es Salaam" },
  { name: "Sinza", lat: -6.7834, lng: 39.2345, area: "Dar es Salaam" },
  { name: "Arusha City Center", lat: -3.3869, lng: 36.6830, area: "Arusha" },
  { name: "Moshi", lat: -3.3500, lng: 37.3333, area: "Kilimanjaro" },
  { name: "Dodoma", lat: -6.1722, lng: 35.7395, area: "Dodoma" },
  { name: "Mwanza", lat: -2.5167, lng: 32.9000, area: "Mwanza" },
  { name: "Zanzibar Stone Town", lat: -6.1622, lng: 39.1875, area: "Zanzibar" },
];

export function LocationPicker({
  onLocationSelect,
  initialLocation,
  onClose,
}: LocationPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapRef.current) return;

    let map: L.Map;

    const initMap = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      // Default to Dar es Salaam center
      const defaultCenter: [number, number] = initialLocation
        ? [initialLocation.lat, initialLocation.lng]
        : [-6.7924, 39.2083];

      // Initialize map
      map = L.map(mapRef.current!, {
        center: defaultCenter,
        zoom: 13,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Create custom marker icon
      const selectedIcon = L.divIcon({
        html: `<div style="background-color: #ef4444; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 3px 6px rgba(0,0,0,0.3);">
          <svg style="transform: rotate(45deg);" width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>`,
        className: "custom-location-marker",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      // Add initial marker if location provided
      if (initialLocation) {
        markerRef.current = L.marker([initialLocation.lat, initialLocation.lng], {
          icon: selectedIcon,
          draggable: true,
        }).addTo(map);

        markerRef.current.on("dragend", async (e) => {
          const position = e.target.getLatLng();
          const address = await reverseGeocode(position.lat, position.lng);
          setSelectedLocation({
            lat: position.lat,
            lng: position.lng,
            address,
          });
        });
      }

      // Handle map click
      map.on("click", async (e) => {
        const { lat, lng } = e.latlng;

        // Remove existing marker
        if (markerRef.current) {
          map.removeLayer(markerRef.current);
        }

        // Add new marker
        markerRef.current = L.marker([lat, lng], {
          icon: selectedIcon,
          draggable: true,
        }).addTo(map);

        markerRef.current.on("dragend", async (ev) => {
          const position = ev.target.getLatLng();
          const address = await reverseGeocode(position.lat, position.lng);
          setSelectedLocation({
            lat: position.lat,
            lng: position.lng,
            address,
          });
        });

        // Get address from coordinates
        const address = await reverseGeocode(lat, lng);
        setSelectedLocation({ lat, lng, address });
      });
    };

    initMap();

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [isClient, initialLocation]);

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    // Find closest known location
    const closest = tanzaniaLocations.reduce((prev, curr) => {
      const prevDist = Math.sqrt(
        Math.pow(prev.lat - lat, 2) + Math.pow(prev.lng - lng, 2)
      );
      const currDist = Math.sqrt(
        Math.pow(curr.lat - lat, 2) + Math.pow(curr.lng - lng, 2)
      );
      return currDist < prevDist ? curr : prev;
    });

    // If close enough, use the known location name
    const distance = Math.sqrt(
      Math.pow(closest.lat - lat, 2) + Math.pow(closest.lng - lng, 2)
    );

    if (distance < 0.05) {
      return `${closest.name}, ${closest.area}`;
    }

    return `${lat.toFixed(4)}, ${lng.toFixed(4)} - Near ${closest.area}`;
  };

  const handleLocationSearch = (location: typeof tanzaniaLocations[0]) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([location.lat, location.lng], 15);

      // Trigger a click at the location
      const event = {
        latlng: { lat: location.lat, lng: location.lng },
      };
      mapInstanceRef.current.fire("click", event);
    }
    setSearchQuery(location.name);
    setShowSuggestions(false);
  };

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([latitude, longitude], 16);
            const event = {
              latlng: { lat: latitude, lng: longitude },
            };
            mapInstanceRef.current.fire("click", event);
          }
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocating(false);
          // Default to Dar es Salaam if geolocation fails
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([-6.7924, 39.2083], 13);
          }
        }
      );
    } else {
      setIsLocating(false);
    }
  };

  const filteredLocations = tanzaniaLocations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirm = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
    }
  };

  if (!isClient) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-lg p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            Pick Your Location
          </h2>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search area (e.g., Mikocheni, Masaki...)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="pl-9"
            />
          </div>

          {/* Location Suggestions */}
          {showSuggestions && searchQuery && (
            <div className="absolute left-4 right-4 mt-1 bg-white border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
              {filteredLocations.map((location) => (
                <button
                  key={location.name}
                  className="w-full text-left px-4 py-2 hover:bg-muted/50 flex items-center gap-2"
                  onClick={() => handleLocationSearch(location)}
                >
                  <MapPin className="h-4 w-4 text-emerald-500" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {location.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {location.area}
                    </p>
                  </div>
                </button>
              ))}
              {filteredLocations.length === 0 && (
                <p className="px-4 py-2 text-sm text-muted-foreground">
                  No locations found
                </p>
              )}
            </div>
          )}

          {/* Use Current Location Button */}
          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={handleUseCurrentLocation}
            disabled={isLocating}
          >
            <Navigation className={`h-4 w-4 mr-2 ${isLocating ? "animate-pulse" : ""}`} />
            {isLocating ? "Locating..." : "Use Current Location"}
          </Button>
        </div>

        {/* Map */}
        <div className="relative flex-1 min-h-[300px]">
          <div ref={mapRef} className="absolute inset-0" />

          {/* Map Instructions */}
          <div className="absolute top-2 left-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-muted-foreground">
            Tap on the map to select your delivery location
          </div>
        </div>

        {/* Selected Location & Confirm */}
        <div className="px-4 py-4 border-t border-border bg-white">
          {selectedLocation ? (
            <>
              <div className="flex items-start gap-2 mb-3">
                <MapPin className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground text-sm">
                    Selected Location
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedLocation.address}
                  </p>
                </div>
              </div>
              <Button
                className="w-full bg-emerald-500 hover:bg-emerald-600"
                onClick={handleConfirm}
              >
                Confirm Location
              </Button>
            </>
          ) : (
            <p className="text-center text-sm text-muted-foreground py-2">
              Tap on the map to select your location
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
