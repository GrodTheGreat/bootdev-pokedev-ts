import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
  const name = args[0] || "";
  if (!name) {
    throw new Error("must provide name");
  }
  const pokemon = state.caughtPokemon[name];
  if (!pokemon) {
    throw new Error("you have not caught that pokemon");
  }
  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log("Stats:");
  for (const stat of pokemon.stats)
    console.log(`  - ${stat.stat.name}: ${stat.base_stat}`);
  console.log("Types:");
  for (const pokeType of pokemon.types)
    console.log(`  - ${pokeType.type.name}`);
}
