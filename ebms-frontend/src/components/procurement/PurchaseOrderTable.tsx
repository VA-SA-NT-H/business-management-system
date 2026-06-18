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

    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead>

          <tr className="bg-slate-100">

            <th className="p-3">
              PO Number
            </th>

            <th className="p-3">
              Supplier
            </th>

            <th className="p-3">
              Amount
            </th>

            <th className="p-3">
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