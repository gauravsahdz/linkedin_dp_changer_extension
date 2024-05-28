// Function to replace profile pictures
function replaceProfilePictures(newProfilePicUrl) {
  const profilePictures = document.querySelectorAll(
    ".feed-shared-actor__avatar-image, .update-components-actor__avatar-image, .profile-photo-edit__preview"
  );

  profilePictures.forEach((picture) => {
    picture.src = newProfilePicUrl;
    picture.srcset = newProfilePicUrl;
    picture.style.objectFit = "cover"; // Ensure the image fits well
  });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "changeProfilePictures") {
    replaceProfilePictures(request.url);
  }
});

// Monitor the LinkedIn feed for new posts and replace profile pictures
const observer = new MutationObserver(() => {
  // Optionally, you can use a stored URL if no new URL is provided
  chrome.storage.local.get(["profilePicUrl"], (result) => {
    if (result.profilePicUrl) {
      replaceProfilePictures(result.profilePicUrl);
    }
  });
});
observer.observe(document.body, { childList: true, subtree: true });

// Initially run with a stored URL if available
chrome.storage.local.get(["profilePicUrl"], (result) => {
  if (result.profilePicUrl) {
    replaceProfilePictures(result.profilePicUrl);
  }
});
