// Word Guess Game (word bank can be modified without breaking functions)
var wordBank = ["basketball", "crossover", "dribble", "backboard", "assist", "dunk", "layup", "jumpshot", "foul"];
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var hangmanImagesArray = [
  'assets/images/hangman-images/hangman-0.png' ,
  'assets/images/hangman-images/hangman-1.png' ,
  'assets/images/hangman-images/hangman-2.png' ,
  'assets/images/hangman-images/hangman-3.png' ,
  'assets/images/hangman-images/hangman-4.png' ,
  'assets/images/hangman-images/hangman-5.png' ,
  'assets/images/hangman-images/hangman-initial.png' ,
];
var guess;
var alreadyGuessed = [];
var guessesRem = 6;
var wins = 0;
var currentWord = wordBank[wins];
var currentWordText = [];
var captionText = "";

// generate full amswer ley answer key
// function genAnswerKey() {
//   for (var i=0; i<wordBank.length; i++) {
//     var newAnswer = document.createElement("div");
//     newAnswer.className = "dropdown-item";
//     newAnswer.innerHTML = wordBank[i];
//     document.getElementById("answerKey").appendChild(newAnswer);
//   }
// }

// generate current answer key

function genAnswerKey() {
    document.getElementById("dropdown-item").innerHTML = currentWord;
}

// display output function
function writeDisplay() {
  document.getElementById("caption-text").innerHTML = captionText;
  document.getElementById("wins-text").innerHTML = "Wins: " + wins;
  document.getElementById("currentWord-text").innerHTML = currentWordText.join(" ");
  document.getElementById("guessesRem-text").innerHTML = guessesRem;
  document.getElementById("alreadyGuessed-text").innerHTML = alreadyGuessed.join(" ");
  document.getElementById("hangman-image").src = hangmanImagesArray[guessesRem];
}

// resets currentWordText array with _'s
function reset() {
  currentWordText = [];
  for (var i = 0; i < currentWord.length; i++) {
  currentWordText.push("_");
  }
}

//function triggered on keyup
function keyPress() {
  guess = event.key.toLowerCase();
  //initial check for: 1. if user guess is a viable character 2. there are guesses remaining 3. captionText is empty (otherwise, user would still be able to input guesses during victory/loss caption)
  if (alphabet.indexOf(guess) > -1 && guessesRem != 0 && captionText === "") {
    // loops a condition to check if user's guess exists in the current word, and if so, reveals the letter(s) in the DOM
    for (var i=0; i < currentWord.length; i++) {
      if (guess === currentWord[i]) {
        currentWordText[i] = guess;
      }
    }
    // pushes user guess to alreadyGuessed if user guess does not exist in either currentWord or alreadyGuessed
    if (currentWord.indexOf(guess) == -1 && alreadyGuessed.indexOf(guess) === -1) {
        alreadyGuessed.push(guess);
        guessesRem --;
    }
    writeDisplay();
    // win condition: if there are no longer any _'s in currentWordText
    if (currentWordText.indexOf("_") === -1) {
      captionText = "Good job! Now try this one.";
      document.getElementById("caption-text").style.color = "#007bff";
      document.getElementById("caption-text").innerHTML = captionText;
      document.getElementById("victory-audio").play();
      setTimeout(function(){
        wins ++;
        currentWord = wordBank[wins];
        guessesRem = 6;
        alreadyGuessed = [];
        captionText = "";
        reset();
        writeDisplay();
        genAnswerKey();
      }, 2500)
    }
  }
  // lose condition (no more guesses)
  if (guessesRem === 0) {
      captionText = "No more guesses. Try again.";
      document.getElementById("caption-text").style.color = "red";
      document.getElementById("caption-text").innerHTML = captionText;
      document.getElementById("loss-audio").play();
      setTimeout(function(){
        guessesRem = 6;
        alreadyGuessed = [];
        captionText = "";
        reset();
        writeDisplay();
        genAnswerKey();

      }, 2500)
  }
}
// additional feature that allowes user to submit a word to play (working as intended, however typing into form wil trigger the active eventlistener for keyup)

// document.getElementById("submitButton").addEventListener("click", userAddWord);
// function userAddWord() {
//   wordBank.unshift(document.getElementById("userWord").value);
//   currentWord = wordBank[0];
//   document.getElementById("userForm").reset();
//   gussesRem = 6;
//   alreadyGuessed = [];
//   captionText = "";
//   reset();
//   writeDisplay();
// }
genAnswerKey();
reset();
document.addEventListener("keyup", keyPress);
