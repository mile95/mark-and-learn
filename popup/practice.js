document.getElementById("practice-words").addEventListener(
  "click",
  function () {
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
    var correctButton = createCorrectButtonForPractice();
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
    // Remove actions buttons
    var actionsContainer = document.getElementById("actions-container");
    actionsContainer.parentNode.removeChild(actionsContainer);
    var practiceWordsBtn = document.getElementById("practice-words");
    practiceWordsBtn.className = "";
    practiceWordsBtn.disabled = false;
    return false;
  };
  return resetButton;
}

function createCorrectButtonForPractice() {
  var correctBtn = document.createElement("button");
  correctBtn.innerHTML = "Correct";
  correctBtn.onclick = function () {
    [...document.querySelectorAll("#table tr")].forEach((row, i) => {
      var image = document.createElement("img");
      image.className = "icon-check";
      if (i === 0) {
        image.src = "../images/check.png";
      } else {
        image.src = "../images/close.png";
      }
      var actionsContainer = row.getElementsByTagName("div")[0];
      actionsContainer.appendChild(image);
    });

    // Remove actions buttons
    var actionsContainer = document.getElementById("actions-container");
    actionsContainer.parentNode.removeChild(actionsContainer);
    var practiceWordsBtn = document.getElementById("practice-words");
    practiceWordsBtn.className = "";
    practiceWordsBtn.disabled = false;
    return false;
  };
  return correctBtn;
}
