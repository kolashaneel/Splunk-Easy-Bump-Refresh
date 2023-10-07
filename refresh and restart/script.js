// Function to fetch the current tab's URL
function getCurrentTabUrl(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    callback(url);
  });
}

// Function to update the popup with the truncated URL
function updatePopup(url) {
  const regex_pattern=/\w+:\/\/\w+:\w+\/\w+-\w+\//;
  const match = regex_pattern.exec(url);
  if (match == null){
    document.getElementById("info").innerHTML = "Invalid URL"
  }
  else{
    document.getElementById('bump').addEventListener('click', () => {
      window.open(match[0]+"_bump")
    });
    document.getElementById('refresh').addEventListener('click', () => {
      window.open(match[0]+"debug/refresh")
    });
  }
}

// Fetch the current tab's URL and update the popup
getCurrentTabUrl(updatePopup);