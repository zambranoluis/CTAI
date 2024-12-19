import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const ChartDonutComponent = ({ graphData }) => {
  if (!graphData || graphData.labels.length === 0) return null;

  const data = {
    labels: graphData.labels,
    datasets: [
      {
        data: graphData.series,
        backgroundColor: ["#007bff", "#ca0000"],
        hoverBackgroundColor: ["#007bff", "#ca0000"],
        borderWidth: 1,
        borderColor: "#1c1c1c",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            return `${value} people`;
          },
        },
      },
    },
  };

  return (
    <div
      style={{ height: "200px", width: "100%" }}
      className=' drop-shadow-[0.5px_0.5px_0px_#1c1c1c]'>
      <Doughnut className="" data={data} options={options} />
    </div>
  );
};

export default ChartDonutComponent;
