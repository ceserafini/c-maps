import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { useSuspenseQuery } from '@apollo/client/react/hooks/useSuspenseQuery';
import { CountriesResponseDTO } from '@/src/gql/types';
import { queryCountriesByName } from '@/src/gql/queries';
import { AiFillEnvironment } from 'react-icons/ai';
import countriesLatLon from '../../data/countries.json';

import 'leaflet/dist/leaflet.css';

const CustomIcon = L.divIcon({
  html: `<div style="font-size: 24px; color: red;">${ReactDOMServer.renderToString(<AiFillEnvironment />)}</div>`,
  className: 'custom-marker-icon', // Add any additional classes you need
  iconSize: [24, 24], // Adjust the size based on the icon you are using
  iconAnchor: [12, 24], // Adjust the anchor so the icon points correctly
});

function Map() {
  const [combinedData, setCombinedData] = useState([]);
  const { data, error } = useSuspenseQuery<CountriesResponseDTO>(queryCountriesByName, { variables: { name } });

  useEffect(() => {
    if (data) {
      // Combine data from GraphQL API with JSON file based on ISO code
      const combined = data.countries.map((country) => {
        const latLonData = countriesLatLon.find((c) => c['ISO Code'] === country.code);
        return {
          ...country,
          latitude: latLonData?.Latitude,
          longitude: latLonData?.Longitude,
        };
      });
      setCombinedData(combined);
    }
  }, [data]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <MapContainer center={[0, -60]} zoom={3} style={{ height: '100vh', width: '100vw' }}>
      <TileLayer
        maxZoom={19}
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {combinedData.map((country) => {
        const { name, capital, continent, latitude, longitude } = country;

        if (latitude && longitude) {
          return (
            <Marker key={country.code} position={[latitude, longitude]} icon={CustomIcon}>
              <Popup>
                <b>{name}</b>
                <br />
                Capital: {capital}
                <br />
                Continent: {continent.name}
                <br />
                Latitude: {latitude}
                <br />
                Longitude: {longitude}
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  );
}

export default Map;
