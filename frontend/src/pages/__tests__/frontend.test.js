import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "../Dashboard";
import { BrowserRouter } from "react-router-dom";


const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

jest.mock("react-chartjs-2", () => ({
  // Mocked Chart component
  Line: () => null,
  Bar: () => null,
  // Add other chart types here if needed
}));

describe("Dashboard component", () => {
  test("renders without crashing", () => {
    renderWithRouter(<Dashboard />);
  });


  test("displays the correct initial state", () => {
    renderWithRouter(<Dashboard />);

    expect(screen.getByText("SOLVANN DRIFTSYSTEM")).toBeInTheDocument();
  });
});