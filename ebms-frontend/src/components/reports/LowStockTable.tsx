import type {
  Product
} from "../../types/product";

interface Props {
  products: Product[];
}

const LowStockTable = ({
  products
}: Props) => {

  return (

    <div
      className="
      bg-white
      dark:bg-slate-800
      rounded-xl
      shadow
      overflow-hidden"
    >

      <div className="p-4">

        <h2 className="text-xl font-bold">
          Low Stock Products
        </h2>

      </div>

      <table className="w-full">

        <thead>

          <tr className="bg-slate-100 dark:bg-slate-700">

            <th className="p-3 text-left">
              Product
            </th>

            <th className="p-3 text-left">
              Current Stock
            </th>

            <th className="p-3 text-left">
              Reorder Level
            </th>

          </tr>

        </thead>

        <tbody>

          {products.map(
            (product) => (

              <tr
                key={product.id}
                className="border-b"
              >

                <td className="p-3">
                  {product.name}
                </td>

                <td className="p-3 text-red-600 font-medium">
                  {product.stockQuantity}
                </td>

                <td className="p-3">
                  {product.reorderLevel}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  );
};

export default LowStockTable;