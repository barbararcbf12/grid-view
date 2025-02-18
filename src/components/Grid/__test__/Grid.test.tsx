import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Grid } from "../Grid";
import gridData from "../../../data/grid-data.json";

describe("Grid Component", () => {
  const mockGridItems = gridData;
  const mockSetGridItems = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the grid with items", () => {
    render(<Grid gridItems={mockGridItems} setGridItems={mockSetGridItems} />);

    expect(screen.getByText("Grid View")).toBeInTheDocument();
    expect(screen.getByLabelText("Search grid items")).toBeInTheDocument();
    expect(screen.getAllByRole("gridcell")).toHaveLength(6);
  });

  it("handles search functionality with debounce", async () => {
    render(<Grid gridItems={mockGridItems} setGridItems={mockSetGridItems} />);

    const searchInput = screen.getByLabelText("Search grid items");

    await userEvent.type(searchInput, "Level");

    jest.advanceTimersByTime(300);

    await waitFor(() => {
      expect(screen.getAllByRole("gridcell")).toHaveLength(1);
    });

    await waitFor(() => {
      expect(screen.getAllByText("Level up")).toHaveLength(2);
    });
  });

  it('shows "No results found" when search has no matches', async () => {
    render(<Grid gridItems={mockGridItems} setGridItems={mockSetGridItems} />);

    const searchInput = screen.getByLabelText("Search grid items");

    await userEvent.type(searchInput, "NonexistentItem");
    jest.advanceTimersByTime(300);

    await waitFor(() => {
      expect(screen.getByText("No results found")).toBeInTheDocument();
    });
  });

  it("handles pagination correctly", async () => {
    render(<Grid gridItems={mockGridItems} setGridItems={mockSetGridItems} />);

    expect(screen.getByText("Page 1 of 4")).toBeInTheDocument();

    const nextButton = screen.getByLabelText("Next page");
    await userEvent.click(nextButton);
    expect(screen.getByText("Page 2 of 4")).toBeInTheDocument();

    const prevButton = screen.getByLabelText("Previous page");
    await userEvent.click(prevButton);
    expect(screen.getByText("Page 1 of 4")).toBeInTheDocument();
  });

  it("disables pagination buttons appropriately", async () => {
    render(<Grid gridItems={mockGridItems} setGridItems={mockSetGridItems} />);

    const prevButton = screen.getByLabelText("Previous page");
    const nextButton = screen.getByLabelText("Next page");

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    await userEvent.click(nextButton);
    await userEvent.click(nextButton);
    await userEvent.click(nextButton);

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it("resets to page 1 when searching", async () => {
    render(<Grid gridItems={mockGridItems} setGridItems={mockSetGridItems} />);

    const nextButton = screen.getByLabelText("Next page");
    await userEvent.click(nextButton);
    expect(screen.getByText("Page 2 of 4")).toBeInTheDocument();

    const searchInput = screen.getByLabelText("Search grid items");
    await userEvent.type(searchInput, "Pizza");

    jest.advanceTimersByTime(300);

    await waitFor(() => {
      expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
    });
  });
});
