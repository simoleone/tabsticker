function install(tabId) {
  chrome.tabs.executeScript(tabId, { code: "function tabsticker_askClose(){return 'Pinned! Continue?';} window.addEventListener('beforeunload', tabsticker_askClose, true);" });
}

function unInstall(tabId) {
  chrome.tabs.executeScript(tabId, { code: "window.removeEventListener('beforeunload', tabsticker_askClose, true);" });
}

function installAllPinnedTabs() {
  chrome.tabs.query({pinned: true}, function(tabs) {
    for(var i=0;i<tabs.length;i++) {
      install(tabs[i]['id']);
    }
  });
}


chrome.runtime.onInstalled.addListener(installAllPinnedTabs);
chrome.runtime.onStartup.addListener(installAllPinnedTabs);

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if (changeInfo['pinned']) {
    install(tabId);
  } else {
    unInstall(tabId);
  }
});
