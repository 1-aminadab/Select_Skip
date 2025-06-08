import React from 'react';
import Home from './pages/Home';
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