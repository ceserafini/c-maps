export type Continent = {
  code: string;
  name: string;
};

export interface Country {
  code: string;
  name: string;
  capital: string;
  continent: Continent;
  latlng: {
    latitude: number;
    longitude: number;
  };
  emoji: string;
  emojiU: string;
  languages: {
    name: string;
  }[];
}

export interface LatLonData {
  Country: string;
  'ISO Code': string;
  Latitude: number;
  Longitude: number;
}

export type CountriesResponseDTO = {
  countries: Country[];
};
