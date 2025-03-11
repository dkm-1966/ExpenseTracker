import { IIncomeExpense, IPieChartData } from "@/types/types";

export const pieFiltration = (
  categories: string[],
  type: string,
  filterParam: string,
  data: IIncomeExpense[],
  year: number,
  month: number,
) => {
  const currentDay = new Date().getDay();
  const currentDate = new Date();
  const colors: string[] = [];

  let chartDataset: number[] = [];
  let chartLabels: (string | number)[] = [];
  let chartData: IPieChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: type,
        data: chartDataset,
        backgroundColor: colors,
      },
    ],
  };

  if (filterParam === "last week") {
    const startOfWeek = new Date();
    startOfWeek.setDate(
      currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1)
    );
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    data = data.filter((item) => {
      return (
        new Date(item.date) >= startOfWeek && new Date(item.date) <= endOfWeek
      );
    });

    for (const category of categories) {
      let sum = 0;

      for (const item of data) {
        const formattedDate = new Date(item.date);

        if (
          formattedDate >= startOfWeek &&
          formattedDate <= endOfWeek &&
          item.category === category
        ) {
          sum += item.amount;
        }
      }

      chartDataset.push(sum);
      colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }

    chartData = {
      labels: categories,
      datasets: [
        {
          label: type,
          data: chartDataset,
          backgroundColor: colors,
        },
      ],
    };
  } else if (filterParam === "month") {
    const startOfMonthDate = new Date(year, month, 1).getDate();
    const endOfMonthDate = new Date(year, month + 1, 0).getDate();

    data = data.filter((item) => {
      const formattedDate = new Date(item.date);

      return (
        formattedDate.getFullYear() === year &&
        formattedDate.getMonth() === month
      );
    });

    for (const category of categories) {
      let sum = 0;
      for (const item of data) {
        const formattedDate = new Date(item.date);

        if (
          formattedDate.getDate() >= startOfMonthDate &&
          formattedDate.getDate() <= endOfMonthDate &&
          item.category === category
        ) {
          sum += item.amount;
        }
      }

      colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
      chartDataset.push(sum);
    }

    chartData = {
      labels: categories,
      datasets: [
        {
          label: type,
          data: chartDataset,
          backgroundColor: colors,
        },
      ],
    };
  } else {
    const firstMonth = 0;
    const lastMonth = 11;

    for (const category of categories) {
      let sum = 0;

      for (const item of data) {
        const formattedDate = new Date(item.date);

        if (
          formattedDate.getFullYear() === year &&
          formattedDate.getMonth() >= firstMonth &&
          formattedDate.getMonth() <= lastMonth && 
          item.category === category
        ) {
          sum += item.amount
        }
      }

      colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
      chartDataset.push(sum);
    }

    chartData = {
      labels: categories,
      datasets: [
        {
          label: type,
          data: chartDataset,
          backgroundColor: colors,
        },
      ],
    };
  }

  return chartData
};
