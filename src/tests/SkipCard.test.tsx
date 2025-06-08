import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SkipCard from "../components/SkipCard";
import type { SkipData } from "../types";

// Mock GSAP and ScrollTrigger to avoid errors in test environment
jest.mock("gsap", () => ({
  from: jest.fn(),
  to: jest.fn(),
  registerPlugin: jest.fn()
}));
jest.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {}
}));

// Sample mock data
const mockSkipData: SkipData = {
  id: 1,
  size: 8,
  hire_period_days: 7,
  transport_cost: 50,
  per_tonne_cost: 90,
  price_before_vat: 250,
  vat: 20,
  postcode: 'SW1A 1AA',
  area: 'London',
  forbidden: false,
  created_at: '2024-06-01T12:00:00Z',
  updated_at: '2024-06-05T12:00:00Z',
  allowed_on_road: false,
  allows_heavy_waste: false,
  totalPrice: 270, // Optional
  disabled: false, // Optional
  tooltip: 'This skip cannot be placed on roads', // Optional
};

describe("SkipCard", () => {
  it("renders skip info correctly", () => {
    render(
      <SkipCard skipData={mockSkipData} selected={false} disabled={false} onSelect={() => {}} />
    );

    expect(screen.getByText("8 Yard Skip")).toBeInTheDocument();
    expect(screen.getByText("£250")).toBeInTheDocument();
    expect(screen.getByText("Perfect for household waste")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Select");
  });

  it("displays road and heavy waste restrictions", () => {
    render(
      <SkipCard skipData={mockSkipData} selected={false} disabled={false} onSelect={() => {}} />
    );

    expect(screen.getByLabelText("Road restriction")).toBeInTheDocument();
    expect(screen.getByLabelText("Heavy waste restriction")).toBeInTheDocument();
  });

  it("disables selection when `disabled` is true", () => {
    render(
      <SkipCard skipData={mockSkipData} selected={false} disabled={true} onSelect={jest.fn()} />
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Select");
  });

  it("shows 'Selected' state when selected is true", () => {
    render(
      <SkipCard skipData={mockSkipData} selected={true} disabled={false} onSelect={jest.fn()} />
    );

    expect(screen.getByText("Selected")).toBeInTheDocument(); // badge and button
    expect(screen.getAllByText("Selected").length).toBeGreaterThan(1);
  });

  it("calls `onSelect` when the button is clicked", () => {
    const handleSelect = jest.fn();
    render(
      <SkipCard skipData={mockSkipData} selected={false} disabled={false} onSelect={handleSelect} />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
});
