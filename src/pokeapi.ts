import { Cache } from "./pokecache.js";
type ShallowLocation = {
  name: string;
  url: string;
};

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: ShallowLocation[];
};

export type LocationArea = {
  encounter_method_rates: EncounterMethodRate[];
  game_index: number;
  id: number;
  location: Location;
  name: string;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache = new Cache(60000);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || PokeAPI.baseURL + "/location-area";
    const entry = this.cache.get(url);
    if (entry) {
      return entry as ShallowLocations;
    }
    const response = await fetch(url);
    const locations: ShallowLocations = await response.json();
    this.cache.add(url, locations);
    return locations;
  }

  async fetchLocation(locationName: string): Promise<LocationArea> {
    const response = await fetch(
      PokeAPI.baseURL + "/location-area/" + locationName,
    );
    const location: LocationArea = await response.json();
    return location;
  }
}

type EncounterMethodRate = {
  encounter_method: EncounterMethod;
  version_details: EncounterRateVersionDetail[];
};

type EncounterMethod = {
  name: string;
  url: string;
};

type EncounterRateVersionDetail = {
  rate: number;
  version: Version;
};

type Version = {
  name: string;
  url: string;
};

type Location = {
  name: string;
  url: string;
};

type Name = {
  language: Language;
  name: string;
};

type Language = {
  name: string;
  url: string;
};

type PokemonEncounter = {
  pokemon: Pokemon;
  version_details: PokemonVersionDetail[];
};

type Pokemon = {
  name: string;
  url: string;
};

type PokemonVersionDetail = {
  encounter_details: EncounterDetail[];
  max_chance: number;
  version: Version;
};

type EncounterDetail = {
  chance: number;
  condition_values: any[];
  max_level: number;
  method: Method;
  min_level: number;
};

type Method = {
  name: string;
  url: string;
};
