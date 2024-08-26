'use client';

import { ChangeEventHandler, useCallback, useState } from 'react';
import { queryCountriesByName } from '@/src/gql/queries';
import { useSuspenseQuery } from '@apollo/client';
import { CountriesResponseDTO } from '@/src/gql/types';

export default function Home() {
  const [name, setName] = useState('');
  const { data } = useSuspenseQuery<CountriesResponseDTO>(queryCountriesByName, { variables: { name } });

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setName(event.target.value);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>C-Maps</h1>
      <input type="text" onChange={handleChange} />
      <table>
        <thead>
          <th>Country Code</th>
          <th>Country Name</th>
          <th>Continent Code</th>
          <th>Continent Name</th>
        </thead>
        <tbody>
          {data.countries.map((country) => (
            <tr key={country.code}>
              <td>{country.code}</td>
              <td>{country.name}</td>
              <td>{country.continent.code}</td>
              <td>{country.continent.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
