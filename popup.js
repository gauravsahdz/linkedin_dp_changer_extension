document.getElementById("changeButton").addEventListener("click", () => {
  const imageUrl = document.getElementById("imageUrl").value;
  if (imageUrl) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "changeProfilePictures",
        url: imageUrl,
      });
    });
  }
});
