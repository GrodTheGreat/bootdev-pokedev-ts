import { createInterface, type Interface } from "node:readline";
import { PokeAPI, PokemonDetails } from "./pokeapi.js";
import { getCommands } from "./commands.js";

export type State = {
  pokeapi: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
  readline: Interface;
  commands: Record<string, CLICommand>;
  caughtPokemon: Record<string, PokemonDetails>;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  const commands = getCommands();
  return {
    pokeapi: new PokeAPI(),
    nextLocationsURL: "",
    prevLocationsURL: "",
    readline: rl,
    commands,
    caughtPokemon: {},
  };
}
