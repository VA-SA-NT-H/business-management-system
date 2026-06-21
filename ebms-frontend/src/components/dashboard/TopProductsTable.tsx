import {
  type TopProduct
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
      text-black
      dark:text-white
      rounded-2xl
      shadow-sm
      border
      border-slate-200
      dark:border-slate-700
      p-6"
    >

      <h2
        className="
        text-xl
        font-semibold
        mb-4
        text-black
        dark:text-white"
      >
        Top Selling Products
      </h2>

      <table
        className="
        w-full"
      >

        <thead>

          <tr
            className="
            border-b
            border-slate-200
            dark:border-slate-700
            text-slate-700
            dark:text-slate-200"
          >

            <th
              className="
              text-left
              py-2"
            >
              Product
            </th>

            <th
              className="
              text-left
              py-2"
            >
              Units Sold
            </th>

          </tr>

        </thead>

        <tbody>

          {products.map(
            (product) => (

              <tr
                key={
                  product.productName
                }
                className="
                border-b"
              >

                <td
                  className="
                  py-3"
                >
                  {product.productName}
                </td>

                <td>
                  {product.quantitySold}
                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
};

export default TopProductsTable;