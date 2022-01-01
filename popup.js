chrome.storage.local.get("words", ({
    words
}) => {
    tableCreate(words);
});

function tableCreate(words) {
    const body = document.body
    const tbl = document.createElement('table');

    var thead = document.createElement('thead');
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