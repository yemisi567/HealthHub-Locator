import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Table.stories";

const { Basic, WithTitle } = composeStories(stories);

describe("Table Component", () => {
    it("renders table component", () => {
        render(<Basic {...Basic.args} />);

        expect(screen.getByRole("table")).toBeInTheDocument();
    });

    it("shows title if prop is added", () => {
        render(<WithTitle {...WithTitle.args} />);

        expect(
            screen.getByText(/BASIC TABLE WITH HEADER/i)
        ).toBeInTheDocument();
    });

    it("calls onclick on table row when row is clicked", async () => {
        const user = userEvent.setup();

        const mockHandler = vi.fn();

        render(<Basic {...Basic.args} handleRowClick={mockHandler} />);

        /** Selected index of 1 to skip the table header row */
        const tableRows = screen.getAllByRole("row")[1];

        await user.click(tableRows);

        expect(mockHandler).toHaveBeenCalledTimes(1);
    });
});
