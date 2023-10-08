// Function to fetch the current tab's URL
function getCurrentTabUrl(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;
    callback(url);
  });
}

// Function to update the popup with the truncated URL
function updatePopup(url) {

  const splitby_keyword = ["/app/", "/manager/"]    // splunk url will be identified using these words
  let splitby = ""                                  // based on the url keyword will be assigned to this for extracting url

  for (i = 0; i < splitby_keyword.length; i++) {    // this loop check the length of the arrary which contains the url split parts, if the length is greater than 1 that keyword will be assigned to splitby and breaks the loop
    if (url.split(splitby_keyword[i]).length > 1) {
      splitby = splitby_keyword[i]
      break;
    }
  }

  if (splitby == "") {                              // if url does not contain any key word listed above 1st item from array will be assigned for further processing
    splitby = splitby_keyword[0]
  }

  splunk_url = url.split(splitby)                   // check the split parts of the url

  if (splunk_url.length == 1) {                     // check the length of the split array id length is 1 means it's not a splunk URL if length is greater than 1 bump and server refresh buttons will work
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

// Fetch the current tab's URL and update the popup
getCurrentTabUrl(updatePopup);
