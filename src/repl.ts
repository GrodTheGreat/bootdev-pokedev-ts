import { createInterface } from "node:readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Pokedex > ",
});

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(" ");
}

export function startREPL() {
  rl.prompt();
  rl.on("line", (line) => {
    const args = cleanInput(line);
    if (!args) {
      rl.prompt();
    }
    console.log(`Your command was: ${args[0]}`);
    rl.prompt();
  });
}
