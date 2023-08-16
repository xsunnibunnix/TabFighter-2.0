import React from 'react';
import Header from './components/Header';
import TabsContainer from './components/TabsContainer';
import TabProvider from './context/TabContext';

const App = () => {
  console.log('reactPopup');
  return (
    <>
      <TabProvider>
        <Header />
        <TabsContainer />
      </TabProvider>
    </>
  )
}

export default App;