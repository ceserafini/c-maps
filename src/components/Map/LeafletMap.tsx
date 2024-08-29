import L from 'leaflet';
import WorldFlag from 'react-world-flags';

import ReactDOMServer from 'react-dom/server';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { AiFillEnvironment } from 'react-icons/ai';
import { useCountryStore } from '@/src/store/CountryStore';
import { FaCity, FaGlobeAmericas, FaLanguage, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons

import 'leaflet/dist/leaflet.css';
import MapViewUpdater from '../MapViewUpdater';

const LeafletMap: React.FC = () => {
  const { filteredCountries } = useCountryStore((state) => ({
    filteredCountries: state.filteredCountries,
  }));

  const verticalBounds = L.latLngBounds([
    [-85, -Infinity],
    [85, Infinity],
  ]);

  const CustomIcon = L.divIcon({
    html: `<div style="font-size: 24px; color: red;">${ReactDOMServer.renderToString(<AiFillEnvironment />)}</div>`,
    className: 'custom-marker-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

  return (
    <MapContainer
      center={[0, -60]}
      zoom={3}
      minZoom={2}
      maxZoom={18}
      style={{ height: '100vh', width: '100vw' }}
      maxBounds={verticalBounds}
      maxBoundsViscosity={1.0}
      worldCopyJump={true}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {filteredCountries.map((country) => (
        <Marker key={country.code} position={[country.latlng.latitude, country.latlng.longitude]} icon={CustomIcon}>
          <Popup>
            <div className="p-4 max-w-xs font-sans text-gray-800">
              <div className="flex items-center mb-4">
                <WorldFlag code={country.code} className="w-10 h-7 rounded mr-3" alt={`${country.name} flag`} />
                <div>
                  <b className="text-xl text-blue-800">{country.name}</b>
                  <div className="text-sm text-gray-500">({country.code})</div>
                </div>
              </div>
              <div className="text-sm space-y-2">
                <div className="flex items-center">
                  <FaCity className="text-blue-600 mr-2" />
                  <span className="font-bold">Capital:</span>
                  <span className="ml-2">{country.capital}</span>
                </div>
                <div className="flex items-center">
                  <FaGlobeAmericas className="text-green-600 mr-2" />
                  <span className="font-bold">Continent:</span>
                  <span className="ml-2">{country.continent.name}</span>
                </div>
                <div className="flex items-center">
                  <FaLanguage className="text-purple-600 mr-2" />
                  <span className="font-bold">Language:</span>
                  <span className="ml-2">{country.languages[0].name}</span>
                </div>
                <div className="mt-4 p-2 bg-gray-100 rounded-lg text-xs text-gray-600 shadow-inner flex items-center space-x-4">
                  <FaMapMarkerAlt className="text-red-500" />
                  <div>
                    <div>
                      <span className="font-bold">Latitude:</span> {country.latlng.latitude.toFixed(2)}
                    </div>
                    <div>
                      <span className="font-bold">Longitude:</span> {country.latlng.longitude.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
      <MapViewUpdater />
    </MapContainer>
  );
};

export default LeafletMap;
