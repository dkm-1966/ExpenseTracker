import { IIncomeExpense } from "@/types/types";

export const categorize = (
  categories: string[],
  finances: IIncomeExpense[]
): IIncomeExpense[] => {
  let categorizedFinances: IIncomeExpense[] = [];

  for (const category of categories) {
    const filteredFinances = finances.filter((finance) => {
      return finance.category === category;
    });
    categorizedFinances = [...categorizedFinances, ...filteredFinances];
  }

  return categorizedFinances;
};
