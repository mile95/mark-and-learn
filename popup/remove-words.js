document.getElementById("remove-words").addEventListener(
  "click",
  function () {
    if (isAtLeastOneButtonAcitve()) {
      return;
    }
    var removeWordsBtn = document.getElementById("remove-words");
    removeWordsBtn.className = "active-btn";
    removeWordsBtn.disabled = true;
    var tbl = document.getElementById("table");
    var thead = document.getElementById("table-head");
    if (thead != null) {
      thead = document.createElement("thead");
      thead.id = "table-head";
    }
    thead
      .appendChild(document.createElement("th"))
      .appendChild(document.createTextNode("Remove"));
    var checkboxes = addCheckboxes();
    // Create save btn
    var saveButton = createSaveButtonForRemove(checkboxes, tbl);
    document.body.appendChild(saveButton);
  },
  false
);

function createSaveButtonForRemove(checkboxes, table) {
  var saveBtn = document.createElement("button");
  saveBtn.innerHTML = "Save";
  saveBtn.className = "save-btn";
  saveBtn.onclick = function () {
    var wordsToRemove = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        wordsToRemove.push(table.rows[i].cells[0].innerText);
      }
    }
    chrome.storage.local.get("words", function (items) {
      let words = items.words;
      wordsToRemove.forEach(
        (word) => delete words[word.toString().toLowerCase()]
      );
      chrome.storage.local.set(
        {
          words: words,
        },
        function () {
          createTable(words);
        }
      );
    });
    // Remove save btn after it is being clicked
    saveBtn.parentNode.removeChild(saveBtn);
    var removeWordsBtn = document.getElementById("remove-words");
    removeWordsBtn.className = "";
    removeWordsBtn.disabled = false;
    return false;
  };
  return saveBtn;
}
