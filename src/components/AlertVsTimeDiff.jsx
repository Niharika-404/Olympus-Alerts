


import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown } from '@fortawesome/free-solid-svg-icons';
import Papa from 'papaparse';

const AlertVsTimeDiffTable = ({ alertData, selectedZone }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const generateTableData = () => {
      const filteredAlerts = alertData.filter(
        (alert) => alert?.['TimeToClose'] && parseFloat(alert['TimeToClose']) > 5 && alert?.Zone === selectedZone && alert?.Status === 'closed'
      );

      const tableRows = filteredAlerts.map((alert) => ({
        alertName: alert['AlertName'],
        closeTime: parseFloat(alert['TimeToClose']).toFixed(3),
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
      navigator.msSaveBlob(blob, 'genuine-alerts.csv');
    } else {
      // Other browsers
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = 'genuine-alerts.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <div className='alerts-time-table'>
        <h3>Genuine Alerts</h3>
        <FontAwesomeIcon icon={faCircleDown} onClick={handleDownload} />
      </div>

      <div id='alert-vs-time-diff-table'>
        <table>
          <thead>
            <tr>
              <th>Alert Name</th>
              <th>Time To Close</th>
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

export default AlertVsTimeDiffTable;
