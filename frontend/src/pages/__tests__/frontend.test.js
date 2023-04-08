import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Prototype from "../Prototype";
import { BrowserRouter } from "react-router-dom";

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Prototype component", () => {
  test("renders without crashing", () => {
    renderWithRouter(<Prototype />);
  });


  test("displays the correct initial state", () => {
    renderWithRouter(<Prototype />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
