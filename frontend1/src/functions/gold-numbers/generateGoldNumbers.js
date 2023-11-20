import { findRepNumber } from "../findRepeatedNums";

export const generateGoldNumbers = (number) => {
  //------------------------------------------Functions for all same or at least 9 same numbers---------------------------

  //generate rand number, except some number
  function randomExcluded(excluded) {
    var n = Math.floor(Math.random() * 9);
    if (n >= excluded) n++;
    return n;
}

  const randSingleDigit = findRepNumber(number)
    ? findRepNumber(number)
    : Math.floor(Math.random() * 9); // Generate a random digit (0 to 9)

  const eightRepeatNumberArray = Array(8).fill(randSingleDigit);
  const sevenRepeatNumberArray = Array(7).fill(randSingleDigit);
  const sixRepeatNumberArray = Array(6).fill(randSingleDigit);

  for (let i = 0; i < 2; i++) {
    eightRepeatNumberArray.splice(
        Math.floor(Math.random() * 9),
        0,
        randomExcluded(randSingleDigit)
      );
  }

  const eightRepeatNumber = eightRepeatNumberArray.join("");

  for (let i = 0; i < 3; i++) {
    sevenRepeatNumberArray.splice(
      Math.floor(Math.random() * 9),
      0,
      randomExcluded(randSingleDigit)
    );
  }

  const sevenRepeatNumber = sevenRepeatNumberArray.join("");

  for (let i = 0; i < 4; i++) {
    sixRepeatNumberArray.splice(
      Math.floor(Math.random() * 9),
      0,
      Math.floor(Math.random() * 9)
    );
  }

  const sixRepeatNumber = sixRepeatNumberArray.join("");

  const similarNumbers = [];

  similarNumbers.push(eightRepeatNumber, sevenRepeatNumber, sixRepeatNumber);

  return similarNumbers;
};
