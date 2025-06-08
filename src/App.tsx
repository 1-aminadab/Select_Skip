import React, { useEffect } from 'react';
import Home from './pages/Home';
import { AppProvider } from './context/AppContext';

const App: React.FC = () => {

useEffect(() => {
  const setThemeColor = (color: string) => {
    let themeColorMeta = document.querySelector("meta[name=theme-color]");
    if (!themeColorMeta) {
      themeColorMeta = document.createElement("meta");
      themeColorMeta.setAttribute("name", "theme-color");
      document.head.appendChild(themeColorMeta);
    }
    themeColorMeta.setAttribute("content", color);
  };

  // Example: Blue for light mode, black for dark mode
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setThemeColor(prefersDark ? '#000000' : '#3498db');
}, []);
  return (
    <AppProvider>
      <div className="App">
        <Home/>
      </div>
    </AppProvider>

  );
};

export default App;