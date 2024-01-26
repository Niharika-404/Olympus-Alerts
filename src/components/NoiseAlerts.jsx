

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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown } from '@fortawesome/free-solid-svg-icons';
import Papa from 'papaparse';

const NoiseAlertsTable = ({ alertData, selectedZone }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const generateTableData = () => {
      const filteredAlerts = alertData.filter(
        (alert) =>
          alert?.['Close Time'] !== undefined &&
          parseFloat(alert['Close Time']) <= 5 &&
          parseFloat(alert['Close Time']) >= 0 &&
          alert?.Zone === selectedZone &&
          alert?.Status === 'closed'
      );

      const tableRows = filteredAlerts.map((alert) => ({
        alertName: alert['Alert Name'],
        closeTime: parseFloat(alert['Close Time']).toFixed(3),
      }));

      setTableData(tableRows);
    };

    try {
      generateTableData();
    } catch (error) {
      console.error('Error generating table data:', error);
    }
  }, [alertData, selectedZone]);

  const handleDownload = () => {
    const csvData = Papa.unparse(tableData);

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, 'noise-alerts.csv');
    } else {
      // Other browsers
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = 'noise-alerts.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
     <div className='alerts-time-table'>
        <h3>Noise Alerts</h3>
        <FontAwesomeIcon icon={faCircleDown} onClick={handleDownload} />
      </div>

    <div id='noise-alerts-table'>
      <table>
        <thead>
          <tr>
            <th>Alert Name</th>
            <th>Close Time</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.alertName}</td>
              <td>{row.closeTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

  );
};

export default NoiseAlertsTable;
