import { CalculatedFinancesState } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CalculatedFinancesState = {
  calculatedIncome: 0,
  calculatedExpense: 0,
  incomeRatio: 0,
  expenseRatio: 0,
};

const calculatedFinancesSlice = createSlice({
  name: "calculatedFinances",
  initialState,
  reducers: {
    setCalculatedIncome: (state, action: PayloadAction<number>) => {
      state.calculatedIncome = action.payload;
    },
    setCalculatedExpense: (state, action: PayloadAction<number>) => {
      state.calculatedExpense = action.payload;
    },
    setIncomeRatio: (state, action: PayloadAction<number>) => {
      state.incomeRatio = action.payload;
    },
    setExpenseRatio: (state, action: PayloadAction<number>) => {
      state.expenseRatio = action.payload;
    },
  },
});

export const {
  setCalculatedIncome,
  setCalculatedExpense,
  setIncomeRatio,
  setExpenseRatio,
} = calculatedFinancesSlice.actions;
export const calculatedFinancesReducer = calculatedFinancesSlice.reducer;
