// TODO 需要处理样式重复加载的问题
import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import QuickJumpOmnibar from './QuickJumpOmnibar'

chrome.runtime.sendMessage({ type: 'request-for-tabs-info' }, (response: chrome.tabs.Tab[]) => {
  startApp(response)
})

function jumpTo(tabId: number) {
  chrome.runtime.sendMessage({ type: 'jump-to-tab', tabId })
  stop()
}

let handle: number
const dummyNode = document.createElement('div')

function startApp(tabs: chrome.tabs.Tab[]) {
  clearTimeout(handle)
  ReactDOM.render(<QuickJumpOmnibar tabs={tabs} jumpTo={jumpTo} onClose={stop} />, dummyNode)
}

function stop() {
  handle = setTimeout(() => {
    ReactDOM.render(null, dummyNode)
  }, 500)
}
