chrome.storage.local.get("words", ({
    words
}) => {
    tableCreate(words);
});

function tableCreate(words) {
    const body = document.body
    const tbl = document.createElement('table');
    tbl.id = "words";

    const header = tbl.createTHead();
    const headerRow = header.insertRow(0);
    const headerCellFrom = headerRow.insertCell(0);
    const headerCellTo = headerRow.insertCell(1);
    headerCellFrom.appendChild(document.createTextNode("English"));
    headerCellTo.appendChild(document.createTextNode("Spanish"));
    Object.keys(words)
        .forEach(function eachKek(key) {
            const tr = tbl.insertRow();
            const tdFrom = tr.insertCell();
            const tdTo = tr.insertCell();
            tdFrom.appendChild(document.createTextNode(key));
            tdTo.appendChild(document.createTextNode(words[key]));
        });
    body.appendChild(tbl)
}