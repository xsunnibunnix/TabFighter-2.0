type MutedInfo = chrome.tabs.MutedInfo;

export type TabsArray = Array<number>;

export type TabAudio = {
  audible: boolean | undefined,
  mutedInfo: MutedInfo | undefined,
  tabId: number | undefined,
}

export type Tab = {
  active: boolean,
  title: string | undefined,
  windowId: number,
  height: number | undefined,
  width: number | undefined,
  index: number
} & TabAudio

export type AllTabs =  {
  [key: number | string]: Tab[]
}

export type Window =  {
  width: number | undefined,
  height: number | undefined,
}

export type AllWindows = {
  [key: number | string]: Window
}

export type WindowNames = {
  [key: string]: string
}