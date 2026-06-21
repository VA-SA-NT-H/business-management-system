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
  text-black
  dark:text-white
  p-6
  rounded-xl"
>

      <table className="w-full">

        <thead>

          <tr className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">

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
                {product.sku}
              </td>

              <td className="p-3">
                {product.name}
              </td>

              <td className="p-3">
                ₹{product.price}
              </td>

              <td className="p-3">
                {product.stockQuantity}
              </td>

              <td className="p-3">

                {product.stockQuantity <=
                product.minimumStockLevel ? (

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

              <div className="flex gap-2 flex-wrap items-center">

                <button
                  onClick={() =>
                    onViewTransactions(product.id)
                  }
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
                >
                  View
                </button>

                <button
                  onClick={() =>
                    onEdit(product)
                  }
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    onAddStock(product)
                  }
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
                >
                  Add Stock
                </button>

                <button
                  onClick={() =>
                    onRemoveStock(product)
                  }
                  className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
                >
                  Remove Stock
                </button>

                <button
                  onClick={() =>
                    onDelete(product.id)
                  }
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
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
                  className="px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
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