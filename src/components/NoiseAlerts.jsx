

// // DistributedColumnChart.jsx
// import React, { useEffect, useState } from 'react';
// import Chart from 'react-apexcharts';

// const NoiseAlerts = ({ alertData, selectedZone }) => {
//   const [chartData, setChartData] = useState({
//     xaxis: {
//       categories: [],
//     },
//     yaxis: {
//       title: {
//         text: 'Time Diff',
//       },
//     },
//     series: [
//       {
//         name: 'Time Diff',
//         data: [],
//       },
//     ],
//   });

//   useEffect(() => {
//     const generateDistributedColumnChartData = () => {
//         const filteredAlerts = alertData.filter(
//             (alert) =>
//               alert?.['Time Diff'] !== undefined &&
//               parseFloat(alert['Time Diff']) <= 5 &&
//               parseFloat(alert['Time Diff']) >= 0 &&
//               alert?.Zone === selectedZone &&
//               alert?.Status === 'closed'
//           );
          

//       const alertNames = filteredAlerts.map((alert) => alert['Alert Name']);
//       const timeDiffs = filteredAlerts.map((alert) => parseFloat(alert['Time Diff']).toFixed(3)); // Round to 3 decimal places

//       return {
//         xaxis: {
//           categories: alertNames,
//           labels: {
//             show: false, // Hide x-axis labels
//           },
//         },
//         yaxis: {
//           title: {
//             text: 'Time Diff',
//           },
//         },
//         series: [
//           {
//             name: 'Time Diff',
//             data: timeDiffs,
//           },
//         ],
//         dataLabels: {
//             enabled: false
//           },
//         plotOptions:{
//             bar: {
//                 horizontal: false, // Set to true for vertical stacked columns
//                 columnWidth: '5px', // Adjust the column width as needed
                
//               },
//         }
//       };
//     };

//     try {
//       setChartData(generateDistributedColumnChartData());
//     } catch (error) {
//       console.error('Error generating chart data:', error);
//     }
//   }, [alertData, selectedZone]);

//   return (
//     <div id='distributed-column-chart'>
//       {/* Distributed Column chart */}
//       <h3>Noise Alerts</h3>
//       <Chart options={chartData} series={chartData.series} type="bar" height={350} />
//     </div>
//   );
// };

// export default NoiseAlerts;





// NoiseAlertsTable.jsx
import React, { useEffect, useState } from 'react';

const NoiseAlertsTable = ({ alertData, selectedZone }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const generateTableData = () => {
      const filteredAlerts = alertData.filter(
        (alert) =>
          alert?.['Time Diff'] !== undefined &&
          parseFloat(alert['Time Diff']) <= 5 &&
          parseFloat(alert['Time Diff']) >= 0 &&
          alert?.Zone === selectedZone &&
          alert?.Status === 'closed'
      );

      const tableRows = filteredAlerts.map((alert) => ({
        alertName: alert['Alert Name'],
        timeDiff: parseFloat(alert['Time Diff']).toFixed(3),
      }));

      setTableData(tableRows);
    };

    try {
      generateTableData();
    } catch (error) {
      console.error('Error generating table data:', error);
    }
  }, [alertData, selectedZone]);

  return (
    <div>
    <h3>Noise Alerts</h3>

    <div id='noise-alerts-table'>
      <table>
        <thead>
          <tr>
            <th>Alert Name</th>
            <th>Time Difference</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.alertName}</td>
              <td>{row.timeDiff}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

  );
};

export default NoiseAlertsTable;
