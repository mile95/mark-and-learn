chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "title": 'Translate and add "%s"',
        "contexts": ["selection"],
        "id": "myContextMenuId"
    });
});


var storage = chrome.storage.local;

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    translateAndStoreWord(info.selectionText);
})

async function translateAndStoreWord(word) {
    let fromLanguage = await storage.get("from");
    let toLanguage = await storage.get("to");
    if (fromLanguage === undefined) {
        fromLanguage = "EN";
    }
    if (toLanguage === undefined) {
        toLanguage = "ES";
    }
    let response = await fetch("https://api-free.deepl.com/v2/translate", {
        body: "auth_key=d0477023-8452-ae5a-f7ba-bd904a015b6a:fx&text=" + word + "&target_lang=" + toLanguage.to + "&source_lang=" + fromLanguage.from,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    });
    let data = await response.json();
    console.log(data);
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