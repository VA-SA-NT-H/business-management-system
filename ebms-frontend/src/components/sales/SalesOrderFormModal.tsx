import { useState, useEffect } from "react";

interface Props {

  open: boolean;

  customers: any[];

  products: any[];

  onClose: () => void;

  onSubmit: (request: any) => void;
}

const SalesOrderFormModal = ({
  open,
  customers,
  products,
  onClose,
  onSubmit
}: Props) => {

  const [customerId,
    setCustomerId] =
    useState("");

  const [items, setItems] =
  useState<{
    productId: string;
    quantity: "" | number;
  }[]>([
    {
      productId: "",
      quantity: ""
    }
  ]);

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (open) {
      setCustomerId("");
      setItems([
        {
          productId: "",
          quantity: ""
        }
      ]);
      setErrorMsg("");
    }
  }, [open]);

  if (!open) return null;

    const addItem = () => {

  setItems([
    ...items,
    {
      productId: "",
      quantity: ""
    }
  ]);

};

const removeItem = (
  index: number
) => {

  setItems(
    items.filter(
      (_, i) => i !== index
    )
  );

};

const updateProduct = (
  index: number,
  productId: string
) => {

  const updated = [...items];

  updated[index].productId =
    productId;

  setItems(updated);

};

const updateQuantity = (
  index: number,
  quantity: "" | number
) => {

  const updated = [...items];

  updated[index].quantity =
    quantity;

  setItems(updated);

};
  
  const handleSubmit = () => {
    if (!customerId) {
      setErrorMsg("Please select a customer.");
      return;
    }
    const validItems = items.filter(item => item.productId !== "" && item.quantity !== "" && Number(item.quantity) > 0);
    if (validItems.length === 0) {
      setErrorMsg("Please select at least one product with a valid quantity.");
      return;
    }

    setErrorMsg("");
    onSubmit({
      customerId: Number(customerId),
      items: validItems.map(item => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity)
      }))
    });
  };

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div
  className="
  bg-white
  dark:bg-slate-800
  text-black
  dark:text-white
  p-6
  w-[500px]
  rounded-xl"
>

        <h2 className="text-xl font-bold mb-4">
          Create Sales Order
        </h2>

        <select
          value={customerId}
          onChange={(e) =>
            setCustomerId(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-3 bg-white dark:bg-slate-700 text-black dark:text-white border-slate-200 dark:border-slate-600"
        >

          <option value="">
            Select Customer
          </option>

          {customers.map(
            customer => (

              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.name}
              </option>

            )
          )}

        </select>

      {items.map(
  (item, index) => (

    <div
      key={index}
      className="
        flex
        gap-3
        mb-3
        items-center"
    >

      <select
        value={item.productId}
        onChange={(e) =>
          updateProduct(
            index,
            e.target.value
          )
        }
        className="
          flex-1
          border
          p-3
          rounded bg-white dark:bg-slate-700 text-black dark:text-white border-slate-200 dark:border-slate-600"
      >

        <option value="">
          Select Product
        </option>

        {products.map(
          product => (

            <option
              key={product.id}
              value={product.id}
            >
              {product.name}
            </option>

          )
        )}

      </select>

      <input
        type="number"
        min="1"
        placeholder="Qty"
        value={item.quantity}
        onChange={(e) =>
          updateQuantity(
            index,
            e.target.value === "" ? "" : Number(e.target.value)
          )
        }
        className="
          w-24
          border
          p-3
          rounded bg-white dark:bg-slate-700 text-black dark:text-white border-slate-200 dark:border-slate-600"
      />

      {items.length > 1 && (

        <button
          type="button"
          onClick={() =>
            removeItem(index)
          }
          className="
            text-red-600
            font-medium"
        >
          Remove
        </button>

      )}

    </div>

  )
)}

    <button
        type="button"
        onClick={addItem}
        className="
          bg-green-600
          text-white
          px-4
          py-2
          rounded
          mb-4"
      >
        Add Product
      </button>

        {errorMsg && (
          <div className="text-red-500 mb-3 text-sm font-medium">
            {errorMsg}
          </div>
        )}

        <div className="flex justify-end gap-3 mt-5">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create
          </button>

        </div>

      </div>

    </div>

  );
};

export default SalesOrderFormModal;