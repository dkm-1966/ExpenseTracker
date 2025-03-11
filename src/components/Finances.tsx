"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { removeExpense, removeIncome } from "@/store/slices/financesSlice";
import { IFinancesProps, IIncomeExpense } from "@/types/types";
import { categorize } from "@/utils/categorize";
import { FC, useEffect, useState } from "react";

const Finances: FC<IFinancesProps> = ({ type }) => {
  const [currentFinances, setCurrentFinances] = useState<IIncomeExpense[]>([]);
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector(
    (state) => state.categories.selectedCategory
  );
  const finances =
    type === "income"
      ? useAppSelector((state) => state.finances.income)
      : useAppSelector((state) => state.finances.expense);

  const removeFinance = type === "income" ? removeIncome : removeExpense;

  useEffect(() => {
    if (selectedCategories.length > 0) {
      const categorizedFinances = categorize(selectedCategories, finances);

      setCurrentFinances(categorizedFinances);
    } else {
      setCurrentFinances(finances);
    }
  }, [selectedCategories, finances]);

  const remove = (id: string) => {
    dispatch(removeFinance(id));
  };

  return (
    <div className="flex flex-col gap-3 max-h-full overflow-y-auto p-2">
      {currentFinances.map((value) => {
        return (
          <div className="flex gap-3" key={value.id}>
            <div className="flex rounded-md bg-white p-3 justify-between w-full">
              <p className="text-green-500 font-semibold">{value.amount}</p>
              <div className="flex gap-3">
                <p>{value.category}</p>
                <p className="text-gray-500">{value.date.split("T")[0]}</p>
              </div>
            </div>
            <button
              className="flex items-center focus:outline-none rounded-md p-1 border border-gray-500 text-gray-400 bg-gray-800 cursor-pointer hover:bg-gray-900 duration-200"
              onClick={() => remove(value.id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Finances;
