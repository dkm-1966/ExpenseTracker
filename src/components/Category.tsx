import { useAppDispatch } from "@/hooks/redux";
import { FC, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "./UI/Modal";
import toast from "react-hot-toast";
import ErrorToast from "@/utils/ErrorToast";
import { ICategory, ICategoryProps } from "@/types/types";
import {
  cascadeRemoveExpense,
  cascadeRemoveIncome,
} from "@/store/slices/financesSlice";
import {
  mutateCategory,
  mutateExpenseCategory,
  removeCategory,
  removeExpenseCategory,
  removeSelectedCategory,
  selectCategory,
} from "@/store/slices/categoriesSlice";

const Category: FC<ICategoryProps> = ({ categories, category, type }) => {
  const [editable, setEditable] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(category.name);
  const [removingCandidate, setRemovingCandidate] = useState<
    ICategory | undefined
  >();
  const dispatch = useAppDispatch();

  const actions = {
    cascadeRemove:
      type === "income" ? cascadeRemoveIncome : cascadeRemoveExpense,
    remove: type === "income" ? removeCategory : removeExpenseCategory,
    mutate: type === "income" ? mutateCategory : mutateExpenseCategory,
  };

  const deleteCategory = (category: ICategory) => {
    setRemovingCandidate(category);
    setShowWarning(true);
  };

  const confirm = () => {
    setShowWarning(false);
    if (removingCandidate) {
      console.log("Removing");
      dispatch(actions.cascadeRemove(removingCandidate.name));
      dispatch(removeSelectedCategory(removingCandidate.name));
      dispatch(actions.remove(removingCandidate.id));
    }
  };

  const dismiss = () => {
    setShowWarning(false);
  };

  const select = (category: string) => {
    if (isSelected) {
      dispatch(removeSelectedCategory(category));
    } else {
      dispatch(selectCategory(category));
    }

    setIsSelected((prev) => !prev);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempName(event.target.value);
  };

  const handleSave = () => {
    toast.dismiss();
    const duplicateCount = categories.filter(
      (c) =>
        c.name.toLowerCase() === tempName.toLowerCase() &&
        c.id !== category.id &&
        tempName !== ""
    ).length;

    if (duplicateCount > 0) {
      ErrorToast("Category already exists");
      setTempName("");
      return;
    }

    if (tempName.trim() && tempName !== category.name) {
      dispatch(actions.mutate({ id: category.id, name: tempName }));
    }
    setEditable(false);
  };

  return (
    <div>
      <div className="relative cursor-pointer">
        <input
          readOnly={!editable}
          value={editable ? tempName : category.name}
          className={`flex items-center focus:outline-none rounded-md p-1 pr-5 border ${
            isSelected ? "bg-gray-900" : "bg-gray-700"
          } border-gray-500 w-28 text-gray-400 bg-gray-700 cursor-pointer`}
          onChange={handleChange}
          onClick={() => select(category.name)}
          onDoubleClick={() => setEditable(true)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
        <RxCross2
          className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 duration-500 hover:rotate-90"
          onClick={() => deleteCategory(category)}
        />
      </div>

      {showWarning && (
        <Modal>
          <h1>
            If you delete category, all connected records will be destroyed
          </h1>
          <div className="flex gap-3 justify-center">
            <button
              className="bg-blue-500 text-gray-100 p-2 rounded w-40 cursor-pointer"
              onClick={confirm}
            >
              Confirm
            </button>
            <button
              className="bg-blue-500 text-gray-100 p-2 rounded w-40 cursor-pointer"
              onClick={dismiss}
            >
              Dismiss
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Category;
