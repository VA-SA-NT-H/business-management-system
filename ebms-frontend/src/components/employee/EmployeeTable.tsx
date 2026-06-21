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

    <div className="bg-white dark:bg-slate-800 text-black dark:text-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead>

          <tr className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">

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

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        onEdit(employee)
                      }
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        onDelete(employee.id)
                      }
                      className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
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