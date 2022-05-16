/*
 You find a strange mirror that always shows a hand that is moving. The hand appears to be alive,
 and after a lot of questions of "yes" and "no" answer, you know that the hand is trying to teach
 you a program that is written in HPL (Hand Programming Language).

NOTES:
As memory cells are bytes, from 0 to 255 value, if you decrease 0 you'll get 255, if you increment 255 you'll get 0.
Loops of 🤜 and 🤛 can be nested.

This language works with a memory of an indefinite size of bytes, with all values initialized to 0. This language haves 7 instructions:
 * 👉 : moves the memory pointer to the next cell
 * 👈 : moves the memory pointer to the previous cell
 * 👆 : increment the memory cell at the current position
 * 👇 : decreases the memory cell at the current position.
 * 🤜 : if the memory cell at the current position is 0, jump just after the corresponding 🤛
 * 🤛 : if the memory cell at the current position is not 0, jump just after the corresponding 🤜
 * 👊 : Display the current character represented by the ASCII code defined by the current position.*/

const MIN_CELL = 0;
const MAX_CELL = 255;

// Findind previous index in nested fists [🤜🤜🤛🤛]
const getNextFistIndex = (index, instructions) => {
  let fist = 1;
  for (i = index + 1; i < instructions.length; i++) {
    if (instructions[i] === "🤜") fist++;
    if (instructions[i] === "🤛") fist--;
    if (fist === 0) return i;
  }
};

// Findind next index in nested fists [🤜🤜🤛🤛]
const getPrevFistIndex = (index, instructions) => {
  let fist = 1;
  for (i = index - 1; i >= 0; i--) {
    if (instructions[i] === "🤜") fist--;
    if (instructions[i] === "🤛") fist++;
    if (fist === 0) return i;
  }
};

const clamp = (pointer) => {
  if (pointer < MIN_CELL) return MAX_CELL;
  if (pointer > MAX_CELL) return MIN_CELL;
  return pointer;
};

const translate = (string) => {
  const memory = [0];
  let pointer = 0;
  let index = 0;
  let output = "";

  const arrayOfInstructions = Array.from(string);

  const actions = {
    "👉": () => {
      // incrementing pointer
      pointer++;
      // if memory cell is not valid, set it to 0
      memory[pointer] ??= 0;
    },
    "👈": () => {
      // decreasing pointer
      pointer--;
      // if memory cell is not valid, set it to 0
      memory[pointer] ??= 0;
    },
    "👆": () => {
      memory[pointer] = clamp(memory[pointer] + 1);
    },
    "👇": () => {
      memory[pointer] = clamp(memory[pointer] - 1);
    },
    "🤜": () => {
      if (memory[pointer] === 0) {
        index = getNextFistIndex(index, arrayOfInstructions);
      }
    },
    "🤛": () => {
      if (memory[pointer] !== 0) {
        index = getPrevFistIndex(index, arrayOfInstructions);
      }
    },
    "👊": () => (output += String.fromCharCode(memory[pointer])),
  };

  while (index < arrayOfInstructions.length) {
    const action = arrayOfInstructions[index];
    actions[action]();
    let value = String(memory[pointer]);
    // console.log({ action, index, value, output });
    index++;
  }

  return output;
};

module.exports = translate;
