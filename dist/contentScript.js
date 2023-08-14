/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************************!*\
  !*** ./src/contentScript/contentScript.ts ***!
  \********************************************/
window.onload = function () {
    console.log('Script loaded');
};
// content.js
// open chrome extension popup programmatically
// content.js
// open chrome extension popup programmatically
chrome.runtime.sendMessage({ action: "open_popup" });
chrome.runtime.sendMessage(JSON.stringify({
    left: window.screenLeft + window.outerWidth,
    top: window.screenTop
}), (response) => { });
// content.js
// IF there is a image in the webpage, then open the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "check_image") {
        if (document.getElementsByTagName('img').length > 0) {
            sendResponse({ action: "open_popup" });
        }
    }
});
// content.js

/******/ })()
;
//# sourceMappingURL=contentScript.js.map