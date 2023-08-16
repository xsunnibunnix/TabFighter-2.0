import React from 'react';
import Header from './components/Header/Header';
import TabsContainer from './containers/TabsContainer';
import TabProvider from './context/TabContext';
import FontProvider from './context/FontContext';
import RemoveProvider from './context/RemoveContext';

const App = () => {
  console.log('reactPopup');
  return (
    <>
      <TabProvider>
        <RemoveProvider>
          <FontProvider>
            <Header />
            <TabsContainer />
          </FontProvider>
        </RemoveProvider>
      </TabProvider>
    </>
  )
}

export default App;