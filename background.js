chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "linkClicked") {
    incrementLinkCount(request.url, sendUpdateMessage);
  } else if (request.message === "getClickCounts") {
    sendUpdateMessage();
  }
});

function incrementLinkCount(url, callback) {
  chrome.storage.local.get("clickedLinks", function (result) {
    const clickedLinks = result.clickedLinks || {};
    clickedLinks[url] = (clickedLinks[url] || 0) + 1;
    chrome.storage.local.set({ clickedLinks }, callback);
  });
}

function sendUpdateMessage() {
  chrome.storage.local.get("clickedLinks", function (result) {
    const clickedLinks = result.clickedLinks || {};
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTabId = tabs[0].id;
      chrome.tabs.sendMessage(activeTabId, { message: "updatePopup", clickedLinks });
    });
  });
}
