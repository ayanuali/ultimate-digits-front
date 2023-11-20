import { findRepNumber } from "../findRepeatedNums";

export const generateDiamondNumbers = (number) => {
  //------------------------------------------Functions for all same or at least 9 same numbers---------------------------

  const randSingleDigit = findRepNumber(number)
    ? findRepNumber(number)
    : Math.floor(Math.random() * 9); // Generate a random digit (0 to 9)

  const allRepeatNumber = Array(10).fill(randSingleDigit).join(""); // Create a 10-digit number with all digits the same

  const nineRepeatNumberArray = Array(9).fill(randSingleDigit);

  nineRepeatNumberArray.splice(
    Math.floor(Math.random() * 9),
    0,
    Math.floor(Math.random() * 9)
  );
  const nineRepeatNumber = nineRepeatNumberArray.join("");

  //---------------- Functions for ascending and descending order digits----------------------------------

  // random digit from 0 to 109. 109 because it will be subtracted by 10 if digit is more than 9
  const randAscDigit = Math.floor(Math.random() * 110);
  // Create a 10-digit number in ascending order
  const ascendingSeqNumber = Array.from(Array(10))
    .map((e, i) =>
      i + randAscDigit > 9 ? i + randAscDigit - 10 : i + randAscDigit
    )
    .join("")
    .substring(0, 10); //if number more than 9, use only last digit. For ex: number is 12, use 2

  // random digit from 100 to 9
  const randDescDigit = Math.floor(Math.floor(Math.random() * (100 - 9)) + 9);
  //Create a 10-digit number in descending order
  const descendingSeqNumber = Array.from(Array(10))
    .map((e, i) => randDescDigit - i)
    .join("")
    .substring(0, 10);

  // --------------------------------------------------------------------------------------------------

  const similarNumbers = [];

  similarNumbers.push(
    allRepeatNumber,
    nineRepeatNumber,
    ascendingSeqNumber,
    descendingSeqNumber
  );

  return similarNumbers;
};
