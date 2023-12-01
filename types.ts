type MutedInfo = chrome.tabs.MutedInfo;

export type Tab = {
  active: boolean,
  tabId: number | undefined,
  title: string | undefined,
  windowId: number,
  height: number | undefined,
  width: number | undefined,
  audible: boolean | undefined,
  mutedInfo: MutedInfo | undefined,
  index: number
}

export type AllTabs = {
  [key: number | string]: Tab[]
}

export type Window = {
  width: number | undefined,
  height: number | undefined,
}

export type AllWindows = {
  [key: number | string]: Window
}

export type WindowNames = {
  [key: string]: string
}