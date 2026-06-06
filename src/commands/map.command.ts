import { State } from "../pokeapi/state.js";

export async function commandMap(state: State) {
  const locations = await state.pokeapi.fetchLocations(state.nextLocationsURL);
  state.nextLocationsURL = locations.next || "";
  state.prevLocationsURL = locations.previous || "";
  for (const location of locations.results) {
    console.log(location.name);
  }
}

export async function commandMapb(state: State) {
  if (!state.prevLocationsURL) {
    throw new Error("you're on the first page");
  }
  const locations = await state.pokeapi.fetchLocations(
    state.prevLocationsURL || undefined,
  );
  state.nextLocationsURL = locations.next || "";
  state.prevLocationsURL = locations.previous || "";
  for (const location of locations.results) {
    console.log(location.name);
  }
}
