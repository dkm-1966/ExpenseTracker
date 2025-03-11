import { months } from "@/constants/dateConsts";
import { IPeriodRemoteProps } from "@/types/types";
import React, { FC } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const PeriodRemote: FC<IPeriodRemoteProps> = ({
  period,
  value,
  monthSetter,
  yearSetter,
}) => {
  const changePeriod = (increase: boolean) => {
    if (increase) {
      if (period === "year") {
        yearSetter((prev) => prev + 1);
      } else if (period === "month") {
        if (value === 11) {
          monthSetter(0);
          yearSetter((prev) => prev + 1);
        } else {
          monthSetter((prev) => prev + 1);
        }
      }
    } else {
      if (period === "year") {
        yearSetter((prev) => prev - 1);
      } else if (period === "month") {
        if (value === 0) {
          monthSetter(11);
          yearSetter((prev) => prev - 1);
        } else {
          monthSetter((prev) => prev - 1);
        }
      }
    }
  };

  return (
    <nav className="flex gap-3 justify-center">
      <IoIosArrowBack
        className="text-gray-100 text-xl"
        onClick={() => changePeriod(false)}
      />
      {period === "year" && <p className="text-gray-100">{value}</p>}
      {period === "month" && <p className="text-gray-100">{months[value]}</p>}
      <IoIosArrowForward
        className="text-gray-100 text-xl"
        onClick={() => changePeriod(true)}
      />
    </nav>
  );
};

export default PeriodRemote;
