import React, {useEffect} from 'react';
import Header from './components/Header/Header';
import TabsContainer from './containers/TabsContainer';
import TabProvider from './context/TabContext';
import FontProvider from './context/FontContext';
import RemoveProvider from './context/RemoveContext';
import ThemeProvider from './context/ThemeContext';

const App = () => {
  console.log('reactPopup');
  return (
    <>
      <ThemeProvider>
        <TabProvider>
          <RemoveProvider>
            <FontProvider>
              <Header />
              <TabsContainer />
            </FontProvider>
          </RemoveProvider>
        </TabProvider>
      </ThemeProvider>
    </>
  )
}

export default App;