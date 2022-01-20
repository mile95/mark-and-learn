const languages = [
  "BG - Bulgarian",
  "CS - Czech",
  "DA - Danish",
  "DE - German",
  "EN - English",
  "ES - Spanish",
  "ET - Estonian",
  "HU - Hungarian",
  "IT - Italian",
  "EL - Greek",
  "FI - Finnish",
  "FR - French",
  "JA - Japanese",
  "LT - Lithuanian",
  "LV - Latvian",
  "NL - Dutch",
  "PL - Polish",
  "PT - Portuguese",
  "PT - Polish",
  "RO - Romanian",
  "RU - Russian",
  "SK - Slovak",
  "SL - Slovenian",
  "SV - Swedish",
  "ZH - Chinese",
];

chrome.storage.local.get("words", ({ words }) => {
  createTable(words);
});

chrome.storage.local.get("apikey", ({ apikey }) => {
  if (!apikey) {
    var p = document.createElement("P");
    p.innerHTML =
      "Please configure the api-key before trying to translate words!";
    p.id = "warning-text";
    document.body.appendChild(p);
  }
});

document.getElementById("options-button").addEventListener(
  "click",
  function () {
    if (isAtLeastOneButtonAcitve()) {
      return;
    }
    var optionsButton = document.getElementById("options-button");
    optionsButton.className = "active-btn";
    optionsButton.disabled = true;

    var optionsFormDiv = document.createElement("div");
    optionsFormDiv.id = "options-form-div";
    var form = document.createElement("form");
    form.id = "form";

    var apiKeyInput = document.createElement("input");
    var apiKeyLabel = document.createElement("Label");
    apiKeyInput.type = "text";
    apiKeyInput.name = "api key";
    apiKeyInput.id = "api-key-input";
    apiKeyLabel.htmlFor = "api-key-input";
    apiKeyLabel.innerHTML = "Deepl api key ";

    var optionsFormLanguageDiv = document.createElement("div");
    optionsFormLanguageDiv.id = "options-form-language-div";

    var fromLanguageSelect = document.createElement("select");
    var fromLanguageLabel = document.createElement("Label");
    fromLanguageSelect.name = "from-language";
    fromLanguageSelect.id = "from-language";
    fromLanguageLabel.innerHTML = "Translate from ";

    var toLanguageSelect = document.createElement("select");
    var toLanguageLabel = document.createElement("Label");
    toLanguageSelect.name = "to-language";
    toLanguageSelect.id = "to-language";
    toLanguageLabel.innerHTML = " to ";

    for (const language of languages) {
      var optionFrom = document.createElement("option");
      var optionTo = document.createElement("option");
      optionFrom.value = language.split(" - ")[0];
      optionTo.value = language.split(" - ")[0];
      optionFrom.innerHTML = language.split(" - ")[1];
      optionTo.innerHTML = language.split(" - ")[1];
      fromLanguageSelect.appendChild(optionFrom);
      toLanguageSelect.appendChild(optionTo);
    }

    var saveOptionsButton = document.createElement("Button");
    saveOptionsButton.id = "save-options-button";
    saveOptionsButton.innerHTML = "Save";
    saveOptionsButton.className = "save-btn";
    saveOptionsButton.addEventListener(
      "click",
      function () {
        var form = document.getElementById("form");
        chrome.storage.local.set(
          {
            apikey: form.elements[0].value,
            from: form.elements[1].value,
            to: form.elements[2].value,
          },
          function () {
            console.log("apikey, from and to updated");
          }
        );
        var optionsDiv = document.getElementById("options-form-div");
        document.body.removeChild(optionsDiv);
        var optionsBtn = document.getElementById("options-button");
        optionsBtn.className = "";
        optionsBtn.disabled = false;

        chrome.storage.local.get("apikey", ({ apikey }) => {
          if (apikey === undefined || apikey === null || apikey === "") {
            return;
          } else {
            var warningText = document.getElementById("warning-text");
            if (warningText != undefined) {
              document.body.removeChild(warningText);
            }
            chrome.storage.local.get("words", ({ words }) => {
              createTable(words);
            });
          }
        });
      },
      false
    );

    optionsFormLanguageDiv.appendChild(fromLanguageLabel);
    optionsFormLanguageDiv.appendChild(fromLanguageSelect);
    optionsFormLanguageDiv.appendChild(toLanguageLabel);
    optionsFormLanguageDiv.appendChild(toLanguageSelect);

    form.appendChild(apiKeyLabel);
    form.appendChild(apiKeyInput);
    form.appendChild(optionsFormLanguageDiv);
    optionsFormDiv.appendChild(form);
    optionsFormDiv.appendChild(saveOptionsButton);
    document.body.insertBefore(
      optionsFormDiv,
      document.getElementById("table")
    );
    setSelectedValues(form);
  },
  false
);

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
    practiceButton.calassName === "active-btn"
  );
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
