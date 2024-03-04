import React from "react";
import { render, screen } from "@testing-library/react";
import Select from "./Select";

describe("Select Component", () => {
  it("renders select input", () => {
    render(<Select label={"select"} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders error text", () => {
    render(
      <Select
        label={"diagnosis"}
        hasError={true}
        errorText="Please select a diagnosis"
      />
    );
    expect(screen.getByText(/Please select a diagnosis/i)).toBeInTheDocument();
  });
});
