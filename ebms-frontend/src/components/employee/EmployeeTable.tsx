import type { Employee } from "../../types/employee";

interface Props {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

const EmployeeTable = ({
  employees,
  onEdit,
  onDelete
}: Props) => {

  return (

    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead>

          <tr className="bg-slate-100">

            <th className="p-3 text-left">
              Code
            </th>

            <th className="p-3 text-left">
              Name
            </th>

            <th className="p-3 text-left">
              Department
            </th>

            <th className="p-3 text-left">
              Designation
            </th>

            <th className="p-3 text-left">
              Salary
            </th>

            <th className="p-3 text-left">
              Email
            </th>

            <th className="p-3 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {employees.map(
            (employee) => (

              <tr
                key={employee.id}
                className="border-b"
              >

                <td className="p-3">
                  {employee.employeeCode}
                </td>

                <td className="p-3">
                  {employee.firstName} {employee.lastName}
                </td>

                <td className="p-3">
                  {employee.department}
                </td>

                <td className="p-3">
                  {employee.designation}
                </td>

                <td className="p-3">
                  ₹{employee.salary.toLocaleString()}
                </td>

                <td className="p-3">
                  {employee.email}
                </td>

                <td className="p-3">

                  <div className="flex gap-3">

                    <button
                      onClick={() =>
                        onEdit(employee)
                      }
                      className="text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        onDelete(employee.id)
                      }
                      className="text-red-600"
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

export default EmployeeTable;