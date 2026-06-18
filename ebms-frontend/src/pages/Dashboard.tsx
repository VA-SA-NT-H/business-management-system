import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import StatCard from "../components/dashboard/StatCard";

import { getDashboardSummary } from "../services/reportApi";

import {
  Users,
  Package,
  ShoppingCart,
  IndianRupee
} from "lucide-react";

import {
  type DashboardSummary,
  type TopProduct
} from "../types/report";

import RevenueChart from "../components/dashboard/RevenueChart";

import TopProductsTable from "../components/dashboard/TopProductsTable";

import InventoryWidget from "../components/dashboard/InventoryWidget";

import {
  getRevenueReport,
  getTopProducts
} from "../services/reportApi";

const Dashboard = () => {

  const [data, setData] =
    useState<DashboardSummary | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [revenue, setRevenue] =
  useState<any>(null);

  const [topProducts, setTopProducts] =
  useState<TopProduct[]>([]);

  useEffect(() => {

    const loadDashboard =
      async () => {

        const revenueData =
  await getRevenueReport();

  const topProductsData =
    await getTopProducts();

  setRevenue(revenueData);

  setTopProducts(
    topProductsData
  );

        try {

          const response =
            await getDashboardSummary();

          setData(response);
        }
        catch {

          setError(
            "Failed to load dashboard"
          );
        }
        finally {

          setLoading(false);
        }
      };

    loadDashboard();

  }, []);

  return (
  <MainLayout>

    <h1
      className="
      text-3xl
      font-bold
      mb-8"
    >
      Dashboard
    </h1>

    {loading && (
      <div>Loading dashboard...</div>
    )}

    {error && (
      <div className="text-red-500">
        {error}
      </div>
    )}

    {data && (

      <>
        {/* KPI Cards */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6"
        >

          <StatCard
            title="Customers"
            value={data.totalCustomers}
            icon={<Users />}
          />

          <StatCard
            title="Products"
            value={data.totalProducts}
            icon={<Package />}
          />

          <StatCard
            title="Orders"
            value={data.totalOrders}
            icon={<ShoppingCart />}
          />

          <StatCard
            title="Revenue"
            value={`₹${data.totalRevenue.toLocaleString()}`}
            icon={<IndianRupee />}
          />

        </div>

        {/* ADD THIS SECTION HERE */}

        <div
          className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
          mt-8"
        >

          {revenue && (

            <RevenueChart
              revenue={
                revenue.totalRevenue
              }
              averageOrderValue={
                revenue.averageOrderValue
              }
            />

          )}

          <InventoryWidget
            totalProducts={
              data.totalProducts
            }
            lowStockProducts={0}
          />

        </div>

        <div className="mt-8">

          <TopProductsTable
            products={topProducts}
          />

        </div>

      </>

    )}

  </MainLayout>
);
};

export default Dashboard;