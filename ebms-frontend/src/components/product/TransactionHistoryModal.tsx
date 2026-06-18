import type {
  InventoryTransaction
} from "../../types/inventoryTransaction";

interface Props {
  open: boolean;
  onClose: () => void;
  transactions: InventoryTransaction[];
}

const TransactionHistoryModal = ({
  open,
  onClose,
  transactions
}: Props) => {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-[700px]">

        <div className="flex justify-between mb-4">

          <h2 className="text-xl font-bold">
            Transaction History
          </h2>

          <button
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-2">
                Date
              </th>

              <th className="text-left py-2">
                Type
              </th>

              <th className="text-left py-2">
                Quantity
              </th>

            </tr>

          </thead>

          <tbody>

            {transactions.map(
              (transaction) => (

                <tr
                  key={transaction.id}
                  className="border-b"
                >

                  <td className="py-3">
                    {new Date(
                      transaction.transactionDate
                    ).toLocaleString()}
                  </td>

                  <td>
                    {transaction.transactionType}
                  </td>

                  <td>
                    {transaction.quantity}
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default TransactionHistoryModal;