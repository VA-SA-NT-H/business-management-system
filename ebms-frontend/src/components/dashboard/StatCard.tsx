import React from "react";

interface StatCardProps {

  title: string;

  value: string | number;

  icon?: React.ReactNode;
}

const StatCard = ({
  title,
  value,
  icon
}: StatCardProps) => {

  return (

    <div
      className="
      bg-white
      rounded-2xl
      shadow-sm
      border
      border-slate-200
      p-6
      hover:shadow-md
      transition-all"
    >

      <div
        className="
        flex
        justify-between
        items-center"
      >

        <div>

          <p
            className="
            text-sm
            text-slate-500"
          >
            {title}
          </p>

          <h2
            className="
            text-3xl
            font-bold
            mt-2"
          >
            {value}
          </h2>

        </div>

        <div
          className="
          text-blue-600"
        >
          {icon}
        </div>

      </div>

    </div>
  );
};

export default StatCard;