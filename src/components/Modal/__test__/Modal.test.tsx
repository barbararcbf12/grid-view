import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../Modal";
import userEvent from "@testing-library/user-event";

describe("Modal", () => {
  const mockOnClose = jest.fn();
  const modalContent = "Test Modal Content";

  beforeEach(() => {
    // Clear mock calls between tests
    mockOnClose.mockClear();
  });

  it("renders nothing when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        {modalContent}
      </Modal>
    );

    expect(screen.queryByText(modalContent)).not.toBeInTheDocument();
  });

  it("renders content when isOpen is true", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        {modalContent}
      </Modal>
    );

    expect(screen.getByText(modalContent)).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        {modalContent}
      </Modal>
    );

    const closeButton = screen.getByLabelText("Close modal");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
