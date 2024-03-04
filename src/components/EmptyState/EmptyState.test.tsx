import React from "react";
import { render, screen } from "@testing-library/react";
import EmptyState from "./EmptyState";

describe("ListState Component", () => {
  it("renders empty list state correctly", () => {
    render(<EmptyState />);
    expect(screen.queryByText("No hospitals to display")).toBeInTheDocument();
  });
});
