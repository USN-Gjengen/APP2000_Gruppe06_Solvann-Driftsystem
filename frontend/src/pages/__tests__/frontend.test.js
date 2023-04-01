import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Prototype from "../Prototype";

describe("Prototype component", () => {
  test("renders without crashing", () => {
    render(<Prototype />);
  });

  test("displays the correct initial state", () => {
    render(<Prototype />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Water level Graph")).toBeInTheDocument();
    expect(screen.getByText("Money Graph")).toBeInTheDocument();
    expect(screen.getByText("The turbine is currently off")).toBeInTheDocument();
  });
});
