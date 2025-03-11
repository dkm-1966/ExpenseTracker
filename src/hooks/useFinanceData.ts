import { IIncomeExpense } from "@/types/types";
import { useEffect, useState } from "react";

const useFinanceData = (
  finances: IIncomeExpense[],
  selectedCategory: string[]
) => {
  const [currentFinance, setCurrentFinance] = useState<IIncomeExpense[]>([]);

  useEffect(() => {
    if (selectedCategory.length > 0) {
      const categorizedFinances = finances.filter((finance) =>
        selectedCategory.includes(finance.category)
      );
      setCurrentFinance(categorizedFinances);
    } else {
      setCurrentFinance(finances);
    }
  }, [selectedCategory, finances]);

  return currentFinance;
};

export default useFinanceData;
