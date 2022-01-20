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

    var saveOptionsButton = createSaveButtonForOption();

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

function createSaveButtonForOption() {
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
  return saveOptionsButton;
}
