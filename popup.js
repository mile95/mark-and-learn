chrome.storage.local.get("words", ({
    words
}) => {
    tableCreate(words);
});

document.getElementById("edit").addEventListener("click", function() {
     var tbl = document.getElementById("table");
	 var thead = document.getElementById("table-head");
	 thead.appendChild(document.createElement("th")).
 	 	appendChild(document.createTextNode("Edit"));
	 addRemoveButtons();
}, false);

function tableCreate(words) {
    const body = document.body
    const tbl = document.createElement('table');
	tbl.id = "table";

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

function addRemoveButtons() {
    [...document.querySelectorAll('#table tr')].forEach((row, i) => {
        var button = document.createElement("button")
        button.textContent = "REMOVE";
		button.onclick = function(){
    		row.className = "red-row";return false;
  		};
		const cell = document.createElement("td");
        cell.appendChild(button)
        row.appendChild(cell)
    });
}
