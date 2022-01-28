document.getElementById("remove-words").addEventListener(
  "click",
  async function () {
   	if (isAtLeastOneButtonAcitve() || document.getElementById("warning-text")) {
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

function addCheckboxes() {
  var checkboxes = [];
  [...document.querySelectorAll("#table tr")].forEach((row, i) => {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const cell = document.createElement("td");
    cell.appendChild(checkbox);
    checkboxes.push(checkbox);
    row.appendChild(cell);
  });
  return checkboxes;
}
