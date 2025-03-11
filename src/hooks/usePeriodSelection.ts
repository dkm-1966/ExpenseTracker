import { useState } from "react";

const usePeriodSelection = () => {
  const [period, setPeriod] = useState<string>("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth());

  const periodSelection = (value: string) => {
    if (value === "year") setYear(new Date().getFullYear());
    else if (value === "month") setMonth(new Date().getMonth());
    setPeriod(value);
  };

  return { period, year, month, setYear, setMonth, periodSelection };
};

export default usePeriodSelection;