import type { Product } from "../../types/product";
import {
  exportToCsv
} from "../../utils/exportCsv";
interface Props {

  products: Product[];

  onDelete: (id: number) => void;

  onViewTransactions: (
    id: number
  ) => void;

  onEdit: (
    product: Product
  ) => void;

  onAddStock: (
    product: Product
  ) => void;

  onRemoveStock: (
    product: Product
  ) => void;
}

const ProductTable = ({
  products,
  onDelete,
  onViewTransactions,
  onEdit,
  onAddStock,
  onRemoveStock
}: Props) => {

  return (
    <div
      className="
      bg-white
      dark:bg-slate-800
      rounded-xl"
    >

      <table className="w-full">

        <thead>

          <tr className="bg-slate-100">

            <th className="p-3 text-left">
              Code
            </th>

            <th className="p-3 text-left">
              Name
            </th>

            <th className="p-3 text-left">
              Price
            </th>

            <th className="p-3 text-left">
              Stock
            </th>

            <th className="p-3 text-left">
              Status
            </th>

            <th className="p-3 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr
              key={product.id}
              className="border-b"
            >

              <td className="p-3">
                {product.productCode}
              </td>

              <td className="p-3">
                {product.productName}
              </td>

              <td className="p-3">
                ₹{product.price}
              </td>

              <td className="p-3">
                {product.stockQuantity}
              </td>

              <td className="p-3">

                {product.stockQuantity <=
                product.reorderLevel ? (

                  <span className="text-red-500 font-medium">
                    Low Stock
                  </span>

                ) : (

                  <span className="text-green-600 font-medium">
                    In Stock
                  </span>

                )}

              </td>

              <td className="p-3">

              <div className="flex gap-3 flex-wrap">

                <button
                  onClick={() =>
                    onViewTransactions(product.id)
                  }
                  className="text-blue-600"
                >
                  View
                </button>

                <button
                  onClick={() =>
                    onEdit(product)
                  }
                  className="text-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    onAddStock(product)
                  }
                  className="text-green-600"
                >
                  Add Stock
                </button>

                <button
                  onClick={() =>
                    onRemoveStock(product)
                  }
                  className="text-orange-600"
                >
                  Remove Stock
                </button>

                <button
                  onClick={() =>
                    onDelete(product.id)
                  }
                  className="text-red-600"
                >
                  Delete
                </button>

                <button
                  onClick={() =>
                    exportToCsv(
                      "products",
                      products
                    )
                  }
                >
                  Export CSV
</button>

              </div>

            </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ProductTable;