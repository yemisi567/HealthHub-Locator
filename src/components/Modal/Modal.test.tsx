import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ReactDOM from "react-dom";
import { ReactNode, ReactPortal } from "react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

describe("Modal Component", () => {
  const portal = ReactDOM.createPortal;

  beforeAll(() => {
    ReactDOM.createPortal = (node: ReactNode): ReactPortal =>
      node as ReactPortal;
  });

  afterAll(() => {
    ReactDOM.createPortal = portal;
  });

  it("modal shows the children, a close button and calls onCloseButton when clicked", async () => {
    const user = userEvent.setup();

    const handleClose = vi.fn();

    render(
      <Modal onCloseButton={handleClose}>
        <div>test</div>
      </Modal>
    );

    expect(screen.getByText("test")).toBeTruthy();

    const btn = screen.getByRole("button", { name: "closeModal" });

    await user.click(btn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
