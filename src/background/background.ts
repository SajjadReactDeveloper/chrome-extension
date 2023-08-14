chrome.runtime.onInstalled.addListener(() => {
    console.log('first install');
});

chrome.bookmarks.onCreated.addListener((id, bookmark) => {
    console.log('bookmark created', id, bookmark);
});

// background.js
// open chrome extension popup programmatically 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "open_popup") {
        // chrome.windows.create({
        //     url: chrome.runtime.getURL("popup.html"),
        //     type: "popup",
        //     height: 500,
        //     width: 500
        // });

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "check_image" }, function (response) {
                if (response.action === "open_popup") {
                    chrome.tabs.create({ url: chrome.runtime.getURL("popup.html") });
                }
            });
        });
    }
});


