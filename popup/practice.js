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
      var inputBox = document.createElement("input");
      inputBox.setAttribute("type", "text");

      var elementToRemove = row.getElementsByTagName("td")[1];
      row.removeChild(elementToRemove);
      row.appendChild(inputBox);
    });
  },
  false
);
