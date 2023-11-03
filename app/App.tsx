import React from 'react';
import Header from './components/Header/Header';
import TabsContainer from './containers/TabsContainer';
import TabProvider from './context/TabContext';
import FontProvider from './context/FontContext';
import RemoveProvider from './context/RemoveContext';
import ThemeProvider from './context/ThemeContext';
import SoundProvider from './context/SoundContext';
import SelectProvider from './context/SelectContext';

const App = () => {
  return (
    <>
      <ThemeProvider>
        <SoundProvider>
          <TabProvider>
            <RemoveProvider>
              <SelectProvider>
                <FontProvider>
                  <Header />
                  <TabsContainer />
                </FontProvider>
              </SelectProvider>
            </RemoveProvider>
          </TabProvider>
        </SoundProvider>
      </ThemeProvider>
    </>
  )
}

export default App;