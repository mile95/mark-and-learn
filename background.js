chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "title": 'Add "%s" to the vocabulary',
        "contexts": ["selection"],
        "id": "myContextMenuId"
    });
});
    

var storage = chrome.storage.local;

/*
storage.remove("words", function (){
           console.log("Words has been removed");
       });
*/
chrome.contextMenus.onClicked.addListener(function(info, tab) {
	storage.get("words", function (items){        
    	console.log(items)
		if(items.words != undefined) {
	   		var updated_list = items.words.slice();
			updated_list.push(info.selectionText)
      		storage.set({"words":updated_list}, function (){
           		console.log("Words has been updated");
       		});
    	}
    	else {
        	storage.set({"words":[info.selectionText]}, function (){
            	console.log("Words has been initiated");
        	});
   		 }
	});
})
