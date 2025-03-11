import { days, months } from "@/constants/dateConsts";
import { IChartData, IFinances } from "@/types/types";

export const filterData = (
  filterParam: string,
  typeParam: string,
  data: IFinances[],
  year: number,
  month: number
) => {
  const currentDay = new Date().getDay();
  const currentDate = new Date();

  const chartDataset: number[] = [];
  const chartLabels: (string | number)[] = [];
  let chartData: IChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: typeParam,
        data: chartDataset,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };

  if (filterParam === "last week") {
    const startOfWeek = new Date();
    startOfWeek.setDate(currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    data = data.filter((item) => {
      return item.date >= startOfWeek && item.date <= endOfWeek;
    });

    let startOfWeekDate = startOfWeek.getDate();
    const endOfWeekDate = endOfWeek.getDate();

    console.log(startOfWeekDate)

    while (startOfWeekDate !== endOfWeekDate) {
      let sum = 0;
      for (const item of data) {
        if (item.date.getDate() === startOfWeekDate) {
          sum += item.amount
        }
      }

      chartDataset.push(sum);
      startOfWeekDate++;
    }

    chartData = {
      labels: days,
      datasets: [
        {
          label: typeParam,
          data: chartDataset,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
        },
      ],
    };
  } else if (filterParam === "month") {
    let startOfMonthDate = new Date(year, month, 1).getDate();
    const endOfMonthDate = new Date(year, month + 1, 0).getDate();

    data = data.filter((item) => {
      return (
        item.date.getFullYear() === year &&
        item.date.getMonth() === month
      );
    });

    while (startOfMonthDate !== endOfMonthDate){
      let sum = 0;
      for (const item of data) {
        if (item.date.getDate() === startOfMonthDate) {
          sum += item.amount;
        }
      }

      chartLabels.push(startOfMonthDate)
      chartDataset.push(sum);
      startOfMonthDate++;
    }

    chartData = {
      labels: chartLabels,
      datasets: [
        {
          label: typeParam,
          data: chartDataset,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(75,192,192,0.2)",
        },
      ],
    };
  } else {
    let month = 0;
    const lastMonth = 11
    while (month <= lastMonth){
      let sum = 0;
      for (const item of data) {
        if (item.date.getFullYear() === year && item.date.getMonth() === month) {
          sum += item.amount
        }
      }

      chartDataset.push(sum)
      month++;
    }

    chartData = {
      labels: months,
      datasets: [
        {
          label: typeParam,
          data: chartDataset,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(75,192,192,0.2)",
        },
      ],
    };
  }

  return chartData
};
