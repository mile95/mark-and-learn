document.getElementById("practice-words").addEventListener(
  "click",
  async function () {
    if (isAtLeastOneButtonAcitve()) {
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
    actionsContainer.appendChild(correctButton);
    actionsContainer.appendChild(resetButton);
    document.body.appendChild(actionsContainer);
  },
  false
);

function createResetButtonForPractice() {
  var resetButton = document.createElement("button");
  resetButton.innerHTML = "Reset";
  resetButton.onclick = function () {
     [...document.querySelectorAll("#table tr")].forEach(async (row, i) => {
      var actionsContainer = row.getElementsByTagName("div")[0];
	  var image = row.getElementsByTagName("img")[0];
      var inputText = row.getElementsByTagName("input")[0];
	  inputText.value = "";
	  image.parentNode.removeChild(image);
    });
	// Remove actions buttons
    var practiceWordsBtn = document.getElementById("practice-words");
    practiceWordsBtn.className = "";
    practiceWordsBtn.disabled = false;
    return false;
  };
  return resetButton;
}

async function createCorrectButtonForPractice() {
  var correctBtn = document.createElement("button");
  correctBtn.innerHTML = "Correct";
  correctBtn.onclick = await function () {
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

    // Remove actions buttons
    var practiceWordsBtn = document.getElementById("practice-words");
    practiceWordsBtn.className = "";
    practiceWordsBtn.disabled = false;
    return false;
  };
  return correctBtn;
}

async function checkGuess(word, guess) {
  var words = await chrome.storage.local.get("words");
  var translation = words.words[word.toLowerCase()];
  return (
    new String(translation.toLowerCase()).valueOf() ==
    new String(guess.toLowerCase()).valueOf()
  );
}
