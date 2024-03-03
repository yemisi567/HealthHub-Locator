import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card Component", () => {
    it("renders card and card children", () => {
        render(
            <Card
                children={
                    "This is the card component, you can use this to wrap other component"
                }
            />
        );

        expect(
            screen.getByText(
                /This is the card component, you can use this to wrap other components/i
            )
        ).toBeInTheDocument();
    });
});
