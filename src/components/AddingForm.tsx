import { FC, useState } from "react";
import DropDownMenu from "./UI/DropDownMenu";
import Input from "./UI/Input";
import { useAppDispatch } from "@/hooks/redux";
import { v4 as uuid } from "uuid";
import { amountRegEx } from "@/constants/regex";
import ErrorToast from "@/utils/ErrorToast";
import toast from "react-hot-toast";
import { IAddingFormProps } from "@/types/types";
import { setExpense, setIncome } from "@/store/slices/financesSlice";

const AddingForm: FC<IAddingFormProps> = ({
  type,
  categories,
  setVisibility,
}) => {
  const [category, setCategory] = useState<string>("");
  const [newIncome, setNewIncome] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const dispatch = useAppDispatch();

  const setFinance = type === "income" ? setIncome : setExpense;

  const handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewIncome(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const confirm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toast.dismiss();

    if (category === "") {
      ErrorToast("Select category");
      return;
    }

    if (date === "") {
      ErrorToast("Invalid date");
      return;
    }

    const formattedDate = new Date(date).toISOString();

    if (!formattedDate) {
      ErrorToast("Invalid date");
      return;
    }

    if (!amountRegEx.test(newIncome)) {
      ErrorToast("Invalid format of income");
      return;
    }

    const parsedAmount = parseFloat(newIncome);

    dispatch(
      setFinance({
        id: uuid(),
        date: formattedDate,
        amount: parsedAmount,
        category: category,
      })
    );
    setVisibility(false);
    setCategory("");
    setNewIncome("");
    setDate("");
  };

  const dismiss = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCategory("");
    setNewIncome("");
    setDate("");
    setVisibility(false);
  };

  const selectCategory = (value: string) => {
    setCategory(value);
  };

  return (
    <form className="flex flex-col gap-3">
      <DropDownMenu
        title={"category"}
        params={categories}
        selector={selectCategory}
      />
      <Input
        type={"text"}
        id={"income"}
        placeholder={"Amount"}
        value={newIncome}
        changeHandler={handleIncomeChange}
      />
      <Input
        type={"date"}
        id={"date"}
        placeholder={""}
        value={date}
        changeHandler={handleDateChange}
      />
      <div className="flex gap-3">
        <button
          className="bg-blue-500 text-gray-100 p-2 rounded w-40 cursor-pointer"
          onClick={(e) => confirm(e)}
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
    </form>
  );
};

export default AddingForm;
