import { useState } from "react";

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
  useState([
    {
      productId: "",
      quantity: 1
    }
  ]);

  if (!open) return null;

    const addItem = () => {

  setItems([
    ...items,
    {
      productId: "",
      quantity: 1
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
  quantity: number
) => {

  const updated = [...items];

  updated[index].quantity =
    quantity;

  setItems(updated);

};
  
  const handleSubmit = () => {

  if (!customerId) {
    return;
  }

  onSubmit({

    customerId:
      Number(customerId),

    items:
      items.map(item => ({
        productId:
          Number(item.productId),

        quantity:
          item.quantity
      }))

  });

};

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl w-[500px]">

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
          className="w-full border p-3 rounded mb-3"
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
                {customer.firstName} {customer.lastName}
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
          rounded"
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
              {product.productName}
            </option>

          )
        )}

      </select>

      <input
        type="number"
        min="1"
        value={item.quantity}
        onChange={(e) =>
          updateQuantity(
            index,
            Number(
              e.target.value
            )
          )
        }
        className="
          w-24
          border
          p-3
          rounded"
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