'use client';

import { ChangeEventHandler, useCallback, useState } from 'react';
import { queryCountriesByName } from '@/src/gql/queries';
import { useSuspenseQuery } from '@apollo/client';
import { CountriesResponseDTO } from '@/src/gql/types';
import LeafletMap from '../components/Map';
import SearchPlace from '../components/SearchPlace';

export default function Home() {
  const [name, setName] = useState('');
  const { data } = useSuspenseQuery<CountriesResponseDTO>(queryCountriesByName, { variables: { name } });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setName(event.target.value);
  }, []);

  return (
    <div>
      <SearchPlace onChange={handleChange} options={data.countries}/>
      <LeafletMap />
    </div>
  );
}
