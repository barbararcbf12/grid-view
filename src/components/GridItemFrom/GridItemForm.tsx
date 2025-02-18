import { useState } from "react";
import { GridItem } from "../../types/types";
import Button from "../Button/Button";

interface GridItemFormProps {
  onSubmit: (newItem: GridItem) => void;
  onClose: () => void;
}

export function GridItemForm({ onSubmit, onClose }: GridItemFormProps) {
  const [formData, setFormData] = useState<GridItem>({
    title: "",
    description: "",
    imagePath: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Add New Grid Item</h2>

      <div>
        <label htmlFor="title" className="block mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          required={true}
          className="w-full px-4 py-2 border rounded-lg"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-1">
          Description
        </label>
        <textarea
          id="description"
          required={true}
          className="w-full px-4 py-2 border rounded-lg"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      <div>
        <label htmlFor="imagePath" className="block mb-1">
          Image URL
        </label>
        <input
          type="url"
          id="imagePath"
          required={true}
          className="w-full px-4 py-2 border rounded-lg"
          value={formData.imagePath}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, imagePath: e.target.value }))
          }
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button onClick={onClose} type="button">
          Cancel
        </Button>
        <Button type="submit">Add Item</Button>
      </div>
    </form>
  );
}
