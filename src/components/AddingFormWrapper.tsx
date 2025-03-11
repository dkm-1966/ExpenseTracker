"use client";

import React, { FC, useState } from "react";
import AddingForm from "./AddingForm";
import useCategoryNames from "@/hooks/useCategoryNames";
import { IAddingFormWrapperProps } from "@/types/types";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import { useAppSelector } from "@/hooks/redux";
import { setExpense, setIncome } from "@/store/slices/financesSlice";

const AddingFormWrapper: FC<IAddingFormWrapperProps> = ({ type }) => {
  const [showAddingForm, setShowAddingForm] = useState<boolean>(false);

  const categories =
    type === "income"
      ? useAppSelector((state) => state.categories.incomeCategories)
      : useAppSelector((state) => state.categories.expenseCategories);

  const categoriesNames = useCategoryNames(categories);

  const showForm = () => {
    setShowAddingForm(true);
  };

  return (
    <>
      <Button clickHandler={showForm}>Add</Button>
      {showAddingForm && (
        <Modal>
          <AddingForm
            type={type}
            categories={categoriesNames}
            setVisibility={setShowAddingForm}
          />
        </Modal>
      )}
    </>
  );
};

export default AddingFormWrapper;
