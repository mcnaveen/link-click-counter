chrome.storage.local.get("clickedLinks", function (result) {
    const clickedLinks = result.clickedLinks || {};
    const clickedLinksList = document.getElementById("clickedLinksList");

    for (const [url, count] of Object.entries(clickedLinks)) {
        const listItem = document.createElement("li");
        listItem.textContent = `${url}: ${count} clicks`;
        clickedLinksList.appendChild(listItem);
    }
});
