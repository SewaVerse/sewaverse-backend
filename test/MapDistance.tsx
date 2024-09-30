"use client";
import { useState } from "react";

// Haversine formula to calculate distance between two coordinates
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Radius of the Earth in kilometers
  const toRad = (value: number) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
}

const NominatimGeocodeExample = () => {
  const [userLocation, setUserLocation] = useState({
    lat: 0,
    lon: 0,
    name: "",
  });
  const [serviceProviders, setServiceProviders] = useState([
    { name: "", location: "", lat: 0, lon: 0 },
    { name: "", location: "", lat: 0, lon: 0 },
    { name: "", location: "", lat: 0, lon: 0 },
  ]);
  const [distances, setDistances] = useState<
    { name: string; distance: number }[]
  >([]);

  // Function to get the user's current location and name
  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Fetch location name from Nominatim
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const data = await response.json();

          setUserLocation({
            lat,
            lon,
            name: data.display_name || "Location not found",
          });
        },
        (error) => console.error("Geolocation error:", error)
      );
    }
  };

  // Function to update service provider location and calculate distances
  const calculateDistances = async () => {
    const updatedProviders = await Promise.all(
      serviceProviders.map(async (provider) => {
        if (provider.location) {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${provider.location}`
          );
          const data = await response.json();
          if (data.length > 0) {
            const { lat, lon } = data[0];
            return { name: provider.name, lat, lon };
          }
        }
        return { name: provider.name, lat: 0, lon: 0 };
      })
    );

    // Calculate distances
    const calculatedDistances = updatedProviders.map((provider) => ({
      name: provider.name,
      distance: haversineDistance(
        userLocation.lat,
        userLocation.lon,
        provider.lat,
        provider.lon
      ),
    }));

    // Sort by distance (nearest first)
    calculatedDistances.sort((a, b) => a.distance - b.distance);
    setDistances(calculatedDistances);

    // Update the service providers' lat/lon state
    setServiceProviders((prev) =>
      prev.map((provider, index) => ({
        ...provider,
        lat: updatedProviders[index]?.lat || 0,
        lon: updatedProviders[index]?.lon || 0,
      }))
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center">
        <h1>Geocode Place Name to Coordinates (Nepal)</h1>
        <button
          className="p-2 rounded-md bg-black text-white"
          onClick={getCurrentLocation}
        >
          Get My Current Location
        </button>

        {userLocation.lat !== 0 && (
          <p>
            Your Location - Latitude: {userLocation.lat}, Longitude:{" "}
            {userLocation.lon}, Name: {userLocation.name}
          </p>
        )}

        <h2>Service Providers</h2>
        {serviceProviders.map((provider, index) => (
          <div className="flex gap-4 mb-4" key={index}>
            <input
              type="text"
              placeholder="Service Provider Name"
              value={provider.name}
              className="p-2 border-2 rounded-md border-blue-400"
              onChange={(e) => {
                const newProviders = [...serviceProviders];
                newProviders[index].name = e.target.value;
                setServiceProviders(newProviders);
              }}
            />
            <input
              type="text"
              placeholder="Location (e.g. Gongabu)"
              value={provider.location}
              className="p-2 border-2 rounded-md border-blue-400"
              onChange={(e) => {
                const newProviders = [...serviceProviders];
                newProviders[index].location = e.target.value;
                setServiceProviders(newProviders);
              }}
            />
            {provider.lat !== 0 && provider.lon !== 0 && (
              <div>
                <p>
                  Latitude:{" "}
                  {typeof provider.lat === "number"
                    ? provider.lat.toFixed(6)
                    : "N/A"}
                  , Longitude:{" "}
                  {typeof provider.lon === "number"
                    ? provider.lon.toFixed(6)
                    : "N/A"}
                </p>
              </div>
            )}
          </div>
        ))}

        <button
          className="p-2 rounded-md bg-black text-white"
          onClick={calculateDistances}
        >
          Calculate Distances
        </button>

        {distances.length > 0 && (
          <ul>
            {distances.map((provider, index) => (
              <li key={index}>
                {provider.name} - {provider.distance.toFixed(2)} km away
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NominatimGeocodeExample;
