import { useEffect, useRef, useMemo } from "react";
import ApexCharts from "apexcharts";

const groupReportsByDay = (graphData) => {
  const grouped = graphData.labels.reduce((acc, label, idx) => {
    // Convert the timestamp to a date string representing the day
    const day = new Date(label).toLocaleDateString();

    // Aggregate the series count for each day
    acc[day] = (acc[day] || 0) + graphData.series[idx];
    return acc;
  }, {});

  return {
    labels: Object.keys(grouped),
    series: Object.values(grouped),
  };
};

const ApexChartComponent = ({ graphData, graphType }) => {
  const chartRef = useRef(null);

  // Compute filtered data by day when graph type is "reports"
  const filteredGraphData = useMemo(() => {
    if (graphType === "reports") {
      return groupReportsByDay(graphData);
    }
    return graphData;
  }, [graphData, graphType]);

  useEffect(() => {
    if (filteredGraphData.labels.length > 0 && chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const commonOptions = {
        chart: {
          type: "line",
          height: 350,
        },
        xaxis: {
          categories: graphData.labels,
          title: {
            text: "Date",
          },
        },
        theme: {
          mode: "dark",
        },
      };

      let seriesOptions;

      if (graphType === "reports") {
        seriesOptions = {
          series: [
            {
              name: "Number of Reports",
              data: graphData.series,
            },
          ],
          yaxis: {
            title: {
              text: "Number of Reports",
            },
          },
        };
      } else if (graphType === "peopleFlow") {
        seriesOptions = {
          series: [
            {
              name: "Enter",
              data: graphData.enterSeries,
            },
            {
              name: "Exit",
              data: graphData.exitSeries,
            },
          ],
          yaxis: {
            title: {
              text: "Number of People",
            },
          },
        };
      }

      const options = {
        ...commonOptions,
        ...seriesOptions,
      };

      const newChart = new ApexCharts(chartRef.current, options);
      newChart.render();
      chartRef.current.chart = newChart;
    }
  }, [filteredGraphData, graphType]);

  return <div id="chart" ref={chartRef} className="mt-6"></div>;
};

export default ApexChartComponent;
