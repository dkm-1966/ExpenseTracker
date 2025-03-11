"use client";

import React, { FC, useEffect, useState } from "react";
import PieChart from "./PieChart";
import PeriodRemote from "./PeriodRemote";
import DropDownMenu from "./UI/DropDownMenu";
import { IFinanceVisualizationProps, IIncomeExpense } from "@/types/types";
import { ChartData } from "chart.js";
import { useAppSelector } from "@/hooks/redux";
import { pieFiltration } from "@/utils/pieFiltration";
import { periodParams } from "@/constants/params";
import useCategoryNames from "@/hooks/useCategoryNames";
import { categorize } from "@/utils/categorize";

const FinanceVisualization: FC<IFinanceVisualizationProps> = ({ type }) => {
  const [currentFinance, setCurrentFinance] = useState<IIncomeExpense[]>([]);
  const [chartData, setChartData] = useState<ChartData<"pie">>();
  const [period, setPeriod] = useState<string>("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const { selectedCategory } = useAppSelector((state) => state.categories);

  const categories =
    type === "income"
      ? useAppSelector((state) => state.categories.incomeCategories)
      : useAppSelector((state) => state.categories.expenseCategories);

  const categoriesNames = useCategoryNames(categories);

  const finances =
    type === "income"
      ? useAppSelector((state) => state.finances.income)
      : useAppSelector((state) => state.finances.expense);

  useEffect(() => {
    const colors = [];
    const chartDataset = [];
    let tempCategories = [];

    if (selectedCategory.length > 0) {
      tempCategories = selectedCategory;
    } else {
      tempCategories = categoriesNames;
    }

    if (period === "") {
      for (const category of tempCategories) {
        let totalAmount = 0;

        for (const inc of currentFinance) {
          if (inc.category === category) {
            totalAmount += inc.amount;
          }
        }

        chartDataset.push(totalAmount);
        colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
      }

      setChartData({
        labels: tempCategories,
        datasets: [
          {
            label: type,
            data: chartDataset,
            backgroundColor: colors,
          },
        ],
      });
    } else {
      setChartData(
        pieFiltration(tempCategories, type, period, currentFinance, year, month)
      );
    }
  }, [categoriesNames, currentFinance]);

  useEffect(() => {
    if (selectedCategory.length > 0) {
      const categorizedFinances = categorize(selectedCategory, finances);

      setCurrentFinance(categorizedFinances);
    } else {
      setCurrentFinance(finances);
    }
  }, [selectedCategory, finances]);

  useEffect(() => {
    if (selectedCategory.length > 0) {
      setChartData(
        pieFiltration(selectedCategory, type, period, finances, year, month)
      );
    } else {
      const formattedCategories = categories.map((item) => {
        return item.name;
      });
      setChartData(
        pieFiltration(formattedCategories, type, period, finances, year, month)
      );
    }
  }, [period, year, month, selectedCategory, categories, finances]);

  const periodSelection = (value: string) => {
    const date = new Date();

    if (value === "year") {
      setYear(date.getFullYear());
    } else if (value === "month") {
      setMonth(date.getMonth());
    }

    setPeriod(value);
  };

  return (
    <>
      <div className="text-gray-100 p-3 flex flex-col gap-3">
        <PieChart options={{}} data={chartData} />
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
      </div>
      <div className="flex pt-5 pr-5 justify-end ">
        <DropDownMenu
          title={"period"}
          params={periodParams}
          selector={periodSelection}
        />
      </div>
    </>
  );
};

export default FinanceVisualization;
