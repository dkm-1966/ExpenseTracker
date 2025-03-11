import Finances from "@/components/Finances";
import Categories from "@/components/Categories";
import AddingFormWrapper from "./AddingFormWrapper";
import FinanceVisualization from "./FinanceVisualization";
import { FC } from "react";
import { IAddingPage } from "@/types/types";

const AddingPage: FC<IAddingPage> = ({ type }) => {
  return (
    <main className="grid grid-cols-[33.333333%_55%_auto] gap-4">
      <div className="flex flex-col gap-3 p-5 h-screen">
        <Categories type={type} />
        <Finances type={type} />
        <AddingFormWrapper type={type} />
      </div>
      <FinanceVisualization type={type} />
    </main>
  );
};

export default AddingPage;
