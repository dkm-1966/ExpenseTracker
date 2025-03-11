import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FC } from "react";
import { ILineChartProps } from "@/types/types";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart: FC<ILineChartProps> = ({ data, options }) => {
  return (
    data && <Line data={data} options={options} className="w-full h-2/3" />
  );
};

export default LineChart;
