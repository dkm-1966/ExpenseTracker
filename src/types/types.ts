import { PayloadAction } from "@reduxjs/toolkit";
import { ChartData, ChartOptions } from "chart.js";
import { ReactNode } from "react";

//props interfaces
export interface ILayoutProps {
  children: React.ReactNode;
}

export interface IButtonProps {
  clickHandler: () => void;
  children: string;
}

export interface IDropDownMenuProps {
  title: string;
  params: string[];
  selector: (value: string) => void;
}

export type IInputProps = {
  type: string;
  id: string;
  value: string;
  placeholder?: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface IModalProps {
  children: ReactNode;
}

export interface IAddingFormProps {
  type: string;
  categories: string[];
  setVisibility: (value: boolean) => void;
}

export interface ICategoriesProps {
  type: string,
}

export interface ICategoryProps {
  categories: ICategory[];
  category: ICategory;
  type: string;
}

//
export interface IFiltrationParams {
  typeSelection: (value: string) => void;
  periodSelection: (value: string) => void;
}

export interface IFinancesProps {
  type: string;
}

export interface ILineChartProps {
  data: ChartData<"line"> | undefined;
  options?: ChartOptions<"line">;
}

export interface IPeriodRemoteProps {
  period: string;
  value: number;
  monthSetter: React.Dispatch<React.SetStateAction<number>>;
  yearSetter: React.Dispatch<React.SetStateAction<number>>;
}

export interface IPieChartProps {
  data: ChartData<"pie"> | undefined;
  options?: ChartOptions<"pie">;
}

export interface ILink {
  href: string;
  text: string;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface ICategoriesState {
  incomeCategories: ICategory[];
  expenseCategories: ICategory[];
  selectedCategory: string[];
}

export interface IIncomeExpense {
  id: string;
  date: string;
  amount: number;
  category: string;
}

export interface IFinancesState {
  income: IIncomeExpense[];
  expense: IIncomeExpense[];
}

export interface IRatio {
  incomeRatio: number;
  expenseRatio: number;
}

export interface IResult {
  totalIncome: number;
  totalExpense: number;
}

export interface IFinances {
  date: Date;
  amount: number;
}

interface IChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

export interface IChartData {
  labels: (string | number)[];
  datasets: IChartDataset[];
}

interface IPieChartDataset {
  label: string;
  data: number[];
  backgroundColor: string[];
}

export interface IPieChartData {
  labels: (string | number)[];
  datasets: IPieChartDataset[];
}

export interface IPageSlice {
  currentPage: string
}

export interface IAddingFormWrapperProps {
  type: string;
}

export interface IFinanceVisualizationProps {
  type: string;
}

export interface IAddingPage {
  type: string;
}

export interface IFinanceCardProps {
  title: string;
  link: string;
}

export interface CalculatedFinancesState {
  calculatedIncome: number;
  calculatedExpense: number;
  incomeRatio: number;
  expenseRatio: number;
}