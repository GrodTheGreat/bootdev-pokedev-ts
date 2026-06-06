import { State } from "../pokeapi/state.js";

export async function commandCatch(state: State, ...args: string[]) {
  const pokemon = args[0] || "";
  if (!pokemon) {
    throw new Error("must provide pokemon");
  }
  console.log(`Throwing a Pokeball at ${pokemon}...`);
  const details = await state.pokeapi.fetchPokemon(pokemon);
  const result = Math.floor(Math.random() * details.base_experience);
  if (result > 40) {
    console.log(`${details.name} escaped!`);
    return;
  }
  console.log(`${details.name} was caught!`);
  console.log("You may now inspect it with the inspect command.");
  state.caughtPokemon[details.name] = details;
}
