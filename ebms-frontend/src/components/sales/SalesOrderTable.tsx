import type {
  SalesOrder
} from "../../types/salesOrder";

interface Props {
  orders: SalesOrder[];
}

const SalesOrderTable = ({
  orders
}: Props) => {

  return (

    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead>

          <tr className="bg-slate-100">

            <th className="p-3 text-left">
              Order Number
            </th>

            <th className="p-3 text-left">
              Customer
            </th>

            <th className="p-3 text-left">
              Amount
            </th>

            <th className="p-3 text-left">
              Date
            </th>

            <th className="p-3 text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map(order => (

            <tr
              key={order.id}
              className="border-b"
            >

              <td className="p-3">
                {order.orderNumber}
              </td>

              <td className="p-3">
                {order.customerName}
              </td>

              <td className="p-3">
                ₹{order.totalAmount}
              </td>

              <td className="p-3">
                {order.orderDate}
              </td>

              <td className="p-3">

                <span className="text-green-600">
                  {order.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
};

export default SalesOrderTable;