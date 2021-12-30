chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "title": 'Add "%s" to the vocabulary',
        "contexts": ["selection"],
        "id": "myContextMenuId"
    });
});
    

var storage = chrome.storage.local;


storage.remove("words", function (){
           console.log("Words has been removed");
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	storage.get("words", function (items){        
		if(items.words != undefined) {
			console.log("Got word: " + info.selectionText);
			translate(info.selectionText);
	   		var updated_list = items.words.slice();
			updated_list.push(info.selectionText)
			storage.set({"words":updated_list}, function (){
           	console.log("Words has been updated");
       		});
    	}
    	else {
			console.log("Got word: " + info.selectionText);
			translate(info.selectionText);
			storage.set({"words":[info.selectionText]}, function (){
            console.log("Words has been initiated");
        	});
   		 }
	});
})

function translate(word) {
	fetch("https://api-free.deepl.com/v2/translate", {
  		body: "auth_key=d0477023-8452-ae5a-f7ba-bd904a015b6a:fx&text=" + word + "&target_lang=ES",
 		headers: {
   			 "Content-Type": "application/x-www-form-urlencoded"
 		},
  		method: "POST"
	})
	.then(response => response.json())
  	.then(data => console.log("Word translated to: " + data.translations[0].text));
}


