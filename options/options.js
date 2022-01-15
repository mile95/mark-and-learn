var form = document.getElementById("configuration-form");

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

document.getElementById("save-btn").addEventListener(
  "click",
  function () {
    var form = document.getElementById("configuration-form");
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
    var p = document.createElement("P");
    p.innerHTML = "Configuration updated!";
    document.getElementById("form-container").appendChild(p);
  },
  false
);
