import { createInterface } from "node:readline";
import { commandExit } from "./command_exit.js";
import type { CLICommand } from "./command.js";
import { commandHelp } from "./command_help.js";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Pokedex > ",
});

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(" ");
}

export function startREPL() {
  const commands = getCommands();
  rl.prompt();
  rl.on("line", (line) => {
    const args = cleanInput(line);
    if (!args) {
      rl.prompt();
    }
    const command = commands[args[0]];
    if (command === undefined) {
      console.log("Unknown command");
      rl.prompt();
    }
    command.callback(commands);
    rl.prompt();
  });
}

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
  };
}
