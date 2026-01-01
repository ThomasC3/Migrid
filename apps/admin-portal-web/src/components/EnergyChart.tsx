import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeSeriesScale,
} from "chart.js";
import 'chartjs-adapter-date-fns';
import { tokens } from "@fluentui/react-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeSeriesScale
);

interface EnergyChartProps {
    totalLoad: number;
    limit: number;
}

// Helper to generate mock time-series data
const generateChartData = (currentLoad: number) => {
    const labels = [];
    const data = [];
    const now = new Date();
    for (let i = 10; i >= 0; i--) {
        labels.push(new Date(now.getTime() - i * 5000)); // 5 second intervals
        data.push(Math.max(0, currentLoad - (Math.random() * 10) * i)); // Simulate past data
    }
    return { labels, data };
};

export const EnergyChart = ({ totalLoad, limit }: EnergyChartProps) => {
  const { labels, data } = generateChartData(totalLoad);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Site Load (kW)",
        data,
        borderColor: tokens.colorBrandStroke1,
        backgroundColor: tokens.colorBrandBackground,
        tension: 0.2,
        pointStyle: false,
      },
      {
        label: "Grid Connection Limit (kW)",
        data: Array(labels.length).fill(limit),
        borderColor: tokens.colorPaletteRedBorderActive,
        backgroundColor: tokens.colorPaletteRedBackground3,
        borderDash: [5, 5],
        pointStyle: false,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'timeseries' as const,
        time: {
          unit: 'second' as const,
          displayFormats: {
            second: 'h:mm:ss a',
          }
        },
        grid: {
            display: false,
        }
      },
      y: {
        beginAtZero: true,
        max: limit * 1.2, // Give some headroom
        title: {
            display: true,
            text: 'Power (kW)'
        }
      },
    },
    plugins: {
        legend: {
            position: 'top' as const,
        },
    }
  };

  return <div style={{height: "300px"}}><Line options={options} data={chartData} /></div>;
};