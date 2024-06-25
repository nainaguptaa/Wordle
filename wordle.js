let myword = {
  word: "",
  hint: "",
};

let word = "";

const darkModeButton = document.getElementById("dark_button");
darkModeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  darkModeButton.blur();
});


function darkMode() {
  const darkBtn = document.getElementById("dark_button");
  const hintBtn = document.getElementById("hint");
  const infoBtn = document.getElementById("info");
  const btext = document.getElementById("bottom");
  const bBorder = document.getElementById("bottomBorder");
  const text = document.getElementsByClassName("box");

  darkBtn.style.color = "white";
  hintBtn.style.color = "white";
  infoBtn.style.color = "white";
  btext.style.color = "white";
  bBorder.style.backgroundColor = "black";
  text.textContentContent = white;

  dark.classList.toggle("darkMode_");
  hint_button.classList.toggle("darkMode_");
  info_button.classList.toggle("darkMode_");
  body.classList.toggle("darkMode_");
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].classList.toggle("darkMode_");
  }
  body.classList.toggle("dark-mode");
  localStorage.setItem("isDarkMode", !isDarkMode);
}

window.onload = function() {
  const isDarkMode = localStorage.getItem("isDarkMode") === "true";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    darkMode();
  }
}





const hintButton = document.getElementById('hint');
const hintFooter = document.getElementById('hintFooter');

hintButton.addEventListener('click', () => {
  if (hintFooter.style.display === 'block') {
    hintFooter.style.display = 'none';
  } else {
    hintFooter.innerHTML = "<em>Hint:</em> " + state.hint;
    hintFooter.style.display = 'block';
    setTimeout(() => {
      hintFooter.style.display = 'none';
    }, 5000); 
  }
  hintButton.blur();
});






const infoBtn = document.getElementById('info');
const myFlexbox = document.getElementById('myFlexbox');
myFlexbox.style.display = 'none';

infoBtn.addEventListener('click', () => {
  myFlexbox.style.display = myFlexbox.style.display === 'none' ? 'flex' : 'none';
infoBtn.blur();
});



let checkWin=0;
function showWinScreen() {
  const winImage = document.createElement('img');
  winImage.src = 'https://res.cloudinary.com/mkf/image/upload/v1675467141/ENSF-381/labs/congrats_fkscna.gif';
  winImage.style.display = 'block';
  winImage.style.margin = 'auto';

  const gameBoard = document.getElementById('game');
  gameBoard.style.display = 'none';

  const winScreen = document.getElementById('winScreen');
  winScreen.appendChild(winImage);
  winScreen.style.display = 'block';
  checkWin=1;
}








const dictOfWords = async () => {
  const res = await fetch("https://api.masoudkf.com/v1/wordle", {
    headers: {
      "Content-type": "application/json",
      "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
    },
  });
  const json = await res.json();
  const { dictionary } = json;

  getWord = dictionary[Math.floor(Math.random() * dictionary.length)];
  myword.word = getWord.word.toUpperCase();
  myword.hint = getWord.hint;
  return getWord.word;
};

dictOfWords().then((word) => {
  state.getWord = word;
  state.hint = myword.hint;
  // console.log("first word");
  // console.log(state.getWord);
  // console.log(state.hint);
});

const state = {
  getWord: "",
  grid: Array(4)
    .fill()
    .map(() => Array(4).fill("")),
  currentRow: 0,
  currentCol: 0,
};

function updateGrid() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const box = document.getElementById(`box${i}${j}`);
      box.textContent = state.grid[i][j];
    }
  }
}






function drawBox(container, row, col, letter = "") {
  const box = document.createElement("div");
  box.className = "box";
  box.id = `box${row}${col}`;
  box.textContent = letter;

  container.appendChild(box);
  return box;
}

function drawGrid(container) {
  const grid = document.createElement("div");
  grid.className = "grid";

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      drawBox(grid, i, j);
    }
  }
  container.appendChild(grid);
}

function registerKeyboardEvents() {
  document.body.onkeydown = (e) => {
    const key = e.key;

    if (key == "Enter") {

      if (state.currentCol == 4) {
    
        const word = getCurrentWord().toUpperCase();
        revealWord(word);
       
        state.currentRow++;
        state.currentCol = 0;

      } else {
        alert("You must complete the word first");
      }
    }
    if (key == "Backspace") {
      removeLetter();
    }
    if (isLetter(key)) {
      addLetter(key);
    }
    updateGrid();
  };
}

function getCurrentWord() {
  return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function isWordValid(word) {
  console.log(state.dictOfWords.includes(word));

  return true;
}



function numberOfOccurrencesInGuess(word) {
  let number = 0;
  let letter;
  for (let i = 0; i < word.length; i++) {
    number = 0;
    let x = word[i];
    letter = x;
    for (let j = 0; j < word.length; j++) {
 
      if (x === word[j]) {
        number += 1;
      }
    }
    if (number > 1) {
      return [letter, number];
    }
  }
  return [letter, number];
}

function numberOfOccurencesInWord(letter) {
  let word = getWord.word.toUpperCase();

  let number = 0;
  for (let j = 0; j < word.length; j++) {
    // console.log("current letter: ", word[j]);
    if (letter === word[j]) {
      number += 1;
    }
  }
  return number;
}

function colourAssignerForMultipleOccurences(
  row,
  numOfTimesRepeating,
  theLetterRepeating
) {
  let counter = numOfTimesRepeating;
  // console.log("starting counter: ", counter);

  for (let i = 0; i < 4; i++) {
    const box = document.getElementById(`box${row}${i}`);
    const letter = box.textContent.toUpperCase();

    if (letter === theLetterRepeating) {
      if (letter == getWord.word[i].toUpperCase()) {
        if (counter > 0) {
          box.classList.add("right");
          counter += -1;
          // console.log("counter: ", counter);
        } else {
          box.classList.add("empty");
        }
      } else {
        box.classList.add("empty");
      }
    } else {
      if (letter == getWord.word[i].toUpperCase()) {
        box.classList.add("right");
      } else {
        box.classList.add("empty");
      }
    }
  }

  for (let i = 0; i < 4; i++) {
    const box = document.getElementById(`box${row}${i}`);
    const letter = box.textContent.toUpperCase();

    if (letter === theLetterRepeating) {
      if (getWord.word.toUpperCase().includes(letter)) {
        if (counter > 0) {
          box.classList.add("wrong");
          counter += -1;
          // console.log("counter: ", counter);
        } else {
          box.classList.add("empty");
        }
      } else {
        box.classList.add("empty");
      }
    } else {
      if (getWord.word.toUpperCase().includes(letter)) {
        box.classList.add("wrong");
      } else {
        box.classList.add("empty");
      }
    }
  }
}



let checkLose = 0;

function revealWord(guess) {

  const row = state.currentRow;
  // console.log(state.currentRow);
 

  let changeRevealMethod = false;




  let guessList = numberOfOccurrencesInGuess(guess);
  let letterRepeating = guessList[0];
  let numOfTimesRepeatingInGuess = guessList[1];
  let numOfTimesRepeatingInWord;
  // console.log("numoftimesinguess:", numOfTimesRepeatingInGuess);
  if (numOfTimesRepeatingInGuess > 1) {
    console.log("checking this letter:", letterRepeating);
    numOfTimesRepeatingInWord = numberOfOccurencesInWord(letterRepeating);
    // console.log("timesinword", numOfTimesRepeatingInWord);
    if (
      numOfTimesRepeatingInWord > 0 &&
      numOfTimesRepeatingInGuess > numOfTimesRepeatingInWord
    ) {
      changeRevealMethod = true;
    }
  }

  if (changeRevealMethod) {

    // console.log(letterRepeating, "repeats", numOfTimesRepeatingInWord, "times");
    colourAssignerForMultipleOccurences(
      row,
      numOfTimesRepeatingInWord,
      letterRepeating
    );
  } else {


    for (let i = 0; i < 4; i++) {
      const box = document.getElementById(`box${row}${i}`);
      const letter = box.textContent.toUpperCase();

      if (letter == getWord.word[i].toUpperCase()) {
       
        box.classList.add("right");
      } else if (getWord.word.toUpperCase().includes(letter)) {
        box.classList.add("wrong");
      } else {
        box.classList.add("empty");
      }
    }
  }

  if (getWord.word.toUpperCase() == guess.toUpperCase()) {
    
      showWinScreen();
      setTimeout(function () {
        let winMessage = `You guessed the word ${getWord.word.toUpperCase()} correctly!`;
        document.body.classList.add('show-winner');
        document.getElementById('winnerFooter').querySelector('p').textContent = winMessage;
      }, 100);
  } else if (state.currentRow == 3 && state.currentCol == 4) {
      checkLose = 1;
    setTimeout(function () {
      let message = `You missed the word ${getWord.word.toUpperCase()} and lost!`;
      document.body.classList.add('show-loser');
      document.getElementById('loserFooter').querySelector('p').textContent = message;
    }, 100);
  }
}




function isLetter(key) {
  return key.length == 1 && key.match(/[a-z]/i);
}

function addLetter(letter) {
  if (state.currentCol === 4) return;
  state.grid[state.currentRow][state.currentCol] = letter;
  state.currentCol++;
}

function removeLetter() {
  const row = state.currentRow;
  const col = state.currentCol - 1;
  if (col >= 0) {
    state.grid[row][col] = "";
    state.currentCol = col;
  }
}






const restartButton = document.getElementById("restart");





function Restart() {
  restartButton.blur();
  state.currentRow = 0;
  state.currentCol = 0;
  state.grid = Array(4)
    .fill()
    .map(() => Array(4).fill(""));

  if(checkWin==1 || checkLose ==1)
  {
    
    dictOfWords().then((word) => {
      state.getWord = word;
      state.hint = myword.hint;
      // console.log(state.getWord);
      // console.log(state.hint);
    })
    location.reload();
     
  }
  else{
    removeColour();
    updateGrid();
    document.getElementById('loserFooter').querySelector('p').textContent = "";
    document.getElementById('loserFooter').removeChild('loserFooter');
    document.getElementById('hintFooter').querySelector('p').textContent = "";


    var footer = document.getElementById('hintFooter');
    footer.removeChild(footer);

  }


  



}


function removeColour() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let box = document.getElementById(`box${i}${j}`);
      box.classList.remove("right");
      box.classList.remove("wrong");
      box.classList.remove("empty");
    }
  }
}






function startup() {
  const game = document.getElementById("game");
  drawGrid(game);

  registerKeyboardEvents();
}

startup();
