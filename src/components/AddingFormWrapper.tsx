"use client";

import React, { FC, useState } from "react";
import AddingForm from "./AddingForm";
import useCategoryNames from "@/hooks/useCategoryNames";
import { IAddingFormWrapperProps } from "@/types/types";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import { useAppSelector } from "@/hooks/redux";

const AddingFormWrapper: FC<IAddingFormWrapperProps> = ({ type }) => {
  const [showAddingForm, setShowAddingForm] = useState<boolean>(false);
  const { incomeCategories, expenseCategories } = useAppSelector(
    (state) => state.categories
  );

  const categories = type === "income" ? incomeCategories : expenseCategories;

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
