import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';

import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { AiFillEnvironment } from 'react-icons/ai';
import { useCountryStore } from '@/src/store/CountryStore';

import 'leaflet/dist/leaflet.css';
import MapViewUpdater from '../MapViewUpdater';
import { emojiDisplay } from '@/src/helpers';

const LeafletMap: React.FC = () => {
  const { filteredCountries } = useCountryStore((state) => ({
    filteredCountries: state.filteredCountries,
  }));

  const CustomIcon = L.divIcon({
    html: `<div style="font-size: 24px; color: red;">${ReactDOMServer.renderToString(<AiFillEnvironment />)}</div>`,
    className: 'custom-marker-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

  return (
    <MapContainer center={[0, -60]} zoom={3} style={{ height: '100vh', width: '100vw' }}>
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {filteredCountries.map((country) => (
        <Marker key={country.code} position={[country.latlng.latitude, country.latlng.longitude]} icon={CustomIcon}>
          <Popup>
            <div style={{ fontSize: '2rem' }}>{emojiDisplay(country.emojiU)}</div>
            <b>{country.name}</b>
            <br />
            Code: {country.code}
            <br />
            Capital: {country.capital}
            <br />
            Continent: {country.continent.name}
            <br />
            Language: {country.languages[0].name}
            <br />
            Latitude: {country.latlng.latitude}
            <br />
            Longitude: {country.latlng.longitude}
          </Popup>
        </Marker>
      ))}
      <MapViewUpdater />
    </MapContainer>
  );
};

export default LeafletMap;
