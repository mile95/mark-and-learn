chrome.storage.local.get("words", ({
    words
}) => {
    tableCreate(words);
});

document.getElementById("remove-words").addEventListener("click", function() {
    var tbl = document.getElementById("table");
    var thead = document.getElementById("table-head");
    thead.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("Remove"));
    var checkboxes = addCheckboxes();
    var saveBtn = document.createElement("button");
    saveBtn.innerHTML = 'Save';
    saveBtn.className = "save-btn";
    saveBtn.onclick = function() {
        var wordsToRemove = [];
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                wordsToRemove.push(tbl.rows[i].cells[0].innerText);
            }
        }
        chrome.storage.local.get("words", function(items) {
            let words = items.words;
            wordsToRemove.forEach(word => delete words[word.toString().toLowerCase()]);
            chrome.storage.local.set({
                "words": words
            }, function() {
                tableCreate(words);
            });
        });
        // Remove save btn after it is being clicked
        saveBtn.parentNode.removeChild(saveBtn);
        return false;
    };
    document.body.appendChild(saveBtn);
}, false);

function tableCreate(words) {
    // Would be better to just remove words in existing table than
    // destroy the old table and create the new one.
    const body = document.body
    var tbl = document.getElementById('table');
    if (tbl === null) {
        tbl = document.createElement('table');
        tbl.id = "table";
    } else {
        // Reset old table.
        tbl.innerHTML = "";
    }

    var thead = document.createElement('thead');
    thead.id = "table-head";
    tbl.appendChild(thead);
    thead.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("English"));
    thead.appendChild(document.createElement("th")).
    appendChild(document.createTextNode("Spanish"));
    Object.keys(words)
        .forEach(function eachKek(key) {
            const tr = tbl.insertRow();
            const tdFrom = tr.insertCell();
            const tdTo = tr.insertCell();
            tdFrom.appendChild(document.createTextNode(capitalizeFirstLetter(key)));
            tdTo.appendChild(document.createTextNode(capitalizeFirstLetter(words[key])));
        });
    body.appendChild(tbl)
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addCheckboxes() {
    var checkboxes = [];
    [...document.querySelectorAll('#table tr')].forEach((row, i) => {
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        const cell = document.createElement("td");
        cell.appendChild(checkbox);
        checkboxes.push(checkbox);
        row.appendChild(cell);
    });
    return checkboxes;
}