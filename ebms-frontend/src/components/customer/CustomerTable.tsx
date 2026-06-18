import type { Customer } from "../../types/customer";

interface Props {

  customers: Customer[];

  onDelete: (
    id: number
  ) => void;
}

const CustomerTable = ({
  customers,
  onDelete
}: Props) => {

  return (

    <div
      className="
      bg-white
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
            bg-slate-100"
          >

            <th>ID</th>

            <th>Name</th>

            <th>Email</th>

            <th>Phone</th>

            <th>Actions</th>

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

                <td>
                  {customer.customerCode}
                </td>

                <td>
                  {customer.firstName}
                  {" "}
                  {customer.lastName}
                </td>

                <td>
                  {customer.email}
                </td>

                <td>
                  {customer.phone}
                </td>

                <td>

                  <button
                    className="
                    text-red-500"
                    onClick={() =>
                      onDelete(
                        customer.id
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

export default CustomerTable;