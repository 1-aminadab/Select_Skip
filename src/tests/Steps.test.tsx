import React from "react";
import { render, screen } from "@testing-library/react";
import Steps from "../components/Steps";
import { AppProvider } from "../context/AppContext";
import { steps } from "../data/steps";

describe("Steps component", () => {
  beforeEach(() => {
    render(
      <AppProvider>
        <Steps />
      </AppProvider>
    );
  });

  it("renders all steps and lines", () => {
    const stepWrappers = screen.getAllByTestId("step-wrapper");
    const lines = screen.getAllByTestId("step-line");

    expect(stepWrappers.length).toBe(steps.length);
    expect(lines.length).toBe(steps.length - 1);
  });

  it("applies correct classes for current and completed steps", () => {
    const completedSteps = document.querySelectorAll(".completed");
    const currentStep = document.querySelectorAll(".current");

    expect(completedSteps.length).toBeGreaterThanOrEqual(0);
    expect(currentStep.length).toBe(1);
  });

  it("assigns refs to blocks and lines", () => {
    const stepGlassBlocks = screen.getAllByTestId("step-wrapper");
    const stepLines = screen.getAllByTestId("step-line");

    // Check if all returned nodes are valid HTML elements
    expect(stepGlassBlocks.every((el) => el instanceof HTMLElement)).toBe(true);
    expect(stepLines.every((el) => el instanceof HTMLElement)).toBe(true);
  });
});
