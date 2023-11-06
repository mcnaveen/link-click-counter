// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "updatePopup") {
    updateCountsInPage(request.clickedLinks);
  }
});

// Request click counts when the content script is injected into the page
chrome.runtime.sendMessage({ message: "getClickCounts" }, function (response) {
  updateCountsInPage(response.clickedLinks);
});

function updateCountsInPage(clickedLinks) {
  const allLinks = document.querySelectorAll("a");
  allLinks.forEach((link) => {
    const url = link.href;
    const count = clickedLinks[url] || 0;

    // Remove any previously injected span elements
    const existingCountSpan = link.querySelector(".click-count");
    if (existingCountSpan) {
      existingCountSpan.remove();
    }

    // Create a span element to display the count if greater than 0
    if (count > 0) {
      const countSpan = document.createElement("span");
      countSpan.className = "click-count";
      countSpan.textContent = ` (${count} clicks)`;

      // Append the span next to the link
      link.appendChild(countSpan);
    }
  });
}
