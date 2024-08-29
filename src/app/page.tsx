'use client';

import React, { useEffect, useState } from 'react';
import countriesLatLon from '../data/countries.json'; // Adjust the path as necessary
import { useSuspenseQuery } from '@apollo/client/react/hooks/useSuspenseQuery';
import { CountriesResponseDTO } from '../interfaces/types';
import { queryCountriesByName } from '../gql/queries';
import { useCountryStore } from '../store/CountryStore';
import SearchPlace from '../components/SearchPlace';
import LeafletMap from '../components/Map';
import Loader from '../components/Loader/Loader';
import Footer from '../components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);

  const { combineCountriesWithLatLon } = useCountryStore((state) => ({
    combineCountriesWithLatLon: state.combineCountriesWithLatLon,
  }));

  const { data, error } = useSuspenseQuery<CountriesResponseDTO>(queryCountriesByName, { variables: { name: '' } });

  useEffect(() => {
    if (data) {
      combineCountriesWithLatLon(data.countries, countriesLatLon);
      setLoading(false);
    }
  }, [data, combineCountriesWithLatLon, loading]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <SearchPlace />
          <LeafletMap />
        </>
      )}
      <Footer />
    </div>
  );
}
