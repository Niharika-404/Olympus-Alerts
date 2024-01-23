

// DistributedColumnChart.jsx
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const NoiseAlerts = ({ alertData, selectedZone }) => {
  const [chartData, setChartData] = useState({
    xaxis: {
      categories: [],
    },
    yaxis: {
      title: {
        text: 'Time Diff',
      },
    },
    series: [
      {
        name: 'Time Diff',
        data: [],
      },
    ],
  });

  useEffect(() => {
    const generateDistributedColumnChartData = () => {
        const filteredAlerts = alertData.filter(
            (alert) =>
              alert?.['Time Diff'] !== undefined &&
              parseFloat(alert['Time Diff']) <= 5 &&
              parseFloat(alert['Time Diff']) >= 0 &&
              alert?.Zone === selectedZone &&
              alert?.Status === 'closed'
          );
          

      const alertNames = filteredAlerts.map((alert) => alert['Alert Name']);
      const timeDiffs = filteredAlerts.map((alert) => parseFloat(alert['Time Diff']).toFixed(3)); // Round to 3 decimal places

      return {
        xaxis: {
          categories: alertNames,
        },
        yaxis: {
          title: {
            text: 'Time Diff',
          },
        },
        series: [
          {
            name: 'Time Diff',
            data: timeDiffs,
          },
        ],
        dataLabels: {
            enabled: false
          },
      };
    };

    try {
      setChartData(generateDistributedColumnChartData());
    } catch (error) {
      console.error('Error generating chart data:', error);
    }
  }, [alertData, selectedZone]);

  return (
    <div id='distributed-column-chart'>
      {/* Distributed Column chart */}
      <h3>Noise Alerts</h3>
      <Chart options={chartData} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default NoiseAlerts;
