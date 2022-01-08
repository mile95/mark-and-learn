var storage = chrome.storage.local;

chrome.runtime.onInstalled.addListener(function() {
    storage.get("apikey", function(items) {
		if (items.apikey != undefined) {
			chrome.contextMenus.create({
				"title": 'Translate and add "%s"',
				"contexts": ["selection"],
				"id": "myContextMenuId"
			});
		} else {
			chrome.contextMenus.create({
				"title": '[NO API-KEY SET] - Please configure extension',
				"contexts": ["selection"],
				"id": "myContextMenuId"
			});
		}
	});
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    translateAndStoreWord(info.selectionText);
})

async function translateAndStoreWord(word) {
    let fromLanguage = await storage.get("from");
    let toLanguage = await storage.get("to");
    let apiKey = await storage.get("apikey");
	if (fromLanguage === undefined) {
        fromLanguage = "EN";
    }
    if (toLanguage === undefined) {
        toLanguage = "ES";
    }
    let response = await fetch("https://api-free.deepl.com/v2/translate", {
        body: "auth_key=" + apiKey.apikey + "&text=" + word + "&target_lang=" + toLanguage.to + "&source_lang=" + fromLanguage.from,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    });
    let data = await response.json();
    storeWordAndTranslation(word, data.translations[0].text);
}

function storeWordAndTranslation(word, translation) {
    storage.get("words", function(items) {
        if (items.words != undefined) {
            let old_words = items.words;
            old_words[word.toLowerCase()] = translation
            storage.set({
                "words": old_words
            }, function() {
                console.log("Words has been updated")
            });
        } else {
            let words = {};
            words[word] = translation
            storage.set({
                "words": words
            }, function() {
                console.log("Words has been initiated");
            });
        }
    });
}
