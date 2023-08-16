import React from "react";

const Tabs = () => {
  const getTabs = async () => {
    const tabs = await chrome.tabs.query({});
    console.log(tabs);
  }
  getTabs();

  return (
    <div>Tabs</div>
  )
}

export default Tabs