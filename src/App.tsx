import React, { useState } from "react";
import { Grid } from "./components/Grid/Grid";
import Button from "./components/Button/Button";
import { Modal } from "./components/Modal/Modal";
import { GridItemForm } from "./components/GridItemFrom/GridItemForm";
import gridData from "./data/grid-data.json";
import { GridItem } from "./types/types";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gridItems, setGridItems] = useState<GridItem[]>(gridData);

  const handleAOnSubmit = (newItem: GridItem) => {
    setGridItems((prev) => [...prev, newItem]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-3 h-screen">
      <main className="p-3 flex justify-center flex-col gap-4">
        <div className="flex justify-end">
          <Button onClick={() => setIsModalOpen(true)}>Add New Item</Button>
        </div>
        <div className="rounded-mobile md:rounded-desktop bg-grey-100 p-6 shadow-lg w-full flex justify-center">
          <Grid gridItems={gridItems} setGridItems={setGridItems} />
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <GridItemForm
            onSubmit={handleAOnSubmit}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      </main>
    </div>
  );
}

export default App;
