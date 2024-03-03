import { render, screen } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Select.stories";

const { Default, SelectWithError } = composeStories(stories);

describe("Select Component", () => {
    it("renders select input", () => {
        render(<Default />);

        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("renders error text", () => {
        render(<SelectWithError {...SelectWithError.args} />);

        expect(
            screen.getByText(/Please select a diagnosis/i)
        ).toBeInTheDocument();
    });
});
