import type {
  PurchaseOrder
} from "../../types/purchaseOrder";

interface Props {
  orders: PurchaseOrder[];
}

const PurchaseOrderTable = ({
  orders
}: Props) => {

  return (

    <div className="bg-white dark:bg-slate-800 text-black dark:text-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead>

          <tr className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">

            <th className="p-3 text-left">
              PO Number
            </th>

            <th className="p-3 text-left">
              Supplier
            </th>

            <th className="p-3 text-left">
              Product Name
            </th>

            <th className="p-3 text-left">
              Quantity
            </th>

            <th className="p-3 text-left">
              Amount
            </th>

            <th className="p-3 text-left">
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map(
            (order) => (

              <tr
                key={order.id}
                className="border-b"
              >

                <td className="p-3">
                  {order.poNumber}
                </td>

                <td className="p-3">
                  {order.supplierName}
                </td>

                <td className="p-3">
                  {order.productName ?? "N/A"}
                </td>

                <td className="p-3 text-center md:text-left">
                  {order.quantity ?? 0}
                </td>

                <td className="p-3">
                  ₹{order.totalAmount}
                </td>

                <td className="p-3">
                  {order.orderDate}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
};

export default PurchaseOrderTable;