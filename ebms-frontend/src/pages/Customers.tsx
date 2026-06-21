import {
  useEffect,
  useState
} from "react";

import MainLayout from "../layouts/MainLayout";

import CustomerTable from "../components/customer/CustomerTable";
import CustomerFormModal from "../components/customer/CustomerFormModal";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer
} from "../services/customerApi";

import type {
  Customer
} from "../types/customer";

const Customers = () => {

  const [customers,
    setCustomers] =
    useState<Customer[]>([]);

  const [search,
    setSearch] =
    useState("");

  const [showModal,
    setShowModal] =
    useState(false);

  const [selectedCustomer,
    setSelectedCustomer] =
    useState<Customer | null>(null);

  useEffect(() => {

    loadCustomers();

  }, []);

  const loadCustomers =
    async () => {
      try {
        const data =
          await getCustomers();

        setCustomers(data);
      } catch (error) {
        console.error(error);
      }
    };

  const handleSave =
    async (
      customerData: Partial<Customer>
    ) => {

      try {

        if (selectedCustomer) {

          await updateCustomer(
            selectedCustomer.id,
            customerData
          );

        } else {

          await createCustomer(
            customerData
          );

        }

        setShowModal(false);
        setSelectedCustomer(null);

        loadCustomers();

      } catch (error) {

        console.error(error);

      }

    };

  const handleDelete =
    async (id: number) => {

      const confirmed =
        window.confirm(
          "Delete this customer?"
        );

      if (!confirmed) return;

      try {

        await deleteCustomer(id);

        loadCustomers();

      } catch (error) {

        console.error(error);

      }

    };

  const filteredCustomers = customers.filter(
    (customer) =>
      (customer.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (customer.email ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (customer.phone ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (

    <MainLayout>

      <div
        className="
        flex
        justify-between
        items-center
        mb-6"
      >

        <h1
          className="
          text-3xl
          font-bold"
        >
          Customers
        </h1>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers..."
            className="border rounded-lg px-4 py-2 w-80 text-black dark:text-white bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => {
              setSelectedCustomer(null);
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded-lg whitespace-nowrap"
          >
            Add Customer
          </button>
        </div>

      </div>

      <CustomerTable
        customers={filteredCustomers}
        onEdit={(customer) => {
          setSelectedCustomer(customer);
          setShowModal(true);
        }}
        onDelete={handleDelete}
      />

      <CustomerFormModal
        open={showModal}
        customer={selectedCustomer}
        onClose={() => {
          setShowModal(false);
          setSelectedCustomer(null);
        }}
        onSubmit={handleSave}
      />

    </MainLayout>
  );
};

export default Customers;