export type Tab = {
  active: boolean,
  tabId: number | undefined,
  title: string | undefined,
  windowId: number
}

export type AllTabs = {
  [key: number]: Tab[]
}