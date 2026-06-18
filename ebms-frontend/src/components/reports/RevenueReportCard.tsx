interface Props {

  totalRevenue: number;

  averageOrderValue: number;

  totalOrders: number;
}

const RevenueReportCard = ({
  totalRevenue,
  averageOrderValue,
  totalOrders
}: Props) => {

  return (

    <div
      className="
      bg-white
      dark:bg-slate-800
      rounded-xl
      shadow
      p-6"
    >

      <h2
        className="
        text-xl
        font-bold
        mb-4"
      >
        Revenue Summary
      </h2>

      <div className="space-y-4">

        <div>

          <p className="text-slate-500">
            Total Revenue
          </p>

          <h3 className="text-3xl font-bold">
            ₹{totalRevenue.toLocaleString()}
          </h3>

        </div>

        <div>

          <p className="text-slate-500">
            Average Order Value
          </p>

          <h3 className="text-xl font-semibold">
            ₹{averageOrderValue.toLocaleString()}
          </h3>

        </div>

        <div>

          <p className="text-slate-500">
            Total Orders
          </p>

          <h3 className="text-xl font-semibold">
            {totalOrders}
          </h3>

        </div>

      </div>

    </div>

  );
};

export default RevenueReportCard;