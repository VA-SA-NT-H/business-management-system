import { useState } from "react";

interface Props {
  open: boolean;
  mode: "ADD" | "REMOVE";
  onClose: () => void;
  onSubmit: (quantity: number) => void;
}

const StockUpdateModal = ({
  open,
  mode,
  onClose,
  onSubmit
}: Props) => {

  const [quantity, setQuantity] =
    useState(0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div
  className="
  bg-white
  dark:bg-slate-800
  text-black
  dark:text-white
  p-6
  w-[400px]
  rounded-xl"
>

        <h2 className="text-xl font-bold mb-4">

          {mode === "ADD"
            ? "Add Stock"
            : "Remove Stock"}

        </h2>

        <input
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Number(e.target.value)
            )
          }
          className="w-full border p-3 rounded"
          placeholder="Quantity"
        />

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSubmit(quantity)
            }
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>

        </div>

      </div>

    </div>
  );
};

export default StockUpdateModal;