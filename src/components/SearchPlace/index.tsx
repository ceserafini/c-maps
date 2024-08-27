import { ChangeEvent, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export type SearchParams = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'type' | 'placeholder' | 'id' | 'capture'> & {
  options: never[];
};

function SearchPlace({ options, ...rest }: SearchParams) {
  const [activeSearch, setActiveSearch] = useState([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value == '') {
      setActiveSearch([]);
      return false;
    }
    setActiveSearch(options.filter((w: string) => w.includes(e.target.value)).slice(0, 8));
  };

  return (
    <form className="w-[500px] relative">
      <div className="relative">
        <input
          className="h-10 px-5 pr-10 w-full rounded-full text-sm focus:outline-none text-black border"
          id="search-place"
          type="search"
          name="search"
          placeholder="Search on C Maps"
          onChange={(event) => handleSearch(event)}
          {...rest}
        />
        <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 rounded-full">
          <AiOutlineSearch color="blue" />
        </button>
      </div>
      {activeSearch.length > 0 && (
        <div className="absolute top-20 p-4 w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
          {activeSearch.map((s) => (
            <>{s}</>
          ))}
        </div>
      )}
    </form>
  );
}

export default SearchPlace;
