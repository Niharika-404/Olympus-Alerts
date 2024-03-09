// PriorityVsTimeToAck.jsx
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const PriorityVsTimeToAck = ({ alertData, selectedZone }) => {
  const [chartData, setChartData] = useState({
    xaxis: {
      categories: [],
    },
    yaxis: {
      title: {
        text: 'Average Time to Acknowledge',
      },
    },
    series: [
      {
        name: 'Average Time to Acknowledge',
        data: [],
      },
    ],
  });

  useEffect(() => {
    const generateColumnChartData = () => {
      const priorities = ['P1', 'P2', 'P3', 'P4', 'P5'];

      const avgTimes = priorities.map((priority) => {
        const relevantAlerts = alertData.filter(
          (alert) => alert?.Priority === priority && alert?.['TimeToAck'] && alert?.Zone === selectedZone
        );
        const totalAvgTime =
          relevantAlerts.reduce((sum, alert) => sum + parseFloat(alert['TimeToAck']), 0) /
          relevantAlerts.length;

        // Round off to 3 decimal places
        const roundedAvgTime = isNaN(totalAvgTime) ? 0 : parseFloat(totalAvgTime.toFixed(3));

        return roundedAvgTime;
      });

      return {
        xaxis: {
          categories: priorities,
        },
        yaxis: {
          title: {
            text: 'Average Time to Acknowledge(min)',
          },
        },
        series: [
          {
            name: 'Average Time to Acknowledge',
            data: avgTimes,
          },
        ],
        dataLabels: {
            enabled: false
          },
      };
    };

    try {
      setChartData(generateColumnChartData());
      // console.log(chartData.series[0].data);
    } catch (error) {
      console.error('Error generating chart data:', error);
    }
  }, [alertData, selectedZone]);

  return (
    <div id='column-chart'>
      {/* Column chart */}
      <h3>Average Time to Acknowledge Alerts</h3>
      {chartData.series[0].data.length>0? 
      <Chart options={chartData} series={chartData.series} type="bar" height={450} />:
      <p style={{textAlign:'left', marginTop:'100px'}}>No alerts found</p>}
      
    </div>
  );
};

export default PriorityVsTimeToAck;
