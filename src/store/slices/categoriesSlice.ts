import { ICategoriesState, ICategory } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialCategoriesState: ICategoriesState = {
  incomeCategories: [],
  expenseCategories: [],
  selectedCategory: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialCategoriesState,
  reducers: {
    addCategory: (state, action: PayloadAction<ICategory>) => {
      state.incomeCategories.push(action.payload);
    },
    mutateCategory: (state, action: PayloadAction<ICategory>) => {
      const updatedCategories = state.incomeCategories.map((category) => {
        if (category.id === action.payload.id) {
          return { ...category, ...action.payload };
        }
        return category;
      });
      state.incomeCategories = updatedCategories;
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.incomeCategories = state.incomeCategories.filter(
        (category) => category.id !== action.payload
      );
    },
    addExpenseCategory: (state, action: PayloadAction<ICategory>) => {
      state.expenseCategories.push(action.payload);
    },
    mutateExpenseCategory: (state, action: PayloadAction<ICategory>) => {
      const updatedCategories = state.expenseCategories.map((category) => {
        if (category.id === action.payload.id) {
          return { ...category, ...action.payload };
        }
        return category;
      });
      state.expenseCategories = updatedCategories;
    },
    removeExpenseCategory: (state, action: PayloadAction<string>) => {
      state.expenseCategories = state.expenseCategories.filter(
        (category) => category.id !== action.payload
      );
    },
    selectCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory.push(action.payload);
    },
    removeSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = state.selectedCategory.filter(
        (category) => category !== action.payload
      );
    },
    refreshSelectedCategory: (state) => {
      state.selectedCategory = [];
    },
  },
});

export const {
  addCategory,
  mutateCategory,
  removeCategory,
  selectCategory,
  removeSelectedCategory,
  addExpenseCategory,
  mutateExpenseCategory,
  removeExpenseCategory,
  refreshSelectedCategory
} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
