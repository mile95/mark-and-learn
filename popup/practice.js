document.getElementById("practice-words").addEventListener(
  "click",
  async function () {
    if (isAtLeastOneButtonAcitve(  || document.getElementById("warning-text")) {
      return;
    }	
	var atLeastOneWordStored = await isAtleastOneWordStored();
	if (!atLeastOneWordStored) {
  		var text = document.createElement("p");
		text.innerHTML = "Please add a few words first!";
		text.className = "warning-text";
		text.id = "warning-text";
		document.body.appendChild(text);
		return;
	}

    var practiceWordsBtn = document.getElementById("practice-words");
    practiceWordsBtn.className = "active-btn";
    practiceWordsBtn.disabled = true;
    var tbl = document.getElementById("table");
    [...document.querySelectorAll("#table tr")].forEach((row, i) => {
      var inputContainer = document.createElement("div");
      inputContainer.className = "input-container";
      var inputBox = document.createElement("input");
      inputBox.setAttribute("type", "text");
      inputBox.className = "practice-input-box";
      inputContainer.appendChild(inputBox);

      var elementToRemove = row.getElementsByTagName("td")[1];
      row.removeChild(elementToRemove);
      row.appendChild(inputContainer);
    });
    var actionsContainer = document.createElement("div");
    actionsContainer.id = "actions-container";
    var correctButton = await createCorrectButtonForPractice();
    var resetButton = createResetButtonForPractice();
    var exitButton = createExitPracticeButton();
    actionsContainer.appendChild(correctButton);
    actionsContainer.appendChild(resetButton);
    actionsContainer.appendChild(exitButton);
    document.body.appendChild(actionsContainer);
  },
  false
);

function createResetButtonForPractice() {
  var resetButton = document.createElement("button");
  resetButton.innerHTML = "Reset";
  resetButton.onclick = function () {
    // Reset the correct button.
    var correctBtn = document.getElementById("correct-button");
    correctBtn.className = "";
    correctBtn.disabled = false;
    [...document.querySelectorAll("#table tr")].forEach(async (row, i) => {
      var actionsContainer = row.getElementsByTagName("div")[0];
      var image = row.getElementsByTagName("img")[0];
      var inputText = row.getElementsByTagName("input")[0];

      if (inputText != undefined || inputText != null) {
        inputText.value = "";
      }
      if (image != undefined || image != null) {
        image.parentNode.removeChild(image);
      }
    });
    return false;
  };
  return resetButton;
}

async function createCorrectButtonForPractice() {
  var correctBtn = document.createElement("button");
  correctBtn.id = "correct-button";
  correctBtn.innerHTML = "Correct";
  correctBtn.onclick = await function () {
    // Disable the correct btn, need to reset before clicking again.
    var correctBtn = document.getElementById("correct-button");
    correctBtn.className = "active-btn";
    correctBtn.disabled = true;
    [...document.querySelectorAll("#table tr")].forEach(async (row, i) => {
      var actionsContainer = row.getElementsByTagName("div")[0];
      var guess = actionsContainer.getElementsByTagName("input")[0].value;
      var word = row.getElementsByTagName("td")[0].innerText;
      var guessCorrect = await checkGuess(word, guess);

      var image = document.createElement("img");
      image.className = "icon-check";
      if (guessCorrect) {
        image.src = "../images/check.png";
      } else {
        image.src = "../images/close.png";
      }
      actionsContainer.appendChild(image);
    });

    return false;
  };
  return correctBtn;
}

function createExitPracticeButton() {
  var exitButton = document.createElement("button");
  exitButton.id = "exit-button";
  exitButton.innerHTML = "Exit";
  exitButton.onclick = function () {
    var actionContainer = document.getElementById("actions-container");
    actionContainer.parentNode.removeChild(actionContainer);
    chrome.storage.local.get("words", ({ words }) => {
      createTable(words);
    });
    var practiceWordsBtn = document.getElementById("practice-words");
    practiceWordsBtn.className = "";
    practiceWordsBtn.disabled = false;
  };
  return exitButton;
}

async function checkGuess(word, guess) {
  var words = await chrome.storage.local.get("words");
  var translation = words.words[word.toLowerCase()];
  return (
    new String(translation.toLowerCase()).valueOf() ==
    new String(guess.toLowerCase()).valueOf()
  );
}
