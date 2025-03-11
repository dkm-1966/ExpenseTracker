import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  PieController,
} from "chart.js";
import { FC } from "react";
import { IPieChartProps } from "@/types/types";

ChartJS.register(Tooltip, Legend, ArcElement, PieController);

const PieChart: FC<IPieChartProps> = ({ data, options }) => {
  if (!data) return <p className="text-gray-400`">No data available</p>;

  return <Pie options={options} data={data} />;
};

export default PieChart;
