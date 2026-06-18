import type {
  TopProduct
} from "../../types/report";

interface Props {
  products: TopProduct[];
}

const TopProductsTable = ({
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

        <h2
          className="
          text-xl
          font-bold"
        >
          Top Selling Products
        </h2>

      </div>

      <table className="w-full">

        <thead>

          <tr
            className="
            bg-slate-100
            dark:bg-slate-700"
          >

            <th
              className="
              p-3
              text-left"
            >
              Product Name
            </th>

            <th
              className="
              p-3
              text-left"
            >
              Quantity Sold
            </th>

          </tr>

        </thead>

        <tbody>

          {products.length > 0 ? (

            products.map(
              (
                product,
                index
              ) => (

                <tr
                  key={index}
                  className="
                  border-b"
                >

                  <td
                    className="
                    p-3"
                  >
                    {product.productName}
                  </td>

                  <td
                    className="
                    p-3
                    font-medium"
                  >
                    {product.quantitySold}
                  </td>

                </tr>

              )
            )

          ) : (

            <tr>

              <td
                colSpan={2}
                className="
                p-6
                text-center
                text-slate-500"
              >
                No product sales data available
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );
};

export default TopProductsTable;