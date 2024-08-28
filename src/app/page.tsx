'use client';

import React, { useEffect } from 'react';
import countriesLatLon from '../data/countries.json'; // Adjust the path as necessary
import { useSuspenseQuery } from '@apollo/client/react/hooks/useSuspenseQuery';
import { CountriesResponseDTO } from '../interfaces/types';
import { queryCountriesByName } from '../gql/queries';
import { useCountryStore } from '../store/CountryStore';
import SearchPlace from '../components/SearchPlace';
import LeafletMap from '../components/Map';

export default function Home() {
  const { combineCountriesWithLatLon } = useCountryStore((state) => ({
    combineCountriesWithLatLon: state.combineCountriesWithLatLon,
  }));

  const { data, error } = useSuspenseQuery<CountriesResponseDTO>(queryCountriesByName, { variables: { name: '' } });

  useEffect(() => {
    if (data) {
      combineCountriesWithLatLon(data.countries, countriesLatLon);
    }
  }, [data, combineCountriesWithLatLon]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <SearchPlace />
      <LeafletMap />
    </div>
  );
}
