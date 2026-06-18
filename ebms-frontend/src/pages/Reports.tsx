import {
  useEffect,
  useState
} from "react";

import MainLayout from "../layouts/MainLayout";

import RevenueReportCard from "../components/reports/RevenueReportCard";

import TopProductsTable from "../components/reports/TopProductsTable";

import LowStockTable from "../components/reports/LowStockTable";

import {
  getRevenueReport,
  getTopProducts,
  getLowStockProducts
} from "../services/reportApi";

import type {
  RevenueReport,
  TopProduct
} from "../types/report";

import type {
  Product
} from "../types/product";

const Reports = () => {

  const [revenue,
    setRevenue] =
    useState<RevenueReport | null>(
      null
    );

  const [topProducts,
    setTopProducts] =
    useState<TopProduct[]>([]);

  const [lowStockProducts,
    setLowStockProducts] =
    useState<Product[]>([]);

  useEffect(() => {

    loadReports();

  }, []);

  const loadReports =
    async () => {

      try {

        const [
          revenueData,
          topProductsData,
          lowStockData
        ] = await Promise.all([
          getRevenueReport(),
          getTopProducts(),
          getLowStockProducts()
        ]);

        setRevenue(
          revenueData
        );

        setTopProducts(
          topProductsData
        );

        setLowStockProducts(
          lowStockData
        );

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <MainLayout>

      <h1
        className="
        text-3xl
        font-bold
        mb-6"
      >
        Reports
      </h1>

      {revenue && (

        <RevenueReportCard
          totalRevenue={
            revenue.totalRevenue
          }
          averageOrderValue={
            revenue.averageOrderValue
          }
          totalOrders={
            revenue.totalOrders
          }
        />

      )}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
        mt-8"
      >

        <TopProductsTable
          products={
            topProducts
          }
        />

        <LowStockTable
          products={
            lowStockProducts
          }
        />

      </div>

    </MainLayout>

  );
};

export default Reports;