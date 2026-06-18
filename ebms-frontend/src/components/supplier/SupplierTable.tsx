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

    <div className="bg-white rounded-xl shadow">

      <table className="w-full">

        <thead>

          <tr className="bg-slate-100">

            <th>Code</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {suppliers.map(
            supplier => (

              <tr
                key={supplier.id}
              >

                <td>
                  {supplier.supplierCode}
                </td>

                <td>
                  {supplier.supplierName}
                </td>

                <td>
                  {supplier.email}
                </td>

                <td>
                  {supplier.phone}
                </td>

                <td>

                  <button
                    onClick={() =>
                      onEdit(
                        supplier
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      onDelete(
                        supplier.id
                      )
                    }
                  >
                    Delete
                  </button>

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