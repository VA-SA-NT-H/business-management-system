import {
  useEffect,
  useState
} from "react";

import MainLayout from "../layouts/MainLayout";

import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeFormModal from "../components/employee/EmployeeFormModal";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../services/employeeApi";

import type { Employee } from "../types/employee";

const Employees = () => {

  const [employees,
    setEmployees] =
    useState<Employee[]>([]);

  const [search,
    setSearch] =
    useState("");

  const [showModal,
    setShowModal] =
    useState(false);

  const [selectedEmployee,
    setSelectedEmployee] =
    useState<Employee | null>(null);

  useEffect(() => {

    loadEmployees();

  }, []);

  const loadEmployees =
    async () => {

      try {

        const data =
          await getEmployees();

        setEmployees(data);

      } catch (error) {

        console.error(error);

      }

    };

  const handleSave =
    async (
      employeeData: Partial<Employee>
    ) => {

      try {

        if (selectedEmployee) {

          await updateEmployee(
            selectedEmployee.id,
            employeeData
          );

        } else {

          await createEmployee(
            employeeData
          );

        }

        setShowModal(false);
        setSelectedEmployee(null);

        loadEmployees();

      } catch (error) {

        console.error(error);

      }

    };

  const handleDelete =
    async (id: number) => {

      const confirmed =
        window.confirm(
          "Delete this employee?"
        );

      if (!confirmed) return;

      try {

        await deleteEmployee(id);

        loadEmployees();

      } catch (error) {

        console.error(error);

      }

    };

  const filteredEmployees =
  employees.filter(
    employee => {

      const text =
        search.toLowerCase();

      return (

        employee.employeeCode
          .toLowerCase()
          .includes(text)

        ||

        employee.firstName
          .toLowerCase()
          .includes(text)

        ||

        employee.lastName
          .toLowerCase()
          .includes(text)

        ||

        employee.email
          .toLowerCase()
          .includes(text)

        ||

        employee.department
          .toLowerCase()
          .includes(text)

        ||

        employee.designation
          .toLowerCase()
          .includes(text)

      );

    }
  );

  return (

    <MainLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Employees
        </h1>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="border rounded-lg px-4 py-2 w-80 text-black dark:text-white bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => {

              setSelectedEmployee(null);
              setShowModal(true);

            }}
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded-lg whitespace-nowrap"
          >
            Add Employee
          </button>
        </div>

      </div>

      <EmployeeTable
        employees={filteredEmployees}
        onEdit={(employee) => {

          setSelectedEmployee(employee);
          setShowModal(true);

        }}
        onDelete={handleDelete}
      />

      <EmployeeFormModal
        open={showModal}
        employee={selectedEmployee}
        onClose={() => {

          setShowModal(false);
          setSelectedEmployee(null);

        }}
        onSubmit={handleSave}
      />

    </MainLayout>

  );
};

export default Employees;