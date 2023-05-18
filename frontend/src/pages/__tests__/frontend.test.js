import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Prototype from "../Prototype";
import { BrowserRouter } from "react-router-dom";
import { Chart } from "react-chartjs-2";


const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Prototype component", () => {
  beforeAll(() => {
    // Mock the Chart component
    Chart.mockImplementation(() => ({
      // Implement any necessary methods or properties here
      // You can return empty implementations or mock data as needed
    }));
  });

describe("Prototype component", () => {
  test("renders without crashing", () => {
    renderWithRouter(<Prototype />);
  });


  test("displays the correct initial state", () => {
    renderWithRouter(<Prototype />);

    expect(screen.getByText("Solvann Driftsystem")).toBeInTheDocument();
  });
});
});