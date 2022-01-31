chrome.storage.local.get("words", ({ words }) => {
  createTable(words);
});

chrome.storage.local.get("apikey", ({ apikey }) => {
  if (!apikey) {
    var p = document.createElement("P");
    p.innerHTML =
      "Please configure the api-key before trying to translate words!";
    p.className = "warning-text";
    document.body.appendChild(p);
  }
});

function createTable(words) {
  // Would be better to just remove words in existing table than
  // destroy the old table and create the new one.
  var tbl = document.getElementById("table");
  if (tbl === null || tbl === undefined) {
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
  }
  document.body.appendChild(tbl);
}

function setSelectedValues(form) {
  // Set default from language
  chrome.storage.local.get("from", function (items) {
    if (items.from != undefined) {
      for (var i, j = 0; (i = form.elements[1].options[j]); j++) {
        if (i.value == items.from) {
          form.elements[1].selectedIndex = j;
          break;
        }
      }
    }
  });

  // Set default to language
  chrome.storage.local.get("to", function (items) {
    if (items.to != undefined) {
      for (var i, j = 0; (i = form.elements[2].options[j]); j++) {
        if (i.value == items.to) {
          form.elements[2].selectedIndex = j;
          break;
        }
      }
    }
  });

  // Set default API key
  chrome.storage.local.get("apikey", function (items) {
    if (items.apikey != undefined) {
      form.elements[0].defaultValue = items.apikey;
    }
  });
}

function isAtLeastOneButtonAcitve() {
  var removeWordsButton = document.getElementById("remove-words");
  var optionsButton = document.getElementById("options-button");
  var practiceButton = document.getElementById("practice-words");
  return (
    removeWordsButton.className === "active-btn" ||
    optionsButton.className === "active-btn" ||
    practiceButton.className === "active-btn"
  );
}

async function isAtleastOneWordStored() {
  var words = await chrome.storage.local.get("words");
  return !(
    words === undefined ||
    words === null ||
    Object.keys(words.words).length === 0
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
