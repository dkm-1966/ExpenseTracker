import { useMemo } from "react";

const useCategoryNames = (categories: Array<{ name: string }>) => {
    return useMemo(
        () =>
          categories
            ? categories
                .map((category) =>
                  category.name !== "" ? category.name : undefined
                )
                .filter((name): name is string => name !== undefined)
            : [],
        [categories]
      );
}

export default useCategoryNames;
