import { State } from "./pokeapi/state.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(" ");
}

export function startREPL(state: State) {
  state.readline.prompt();
  state.readline.on("line", async (line) => {
    const args = cleanInput(line);
    if (!args) {
      state.readline.prompt();
    }
    const [cmd, ...rest] = args;
    const command = state.commands[cmd];
    if (command === undefined) {
      console.log("Unknown command");
      state.readline.prompt();
      return;
    }
    try {
      await command.callback(state, ...rest);
    } catch (e) {
      console.error((e as Error).message);
    }
    state.readline.prompt();
  });
}
