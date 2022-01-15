chrome.storage.local.get("words", ({ words }) => {
  createTable(words);
});

chrome.storage.local.get("apikey", ({ apikey }) => {
  if (apikey === undefined || apikey === null) {
    var p = document.createElement("P");
    p.innerHTML =
      "Please configure the api-key before trying to translate words!";
    p.id = "warning-text";
    document.body.appendChild(p);
  }
});

document.getElementById("remove-words").addEventListener(
  "click",
  function () {
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
    var saveButton = createSaveButton(checkboxes, tbl);
    document.body.appendChild(saveButton);
  },
  false
);

function createSaveButton(checkboxes, table) {
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

function createTable(words) {
  // Would be better to just remove words in existing table than
  // destroy the old table and create the new one.
  var tbl = document.getElementById("table");
  if (tbl === null) {
    tbl = document.createElement("table");
    tbl.id = "table";
  } else {
    // Reset old table.
    tbl.innerHTML = "";
  }

  var thead = document.createElement("thead");
  thead.id = "table-head";
  tbl.appendChild(thead);
  chrome.storage.local.get("from", function (items) {
    if (items.from != undefined) {
      thead
        .appendChild(document.createElement("th"))
        .appendChild(document.createTextNode(items.from));
    } else {
      thead
        .appendChild(document.createElement("th"))
        .appendChild(document.createTextNode("English (default)"));
    }
  });
  chrome.storage.local.get("to", function (items) {
    if (items.to != undefined) {
      thead
        .appendChild(document.createElement("th"))
        .appendChild(document.createTextNode(items.to));
    } else {
      thead
        .appendChild(document.createElement("th"))
        .appendChild(document.createTextNode("Spanish (default)"));
    }
  });
  if (words != undefined || words != null) {
    Object.keys(words).forEach(function eachKey(key) {
      const tr = tbl.insertRow();
      const tdFrom = tr.insertCell();
      const tdTo = tr.insertCell();
      tdFrom.appendChild(document.createTextNode(capitalizeFirstLetter(key)));
      tdTo.appendChild(
        document.createTextNode(capitalizeFirstLetter(words[key]))
      );
    });
    document.body.appendChild(tbl);
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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
