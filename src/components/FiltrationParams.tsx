import React, { FC } from "react";
import DropDownMenu from "./UI/DropDownMenu";
import { params, periodParams } from "@/constants/params";
import { IFiltrationParams } from "@/types/types";

const FiltrationParams: FC<IFiltrationParams> = ({
  typeSelection,
  periodSelection,
}) => {
  return (
    <div className="w-full p-6 flex justify-end gap-3">
      <DropDownMenu title={"type"} params={params} selector={typeSelection} />
      <DropDownMenu
        title={"period"}
        params={periodParams}
        selector={periodSelection}
      />
    </div>
  );
};

export default FiltrationParams;
