type MutedInfo = chrome.tabs.MutedInfo;

export type SelectedTabs = Array<number>;

export interface TabAudio {
  audible: boolean | undefined,
  mutedInfo: MutedInfo | undefined,
  tabId: number | undefined,
}

export interface Tab extends TabAudio {
  active: boolean,
  title: string | undefined,
  windowId: number,
  height: number | undefined,
  width: number | undefined,
  index: number
}

export interface AllTabs {
  [key: number | string]: Tab[]
}

export interface Window {
  width: number | undefined,
  height: number | undefined,
}

export interface AllWindows {
  [key: number | string]: Window
}

export interface WindowNames {
  [key: string]: string
}