import { useEffect, useState } from "react";
import { ChartData } from "chart.js";
import { pieFiltration } from "@/utils/pieFiltration";
import { IIncomeExpense } from "@/types/types";

const useChartData = (
  categoriesNames: string[],
  type: string,
  period: string,
  currentFinance: IIncomeExpense[],
  year: number,
  month: number,
  selectedCategory: string[]
) => {
  const [chartData, setChartData] = useState<ChartData<"pie">>();

  useEffect(() => {
    if (selectedCategory.length > 0) {
      setChartData(pieFiltration(selectedCategory, type, period, currentFinance, year, month));
    } else {
      setChartData(pieFiltration(categoriesNames, type, period, currentFinance, year, month));
    }
  }, [categoriesNames, currentFinance, period, year, month, selectedCategory]);

  return chartData;
};

export default useChartData;
