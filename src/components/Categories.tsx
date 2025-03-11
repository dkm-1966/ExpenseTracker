"use client";

import {
  addCategory,
  addExpenseCategory,
  refreshSelectedCategory,
} from "@/store/slices/categoriesSlice";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { v4 as uuid } from "uuid";
import Category from "./Category";
import { ICategoriesProps } from "@/types/types";

const Categories: FC<ICategoriesProps> = ({ type }) => {
  const categories =
    type === "income"
      ? useAppSelector((state) => state.categories.incomeCategories)
      : useAppSelector((state) => state.categories.expenseCategories);
  const selectedCategory = useAppSelector(
    (state) => state.categories.selectedCategory
  );
  const dispatch = useAppDispatch();

  const add = type === "income" ? addCategory : addExpenseCategory;

  useEffect(() => {
    if (selectedCategory.length > 0) {
      dispatch(refreshSelectedCategory());
    }
  }, []);

  const addNewCategory = () => {
    dispatch(add({ id: uuid(), name: "" }));
  };

  return (
    <div className="flex gap-3 flex-wrap items-center">
      {categories?.map((category) => {
        return (
          <Category
            categories={categories}
            category={category}
            type={type}
            key={category.id}
          />
        );
      })}
      <button
        className="bg-transparent hover:bg-blue-500 duration-200 text-white text-2xl w-5 h-5 rounded-full flex items-center justify-center cursor-pointer"
        onClick={addNewCategory}
      >
        +
      </button>
    </div>
  );
};

export default Categories;
