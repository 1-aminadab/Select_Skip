// src/context/SkipContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { skipData as allSkips } from '../data/skipData';
import { steps } from '../data/steps';

type Skip = typeof allSkips[0];

interface Step {
  icon: string;
  label: string;
}

interface SkipContextType {
  selectedSkipId: number | null;
  setSelectedSkipId: (id: number) => void;
  selectedSkip: Skip | null;
  progress: number;
  incrementProgress: () => void;
  decrementProgress: () => void;
  setProgress: (value: number) => void;
  steps: Step[];
}

const SkipContext = createContext<SkipContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(allSkips[0].id);
  
  // progress refers to index of steps, defaulting to 2 => "Select Skip"
  const [progress, setProgress] = useState<number>(2);

  const selectedSkip = allSkips.find(skip => skip.id === selectedSkipId) || null;

  const incrementProgress = () => {
    setProgress(prev => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const decrementProgress = () => {
    setProgress(prev => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <SkipContext.Provider
      value={{
        selectedSkipId,
        setSelectedSkipId,
        selectedSkip,
        progress,
        incrementProgress,
        decrementProgress,
        setProgress,
        steps,
      }}
    >
      {children}
    </SkipContext.Provider>
  );
};

export const useProvider = () => {
  const context = useContext(SkipContext);
  if (!context) throw new Error('useProvider must be used within an AppProvider');
  return context;
};
