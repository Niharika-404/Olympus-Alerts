



// AcknowledgementChart.jsx
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

// Helper function to group alerts by a specific property
function groupBy(array, property) {
  return array.reduce((accumulator, obj) => {
    const key = obj[property];
    if (!accumulator[key]) {
      accumulator[key] = { alerts: [] };
    }
    accumulator[key].alerts.push(obj);
    return accumulator;
  }, {});
}

const AcknowledgementChart = ({ alertData, selectedZone }) => {
  const [chartData, setChartData] = useState({
    xaxis: {
      categories: [],
    },
    yaxis: {
      title: {
        text: 'Average Time Taken to Acknowledge(minutes)',
      },
    },
    series: [],
  });

  useEffect(() => {
    const generateAcknowledgementChartData = () => {
      // Filter alerts for the selected zone
      const filteredAlerts = alertData.filter(
        (alert) => alert?.Zone === selectedZone 
      );

      // Group alerts by "Alert Ack By"
      const groupedAlerts = groupBy(filteredAlerts, 'AckBy');

      // Extract unique priorities
      const uniquePriorities = Array.from(new Set(filteredAlerts.map((alert) => alert?.Priority)));

      // Generate series data for each priority
      const seriesData = uniquePriorities.map((priority) => {
        return {
          name: `Priority ${priority}`,
          data: Object.keys(groupedAlerts).map((ackBy) => {
            const relevantAlerts = groupedAlerts[ackBy].alerts.filter((alert) => alert?.Priority === priority);
            const totalAvgTime =
              relevantAlerts.reduce((sum, alert) => sum + parseFloat(alert['TimeToAck']), 0) /
              relevantAlerts.length;

            // Round off to 3 decimal places
            const roundedAvgTime = isNaN(totalAvgTime) ? 0 : parseFloat(totalAvgTime.toFixed(3));

            return roundedAvgTime;
          }),
        };
      });

      // Extract email addresses for x-axis categories
      const emailCategories = Object.keys(groupedAlerts);

      return {
        xaxis: {
          categories: emailCategories,
        },
        yaxis: {
          title: {
            text: 'Average Time Taken to Acknowledge(min)',
          },
        },
        series: seriesData,
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
       
        dataLabels: {
          enabled: true
        },
        plotOptions: {
          bar: {
            horizontal: false, // Set to true for vertical stacked columns
            columnWidth: '50%', // Adjust the column width as needed
            stacked: true,
          },
         
        },
      };
    };

    try {
      setChartData(generateAcknowledgementChartData());
    } catch (error) {
      console.error('Error generating chart data:', error);
    }
  }, [alertData, selectedZone]);

  return (
    <div id='acknowledgement-chart' className='chart-container'>
      {/* Stacked Column chart */}
      <h3>Average Time Taken to Acknowledge By User</h3>
      {/* <Chart options={chartData} series={chartData.series} type="bar" height={350} /> */}
      {chartData.series.length>0 ? (
        <Chart options={chartData} series={chartData.series} type="bar" height={450} />
      ) : (
        <p style={{textAlign:'left', marginTop:'100px'}}>No alerts available for the selected zone.</p>
      )}
    </div>
  );
};

export default AcknowledgementChart;
