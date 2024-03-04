import React from "react";
import { render, screen } from "@testing-library/react";
import { AddTextEditor } from "./TextEditor";

describe("Add Text Editor Component", () => {
  it("renders add text editor component", async () => {
    render(<AddTextEditor title="Description" />);

    expect(screen.getByLabelText("title")).toBeInTheDocument();
  });
});
