export type Continent = {
  code: string;
  name: string;
};

export interface Country {
  code: string;
  name: string;
  capital: string;
  continent: Continent;
  latlng: [number, number];
}

export type CountriesResponseDTO = {
  countries: Country[];
};
