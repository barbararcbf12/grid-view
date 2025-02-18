import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GridItemForm } from "../GridItemForm";
import "@testing-library/jest-dom";

describe("GridItemForm", () => {
  const mockOnSubmit = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form fields and buttons", () => {
    render(<GridItemForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add item/i })
    ).toBeInTheDocument();
  });

  it("updates form fields when user types", async () => {
    render(<GridItemForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const imageInput = screen.getByLabelText(/image url/i);

    await userEvent.type(titleInput, "Test Title");
    await userEvent.type(descriptionInput, "Test Description");
    await userEvent.type(imageInput, "https://example.com/image.jpg");

    expect(titleInput).toHaveValue("Test Title");
    expect(descriptionInput).toHaveValue("Test Description");
    expect(imageInput).toHaveValue("https://example.com/image.jpg");
  });

  it("calls onSubmit with form data when form is submitted", async () => {
    render(<GridItemForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);

    const testData = {
      title: "Test Title",
      description: "Test Description",
      imagePath: "https://example.com/image.jpg",
    };

    await userEvent.type(screen.getByLabelText(/title/i), testData.title);
    await userEvent.type(
      screen.getByLabelText(/description/i),
      testData.description
    );
    await userEvent.type(
      screen.getByLabelText(/image url/i),
      testData.imagePath
    );

    await userEvent.click(screen.getByRole("button", { name: /add item/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith(testData);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onClose when Cancel button is clicked", async () => {
    render(<GridItemForm onSubmit={mockOnSubmit} onClose={mockOnClose} />);

    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockOnClose).toHaveBeenCalled();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
