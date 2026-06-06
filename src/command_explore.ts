import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
  const locationArg = args[0] || "";
  if (!locationArg) {
    throw new Error("location required");
  }
  console.log(`Exploring ${locationArg}...`);
  const area = await state.pokeapi.fetchLocation(locationArg);
  console.log("Found Pokemon:");
  for (const encounter of area.pokemon_encounters) {
    console.log(` - ${encounter.pokemon.name}`);
  }
}
