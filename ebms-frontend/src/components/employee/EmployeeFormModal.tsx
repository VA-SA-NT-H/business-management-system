import { useEffect, useState } from "react";
import type { Employee } from "../../types/employee";

interface Props {
  open: boolean;
  employee?: Employee | null;
  onClose: () => void;
  onSubmit: (employee: Partial<Employee>) => void;
}

const EmployeeFormModal = ({
  open,
  employee,
  onClose,
  onSubmit
}: Props) => {

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: 0
  });

  useEffect(() => {

    if (employee) {

      setForm({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        designation: employee.designation,
        salary: employee.salary
      });

    } else {

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: 0
      });

    }

  }, [employee]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "salary"
          ? Number(e.target.value)
          : e.target.value
    });

  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl p-6 w-[600px]">

        <h2 className="text-2xl font-bold mb-6">
          {employee
            ? "Edit Employee"
            : "Add Employee"}
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="border rounded p-3"
          />

          <input
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="border rounded p-3"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border rounded p-3"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="border rounded p-3"
          />

          <input
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            className="border rounded p-3"
          />

          <input
            name="designation"
            placeholder="Designation"
            value={form.designation}
            onChange={handleChange}
            className="border rounded p-3"
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
            className="border rounded p-3 col-span-2"
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => onSubmit(form)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
};

export default EmployeeFormModal;