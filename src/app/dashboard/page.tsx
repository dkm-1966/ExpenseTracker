"use client";

import LineChart from "@/components/LineChart";
import { ChartData } from "chart.js";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import { filterData } from "@/utils/filtration";
import FiltrationParams from "@/components/FiltrationParams";
import PeriodRemote from "@/components/PeriodRemote";
import { IIncomeExpense } from "@/types/types";

const Dashboard: FC = () => {
  const [period, setPeriod] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [chartData, setChartData] = useState<ChartData<"line">>();
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth());

  useEffect(() => {
    if (type && period) {
      distribution(type, period);
    }
  }, [type, period, year, month]);

  const income = useAppSelector((state) =>
    state.finances.income.map((item) => ({
      ...item,
      date: new Date(item.date),
    }))
  );

  const expense = useAppSelector((state) =>
    state.finances.expense.map((item) => ({
      ...item,
      date: new Date(item.date),
    }))
  );

  const periodSelection = (value: string) => {
    const date = new Date();

    if (value === "year") {
      setYear(date.getFullYear());
    } else if (value === "month") {
      setMonth(date.getMonth());
    }

    setPeriod(value);
  };

  const typeSelection = (value: string) => {
    setType(value);
  };

  function distribution(type: string, period: string) {
    let incomeCopy = [...income];
    let expenseCopy = [...expense];

    if (type === "income") {
      setChartData(filterData(period, type, incomeCopy, year, month));
    } else {
      setChartData(filterData(period, type, expenseCopy, year, month));
    }
  }

  return (
    <main className="flex flex-col w-full">
      <FiltrationParams
        typeSelection={typeSelection}
        periodSelection={periodSelection}
      />
      <div className="w-full p-6 flex flex-col justify-center gap-3 ">
        <h1 className="text-blue-500 text-center">Analytics</h1>
        <div className="w-full flex justify-center">
          <LineChart data={chartData} options={{}} />
        </div>
      </div>
      {period === "year" && (
        <PeriodRemote
          period={period}
          value={year}
          monthSetter={setMonth}
          yearSetter={setYear}
        />
      )}
      {period === "month" && (
        <PeriodRemote
          period={period}
          value={month}
          monthSetter={setMonth}
          yearSetter={setYear}
        />
      )}
    </main>
  );
};

export default Dashboard;
