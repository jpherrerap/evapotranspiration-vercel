// hooks/useUserLocation.js
import { useEffect, useState } from 'react';

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (err) => {
          setError(err);
          console.error("Error getting user location:", err);
        }
      );
    } else {
      setError(new Error("Geolocation is not supported by this browser."));
    }
  }, []);

  return { userLocation, error };
};

export default useUserLocation;
