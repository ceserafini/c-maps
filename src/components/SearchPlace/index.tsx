import { useCountryStore } from '@/src/store/CountryStore';
import { ChangeEvent, useState } from 'react';
import { AiOutlineGlobal, AiOutlineCloseCircle, AiOutlineSearch } from 'react-icons/ai'; // Import icons

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

  const handleClear = () => {
    setSearchTerm('');
    filterCountries('');
    setOpen(false);
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
          className="h-12 px-5 pr-10 w-full rounded-full text-sm focus:outline-none text-gray-700 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out shadow-sm"
          id="search-place"
          name="search"
          placeholder="Search by name, region, or ISO code"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          {searchTerm ? (
            <AiOutlineCloseCircle className="w-5 h-5 text-gray-500 cursor-pointer hover:text-red-500" onClick={handleClear} />
          ) : (
            <AiOutlineSearch className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </div>
      {open && searchTerm && filteredCountries.length > 0 && (
        <div className="absolute top-12 w-full bg-white rounded-xl shadow-lg p-2 max-h-60 overflow-y-auto text-gray-700 z-[1000] border border-gray-200">
          {filteredCountries.map((country) => (
            <div
              key={country.code}
              className="cursor-pointer p-2 hover:bg-blue-50 hover:text-blue-700 rounded transition-colors duration-200 ease-in-out flex items-center"
              onClick={() => handleOptionClick(country.name)}
            >
              <AiOutlineGlobal className="text-blue-500 mr-3" />
              <span className="font-semibold">{country.name}</span>
              <span className="text-sm text-gray-500 ml-2">({country.code})</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm text-gray-400">{country.continent.name}</span>
            </div>
          ))}
        </div>
      )}
      {searchTerm && filteredCountries.length === 0 && (
        <div className="absolute top-12 w-full bg-white rounded-xl shadow-lg p-2 text-gray-700 z-[1000] border border-gray-200">
          <div className="p-2 text-gray-500">{`No results found for "${searchTerm}"`}</div>
        </div>
      )}
    </div>
  );
}

export default SearchPlace;
