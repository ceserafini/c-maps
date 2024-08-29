import { useCountryStore } from '@/src/store/CountryStore';
import { ChangeEvent, useState } from 'react';

function SearchPlace() {
  const { filteredCountries, filterCountries } = useCountryStore((state) => ({
    filteredCountries: state.filteredCountries,
    filterCountries: state.filterCountries,
  }));
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterCountries(value);
    setOpen(true);
  };

  const handleOptionClick = (countryName: string) => {
    setSearchTerm(countryName);
    filterCountries(countryName);
    setOpen(false);
  };

  return (
    <div className="w-[500px] fixed top-4 left-1/2 transform -translate-x-1/2 z-[1000]">
      <div className="relative">
        <input
          className="h-10 px-5 pr-10 w-full rounded-full text-sm focus:outline-none text-black border"
          id="search-place"
          type="search"
          name="search"
          placeholder="Search by name, region, or ISO code"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {open && searchTerm && filteredCountries.length > 0 && (
        <div className="absolute top-12 w-full bg-white rounded-xl shadow-lg p-2 max-h-60 overflow-y-auto text-black z-[1000]">
          {filteredCountries.map((country) => (
            <div key={country.code} className="cursor-pointer p-2 hover:bg-gray-100" onClick={() => handleOptionClick(country.name)}>
              {country.name} ({country.code}) {country.continent.name}
            </div>
          ))}
        </div>
      )}
      {searchTerm && filteredCountries.length === 0 && (
        <div className="absolute top-12 w-full bg-white rounded-xl shadow-lg p-2 text-black z-[1000]">
          <div className="p-2 text-gray-500">{`No results found for ${searchTerm}`}</div>
        </div>
      )}
    </div>
  );
}

export default SearchPlace;
