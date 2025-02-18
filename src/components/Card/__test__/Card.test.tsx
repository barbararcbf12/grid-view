import { render, screen } from "@testing-library/react";
import Card from "../Card";

describe("Card Component", () => {
  const mockItem = {
    title: "Test Title",
    description: "Test Description",
    imagePath: "/test-image.jpg",
  };
  it("renders card with correct content", () => {
    render(<Card item={mockItem} />);

    // Check if title is rendered
    expect(screen.getByText("Test Title")).toBeInTheDocument();

    // Check if description is rendered
    expect(screen.getByText("Test Description")).toBeInTheDocument();

    // Check if image is rendered with correct attributes
    const image = screen.getByAltText("Test Title");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
  });

  it("has correct accessibility attributes", () => {
    render(<Card item={mockItem} />);

    // Check if the card has the correct role
    const card = screen.getByRole("gridcell");
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("tabIndex", "0");
  });

  it("maintains proper structure", () => {
    render(<Card item={mockItem} />);

    // Check if the card has the expected structure
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
