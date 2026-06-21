import type {
  Supplier
} from "../../types/supplier";

interface Props {

  suppliers: Supplier[];

  onEdit: (
    supplier: Supplier
  ) => void;

  onDelete: (
    id: number
  ) => void;
}

const SupplierTable = ({
  suppliers,
  onEdit,
  onDelete
}: Props) => {

  return (

    <div className="bg-white dark:bg-slate-800 text-black dark:text-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead>

          <tr className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">

            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Actions</th>

          </tr>

        </thead>

        <tbody>

          {suppliers.map(
            supplier => (

              <tr
                key={supplier.id}
                className="border-b"
              >

                <td className="p-3">
                  {supplier.supplierCode}
                </td>

                <td className="p-3">
                  {supplier.supplierName}
                </td>

                <td className="p-3">
                  {supplier.email}
                </td>

                <td className="p-3">
                  {supplier.phone}
                </td>

                <td className="p-3">

                  <div className="flex gap-2">

                    <button
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
                      onClick={() =>
                        onEdit(
                          supplier
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
                      onClick={() =>
                        onDelete(
                          supplier.id
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

export default SupplierTable;