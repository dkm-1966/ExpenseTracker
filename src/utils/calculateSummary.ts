import { IIncomeExpense, IResult } from "@/types/types";

export const calculateSummary = (
  startDate: Date | undefined,
  endDate: Date | undefined,
  income: IIncomeExpense[],
  expense: IIncomeExpense[]
) => {
  let sum = 0;

  const result: IResult = {
    totalIncome: 0,
    totalExpense: 0,
  };

  if (startDate && endDate) {
    for (const inc of income) {
      const incDate = new Date(inc.date);

      if (incDate >= startDate && incDate <= endDate) {
        sum += inc.amount;
      }
    }

    result.totalIncome = sum;
    sum = 0;

    for (const exp of expense) {
      const expDate = new Date(exp.date);

      if (expDate >= startDate && expDate <= endDate) {
        sum += exp.amount;
      }
    }

    result.totalExpense = sum;
  } else {
    for (const inc of income) {
      sum += inc.amount;
    }

    result.totalIncome = sum;
    sum = 0;

    for (const exp of expense) {
      sum += exp.amount;
    }

    result.totalExpense = sum;
  }

  return result;
};
