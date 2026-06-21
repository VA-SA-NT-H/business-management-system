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
      dark:bg-slate-800
      text-black
      dark:text-white
      rounded-2xl
      shadow-sm
      border
      border-slate-200
      dark:border-slate-700
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
            text-slate-500
            dark:text-slate-400"
          >
            {title}
          </p>

          <h2
            className="
            text-3xl
            font-bold
            mt-2
            text-black
            dark:text-white"
          >
            {value}
          </h2>

        </div>

        <div
          className="
          text-blue-600
          dark:text-blue-400"
        >
          {icon}
        </div>

      </div>

    </div>
  );
};

export default StatCard;