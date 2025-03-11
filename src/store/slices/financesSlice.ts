import { IFinancesState, IIncomeExpense } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const financesInitialState: IFinancesState = {
  income: [],
  expense: []
};

const financesSlice = createSlice({
  name: "finances",
  initialState: financesInitialState,
  reducers: {
    setIncome: (state, action: PayloadAction<IIncomeExpense>) => {
      state.income.push(action.payload);
    },
    removeIncome: (state, action: PayloadAction<string>) => {
      state.income = state.income.filter(
        (income) => income.id !== action.payload
      );
    },
    cascadeRemoveIncome: (state, action: PayloadAction<string>) => {
      state.income = state.income.filter(
        (income) => income.category !== action.payload
      );
    },
    setExpense: (state, action: PayloadAction<IIncomeExpense>) => {
      state.expense.push(action.payload);
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      state.expense = state.expense.filter(
        (expense) => expense.id !== action.payload
      );
    },
    cascadeRemoveExpense: (state, action: PayloadAction<string>) => {
      state.expense = state.expense.filter(
        (expense) => expense.category !== action.payload
      );
    },
  },
});

export const {
  setIncome,
  removeIncome,
  setExpense,
  removeExpense,
  cascadeRemoveIncome,
  cascadeRemoveExpense,
} = financesSlice.actions;

export const financesReducer = financesSlice.reducer;
