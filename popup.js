chrome.storage.local.get("words", ({ words }) => {
  tableCreate(words);
});

function tableCreate(words) {
  const body = document.body,
        tbl = document.createElement('table');
  for (var i = 0; i < words.length; i++) {
	const tr = tbl.insertRow();
	const td = tr.insertCell();
	td.appendChild(document.createTextNode(words[i]));
  }
  body.appendChild(tbl)
}

