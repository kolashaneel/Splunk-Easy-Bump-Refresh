// Function to fetch the current tab's URL
function getCurrentTabUrl(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    callback(url);
  });
}

// Function to update the popup with the truncated URL
function updatePopup(url) {
  const splitby1 = "/app/"
  const splitby2 = "/manager/"
  splunk_url = url.split(splitby1)
  if (splunk_url.length == 1) {
    splunk_url = url.split(splitby2)
    if (splunk_url.length == 1) {
      document.getElementById("info").innerHTML = "Not a Splunk URL"
    }
    else {
      document.getElementById('bump').addEventListener('click', () => {
        window.open(splunk_url[0] + "/_bump")
      });
      document.getElementById('refresh').addEventListener('click', () => {
        window.open(splunk_url[0] + "/debug/refresh")
      });
    }
  }
}


// Fetch the current tab's URL and update the popup
getCurrentTabUrl(updatePopup);
