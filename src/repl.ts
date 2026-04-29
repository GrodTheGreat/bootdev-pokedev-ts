import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(" ");
}

export function startREPL(state: State) {
  state.readline.prompt();
  state.readline.on("line", (line) => {
    const args = cleanInput(line);
    if (!args) {
      state.readline.prompt();
    }
    const command = state.commands[args[0]];
    if (command === undefined) {
      console.log("Unknown command");
      state.readline.prompt();
    }
    command.callback(state);
    state.readline.prompt();
  });
}
