import L from 'leaflet';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useCountryStore } from '@/src/store/CountryStore';

const MapViewUpdater: React.FC = () => {
  const map = useMap();
  const { filteredCountries } = useCountryStore((state) => ({
    filteredCountries: state.filteredCountries,
  }));

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      map.setView([country.latlng.latitude, country.latlng.longitude], 4);
    } else if (filteredCountries.length > 1) {
      const bounds = L.latLngBounds(filteredCountries.map((country) => [country.latlng.latitude, country.latlng.longitude]));
      map.fitBounds(bounds);
    }
  }, [filteredCountries, map]);

  return null;
};

export default MapViewUpdater;
