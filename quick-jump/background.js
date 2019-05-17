chrome.runtime.onInstalled.addListener(function() {
  console.log('extension started!')
})

chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command)
  if (command === 'activate-quick-jump') {
    chrome.tabs.executeScript({
      file: 'dist/quick-jump.js',
    })
  }
})

let lastTabs
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // console.log(sender.tab ? 'from a content script:' + sender.tab.url : 'from the extension')
  console.log('Request:', request)
  if (request.type === 'request-for-tabs-info') {
    chrome.tabs.query({}, tabs => {
      lastTabs = tabs
      sendResponse(tabs)
    })
    // indicate that we'll call `sendResponse` asynchronously
    return true
  } else if (request.type === 'jump-to-tab') {
    chrome.tabs.update(request.tabId, { active: true })
  }
})
