import {
  useEffect,
  useState
} from "react";

import MainLayout from "../layouts/MainLayout";

import ProductTable from "../components/product/ProductTable";

import ProductSearch from "../components/product/ProductSearch";

import TransactionHistoryModal from "../components/product/TransactionHistoryModal";

import {
  getProducts,
  deleteProduct,
  getTransactions,
  createProduct,
  updateProduct,
  addStock,
  removeStock
} from "../services/productApi";

import type {
  Product
} from "../types/product";

import type {
  InventoryTransaction
} from "../types/inventoryTransaction";

import ProductFormModal from "../components/product/ProductFormModal";

import StockUpdateModal from "../components/product/StockUpdateModal";

import Skeleton from "../components/common/Skeleton";

import EmptyState from "../components/common/EmptyState";

const Products = () => {

  const [products,
    setProducts] =
    useState<Product[]>([]);

  const [search,
    setSearch] =
    useState("");

  const [transactions,
    setTransactions] =
    useState<
      InventoryTransaction[]
    >([]);

  const [showTransactions,
    setShowTransactions] =
    useState(false);

  const [loading,
    setLoading] =
    useState(true);

  const [selectedProduct,
  setSelectedProduct] =
  useState<Product | null>(
    null
  );

  const [showProductModal,
    setShowProductModal] =
    useState(false);

  const [showStockModal,
    setShowStockModal] =
    useState(false);

  const [stockMode,
    setStockMode] =
    useState<
      "ADD" | "REMOVE"
    >("ADD");

  useEffect(() => {

    loadProducts();

  }, []);

  const loadProducts =
    async () => {

      try {

        const data =
          await getProducts();

        setProducts(data.content);
      }
      catch (error) {

        console.error(error);
      }
      finally {

        setLoading(false);
      }
    };

  const handleDelete =
    async (id: number) => {

      const confirmed =
        window.confirm(
          "Delete this product?"
        );

      if (!confirmed)
        return;

      try {

        await deleteProduct(id);

        loadProducts();
      }
      catch (error) {

        console.error(error);
      }
    };

  const handleViewTransactions =
    async (
      productId: number
    ) => {

      try {

        const data =
          await getTransactions(
            productId
          );

        setTransactions(data);

        setShowTransactions(
          true
        );
      }
      catch (error) {

        console.error(error);
      }
    };

    const handleSaveProduct =
  async (
    productData:
      Partial<Product>
  ) => {

    try {

      if (
        selectedProduct
      ) {

        await updateProduct(
          selectedProduct.id,
          productData
        );

      } else {

        await createProduct(
          productData
        );
      }

      setShowProductModal(
        false
      );

      setSelectedProduct(
        null
      );

      loadProducts();

    } catch (error) {

      console.error(error);
    }
  };

  const handleStockUpdate =
  async (
    quantity: number
  ) => {

    if (
      !selectedProduct
    ) return;

    try {

      if (
        stockMode === "ADD"
      ) {

        await addStock(
          selectedProduct.id,
          quantity
        );

      } else {

        await removeStock(
          selectedProduct.id,
          quantity
        );
      }

      setShowStockModal(
        false
      );

      loadProducts();

    } catch (error) {

      console.error(error);
    }
  };

  const handleCreate =
  () => {

    setSelectedProduct(
      null
    );

    setShowProductModal(
      true
    );
  };

const handleEdit =
  (
    product: Product
  ) => {

    setSelectedProduct(
      product
    );

    setShowProductModal(
      true
    );
  };

const handleAddStock =
  (
    product: Product
  ) => {

    setSelectedProduct(
      product
    );

    setStockMode("ADD");

    setShowStockModal(
      true
    );
  };

const handleRemoveStock =
  (
    product: Product
  ) => {

    setSelectedProduct(
      product
    );

    setStockMode(
      "REMOVE"
    );

    setShowStockModal(
      true
    );
  };
  console.log(products);
  const filteredProducts =
    products.filter(
      (product) =>
        (product.name ?? "")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
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
          Products
        </h1>

        <ProductSearch
          value={search}
          onChange={setSearch}
        />

      </div>
      
      <button
        onClick={handleCreate}
        className="
        bg-blue-600
        text-white
        px-4
        py-2
        rounded-lg"
      >
        Add Product
      </button>

  {loading ? (

  <Skeleton />

) : filteredProducts.length === 0 ? (

  <EmptyState
    message="No products found"
  />

) : (

  <ProductTable
    products={filteredProducts}
    onDelete={handleDelete}
    onViewTransactions={handleViewTransactions}
    onEdit={handleEdit}
    onAddStock={handleAddStock}
    onRemoveStock={handleRemoveStock}
  />

)}

      <TransactionHistoryModal
        open={
          showTransactions
        }
        onClose={() =>
          setShowTransactions(
            false
          )
        }
        transactions={
          transactions
        }
      />

      <ProductFormModal
        open={
          showProductModal
        }
        product={
          selectedProduct
        }
        onClose={() =>
          setShowProductModal(
            false
          )
        }
        onSubmit={
          handleSaveProduct
        }
      />

      <StockUpdateModal
        open={
          showStockModal
        }
        mode={
          stockMode
        }
        onClose={() =>
          setShowStockModal(
            false
          )
        }
        onSubmit={
          handleStockUpdate
        }
      />

    </MainLayout>

  );
};

export default Products;