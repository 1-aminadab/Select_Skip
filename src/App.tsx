import React from 'react';
import GlassBackground from './components/GlassBackground';
import Home from './pages/Home';
import SummaryBar from './components/SummaryBar';
import Steps from './components/Steps';

const App: React.FC = () => {
  return (
    <div className="App">
      <GlassBackground />
      <Steps/>
      <Home />
      <SummaryBar/>
    </div>
  );
};

export default App;