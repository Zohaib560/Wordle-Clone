import wordBank from "./allowedWords.txt";
import answerWordBank from "./answerWords.txt";

export const emptyBoard = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
];

export const generateWordSet = async () => {
    let wordSet;
    let todaysWord;
    await fetch(wordBank)
      .then((response) => response.text())
      .then((result) => {
        const wordArr = result.split("\n");
        wordSet = new Set(wordArr);
      });
    await fetch(answerWordBank)
        .then((response) => response.text())
        .then((result) => {
        const wordArr = result.split("\r\n");
        wordSet = new Set([...wordSet, ...wordArr]);
        todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
    });
    return { wordSet, todaysWord };
  };