interface Props {

  totalProducts: number;

  lowStockProducts: number;
}

const InventoryWidget = ({
  totalProducts,
  lowStockProducts
}: Props) => {

  return (

    <div
      className="
      bg-white
      dark:bg-slate-800
      text-black
      dark:text-white
      rounded-2xl
      shadow-sm
      border
      border-slate-200
      dark:border-slate-700
      p-6"
    >

      <h2
        className="
        text-xl
        font-semibold
        mb-4
        text-black
        dark:text-white"
      >
        Inventory Status
      </h2>

      <div className="space-y-3">

        <div>
          Total Products:
          <strong>
            {" "}
            {totalProducts}
          </strong>
        </div>

        <div>
          Low Stock:
          <strong>
            {" "}
            {lowStockProducts}
          </strong>
        </div>

      </div>

    </div>
  );
};

export default InventoryWidget;