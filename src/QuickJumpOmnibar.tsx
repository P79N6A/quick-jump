import { MenuItem } from '@blueprintjs/core'
import { Omnibar } from '@blueprintjs/select'
import * as React from 'react'
import { useState } from 'react'

type Tab = chrome.tabs.Tab

export interface QuickJumpOmnibarProps {
  tabs: Tab[]
  jumpTo(tabId: number): void
  onClose(): void
}

function itemPredicate(query: string, tab: Tab) {
  query = query.trim()
  return tab.title.includes(query) || tab.url.includes(query)
}

export default function QuickJumpOmnibar({ tabs, jumpTo, onClose }: QuickJumpOmnibarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [activeItem, onActiveItemChange] = useState<Tab>(null)

  return (
    <Omnibar
      activeItem={activeItem}
      onActiveItemChange={next => onActiveItemChange(next)}
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false)
        onClose()
      }}
      items={tabs}
      itemRenderer={(tab, { modifiers, handleClick }) => (
        <MenuItem
          key={tab.id}
          active={modifiers.active}
          label={tab.title}
          text={tab.title}
          onClick={handleClick}
        />
      )}
      itemPredicate={itemPredicate}
      onItemSelect={tab => {
        setIsOpen(false)
        jumpTo(tab.id)
      }}
    />
  )
}
