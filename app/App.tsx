import React from 'react';
import Header from './components/Header/Header';
import TabsContainer from './containers/AllTabsContainer';
import TabProvider from './context/TabContext';
import FontProvider from './context/FontContext';
import ThemeProvider from './context/ThemeContext';
import SoundProvider from './context/SoundContext';
import SelectProvider from './context/SelectContext';

const App = () => {
  return (
    <>
      <ThemeProvider>
        <SoundProvider>
          <TabProvider>
            <SelectProvider>
              <FontProvider>
                <Header />
                <TabsContainer />
              </FontProvider>
            </SelectProvider>
          </TabProvider>
        </SoundProvider>
      </ThemeProvider>
    </>
  )
}

export default App;