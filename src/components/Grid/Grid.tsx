import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

import { GridItem } from "../../types/types";
import { ITEMS_PER_PAGE } from "../../constants/grid";
import Card from "../Card/Card";
import Button from "../Button/Button";

export function Grid({
  gridItems,
  setGridItems,
}: {
  gridItems: GridItem[];
  setGridItems: React.Dispatch<React.SetStateAction<GridItem[]>>;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchTerm, 300);

  const filteredData: GridItem[] = gridItems?.filter(
    (item) =>
      item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 min-h-[846px] lg:min-w-[1054px]">
      <div className="flex flex-col space-y-2 pb-2 md:pb-0 md:flex-row justify-between md:items-center">
        <h1 className="h1">Grid View</h1>
        <input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setCurrentPage(1);
            setSearchTerm(e.target.value);
          }}
          className="px-4 py-2 border rounded-lg"
          aria-label="Search grid items"
        />
      </div>
      {filteredData.length === 0 ? (
        <div className="text-center py-8" role="status">
          No results found
        </div>
      ) : (
        <>
          <div
            className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-max-3xl"
            role="grid"
          >
            {paginatedData.map((item) => (
              <Card key={item.title} item={item} />
            ))}
          </div>

          {/* PAGINATION */}
          <div
            className="flex justify-center gap-2"
            role="navigation"
            aria-label="Pagination"
          >
            <Button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              Previous
            </Button>
            <span className="px-4 py-2" role="status">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
