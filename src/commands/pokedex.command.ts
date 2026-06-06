import { State } from "../pokeapi/state.js";

export async function commandPokedex(state: State) {
  console.log("Your Pokedex:");
  for (const pokemon of Object.keys(state.caughtPokemon))
    console.log(` - ${pokemon}`);
}
