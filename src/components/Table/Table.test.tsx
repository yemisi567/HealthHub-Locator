import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "./Table";

type Person = {
  date_of_service?: string;
  client?: {
    first_name: string;
    last_name: string;
  };
};
const defaultData: Person[] = [
  {
    date_of_service: "2022-08-05T00:00:00.000Z",
    client: {
      first_name: "John",
      last_name: "Doe",
    },
  },
];

const columns = [
  {
    accessorKey: "firstName",
    header: "firstName",
  },
];

describe("Table Component", () => {
  it("renders table component", () => {
    render(<Table data={defaultData} columns={columns} />);

    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
