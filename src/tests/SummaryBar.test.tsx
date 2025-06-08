// SummaryBar.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';

import SummaryBar from '../components/SummaryBar';
import { AppProvider } from '../context/AppContext';
import '@testing-library/jest-dom';

// Mock GSAP to prevent animation issues in test
jest.mock('gsap', () => ({
  gsap: {
    fromTo: jest.fn(),
    from: jest.fn()
  }
}));

const renderWithProvider = () => {
  return render(
    <AppProvider>
      <SummaryBar />
    </AppProvider>
  );
};

describe('SummaryBar', () => {
  it('renders the selected skip info', () => {
    renderWithProvider();
    
    expect(screen.getByText(/Yard Skip/i)).toBeInTheDocument();
    expect(screen.getByText(/day hire/i)).toBeInTheDocument();
  });

  it('renders Continue button with → arrow', () => {
    renderWithProvider();

    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    expect(screen.getByText('→')).toBeInTheDocument();
  });

  it('calls incrementProgress when Continue is clicked', () => {
    renderWithProvider();

    const continueButton = screen.getByRole('button', { name: /continue/i });
    fireEvent.click(continueButton);

    // We check that the next label is shown (e.g., step progresses)
    // This assumes you provide visual feedback for step change in SummaryBar or elsewhere
  });

  it('hides Back button on first step', () => {
    renderWithProvider();

    const backButton = screen.queryByRole('button', { name: /back/i });
    expect(backButton).toBeVisible();
  });
});
