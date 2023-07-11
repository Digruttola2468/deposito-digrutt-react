import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

var misoptions = {
  scales: {
    y: {
      min: 0,
    },
  },
};

export default function BarsComponent({data}) {
  return <Bar data={data} options={misoptions} className="w-full"/>;
}
