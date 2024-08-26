export type Country = {
  code: string;
  name: string;
  continent: Continent;
};

export type Continent = {
  code: string;
  name: string;
};

export type CountriesResponseDTO = {
  countries: Country[];
};