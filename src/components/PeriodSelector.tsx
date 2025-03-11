"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  setCalculatedExpense,
  setCalculatedIncome,
  setExpenseRatio,
  setIncomeRatio,
} from "@/store/slices/calculatedFinancesSlice";
import { calculateRatio } from "@/utils/calculateRatio";
import { calculateSummary } from "@/utils/calculateSummary";
import { DatePicker, DatePickerProps } from "antd";
import { useEffect, useState } from "react";

const PeriodSelector = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { income, expense } = useAppSelector((state) => state.finances);
  const { calculatedIncome, calculatedExpense } = useAppSelector(
    (state) => state.calculatedFinances
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const calculatedFinances = calculateSummary(
      startDate,
      endDate,
      income,
      expense
    );

    dispatch(setCalculatedIncome(calculatedFinances.totalIncome));
    dispatch(setCalculatedExpense(calculatedFinances.totalExpense));
  }, [startDate, endDate]);

  useEffect(() => {
    const ratio = calculateRatio(calculatedIncome, calculatedExpense);

    dispatch(setIncomeRatio(ratio.incomeRatio));
    dispatch(setExpenseRatio(ratio.expenseRatio));
  }, [calculatedIncome, calculatedExpense]);

  const selectStartDate: DatePickerProps["onChange"] = (date, dateString) => {
    let formattedDate: Date | undefined;

    if (Array.isArray(dateString)) {
      formattedDate = new Date(dateString[0]);
      setStartDate(formattedDate);
    } else {
      formattedDate = new Date(dateString);
      setStartDate(formattedDate);
    }
  };

  const selectEndDate: DatePickerProps["onChange"] = (date, dateString) => {
    let formattedDate: Date | undefined;

    if (Array.isArray(dateString)) {
      formattedDate = new Date(dateString[0]);
      setEndDate(formattedDate);
    } else {
      formattedDate = new Date(dateString);
      setEndDate(formattedDate);
    }
  };
  return (
    <div className="flex gap-3">
      <DatePicker onChange={selectStartDate} placeholder={"Start date"} />
      <DatePicker onChange={selectEndDate} placeholder={"End date"} />
    </div>
  );
};

export default PeriodSelector;
