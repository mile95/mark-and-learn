chrome.storage.local.get("words", ({ words }) => {
  tableCreate(words);
});

function tableCreate(words) {
  const body = document.body
  const tbl = document.createElement('table');
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

