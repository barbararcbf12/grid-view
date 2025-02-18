import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

// Mock the grid data
jest.mock("../data/grid-data.json", () => [
  {
    title: "Test Item",
    description: "Test Description",
    imagePath: "test.jpg",
  },
]);

describe("App Component", () => {
  it("renders the main layout with grid and add button", () => {
    render(<App />);

    expect(screen.getByText("Add New Item")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("opens modal when Add New Item button is clicked", async () => {
    render(<App />);

    const addButton = screen.getByText("Add New Item");
    await userEvent.click(addButton);

    // Check if the modal form is visible
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", async () => {
    render(<App />);

    // Open modal
    const addButton = screen.getByText("Add New Item");
    await userEvent.click(addButton);

    // Close modal
    const closeButton = screen.getByRole("button", { name: /close/i });
    await userEvent.click(closeButton);

    // Check if modal is closed
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
