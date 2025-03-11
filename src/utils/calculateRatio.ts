import { IRatio } from "@/types/types";

export const calculateRatio = (income: number, expense: number) => {
  let incomeRatio;
  let expenseRatio;

  if (income === 0) {
    expenseRatio = expense;
  } else {
    expenseRatio = Number((expense / income).toFixed(2));
  }

  if (expense === 0) {
    incomeRatio = 0;
  } else {
    incomeRatio = Number((income / expense).toFixed(2));
  }

  const ratio: IRatio = {
    incomeRatio,
    expenseRatio,
  };

  return ratio;
};
