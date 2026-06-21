import type { Customer } from "../../types/customer";

interface Props {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: number) => void;
}

const CustomerTable = ({
  customers,
  onEdit,
  onDelete
}: Props) => {

  return (

    <div
      className="
      bg-white
      dark:bg-slate-800
      text-black
      dark:text-white
      rounded-xl
      shadow
      overflow-hidden"
    >

      <table
        className="
        w-full"
      >

        <thead>

          <tr
            className="
            bg-slate-100
            dark:bg-slate-700
            text-slate-700
            dark:text-slate-200"
          >

            <th className="p-3 text-left">ID</th>

            <th className="p-3 text-left">Name</th>

            <th className="p-3 text-left">Email</th>

            <th className="p-3 text-left">Phone</th>

            <th className="p-3 text-left">Actions</th>

          </tr>

        </thead>

        <tbody>

          {customers.map(
            (customer) => (

              <tr
                key={customer.id}
                className="
                border-b"
              >

                <td className="p-3">
                  {customer.id}
                </td>

                <td className="p-3">
                  {customer.name}
                </td>

                <td className="p-3">
                  {customer.email}
                </td>

                <td className="p-3">
                  {customer.phone}
                </td>

                <td className="p-3">

                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
                      onClick={() => onEdit(customer)}
                    >
                      Edit
                    </button>

                    <button
                      className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
                      onClick={() =>
                        onDelete(
                          customer.id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>

                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
};

export default CustomerTable;