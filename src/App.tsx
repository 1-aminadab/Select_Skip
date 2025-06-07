import React from 'react';
import GlassBackground from './components/GlassBackground';
import Home from './pages/Home';
import SummaryBar from './components/SummaryBar';
import Steps from './components/Steps';
import { AppProvider } from './context/AppContext';

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="App">
        <Home/>
      </div>
    </AppProvider>

  );
};

export default App;