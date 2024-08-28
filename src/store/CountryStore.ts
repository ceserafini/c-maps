import { create } from 'zustand';
import { Country } from '../interfaces/types';
import { getCountryEmoji } from '../helpers';

interface StoreState {
  countries: Country[];
  filteredCountries: Country[];
  selectedCountry: Country | null;
  setSelectedCountry: (country: Country) => void;
  setCountries: (countries: Country[]) => void;
  filterCountries: (searchTerm: string) => void;
  combineCountriesWithLatLon: (data: Country[], latLonData: any[]) => void;
}

export const useCountryStore = create<StoreState>((set) => ({
  countries: [],
  filteredCountries: [],
  selectedCountry: null,
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setCountries: (countries) => set({ countries, filteredCountries: countries }),
  filterCountries: (searchTerm) =>
    set((state) => ({
      filteredCountries: state.countries.filter(
        (country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.continent.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    })),
  combineCountriesWithLatLon: (data, latLonData) => {
    const combined = data
      .map((country) => {
        const match = latLonData.find((c) => c['ISO Code'] === country.code);
        if (!match || match.Latitude === undefined || match.Longitude === undefined) return null;

        return {
          ...country,
          emoji: getCountryEmoji(country.code),
          latlng: {
            latitude: match.Latitude,
            longitude: match.Longitude,
          },
        };
      })
      .filter((country) => country !== null);

    set({ countries: combined, filteredCountries: combined });
  },
}));
