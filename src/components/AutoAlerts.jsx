import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown } from '@fortawesome/free-solid-svg-icons';
import Papa from 'papaparse';

const AutoAlertsTable = ({ alertData, selectedZone }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const generateTableData = () => {
      const filteredAlerts = alertData.filter(
        (alert) =>
          alert?.['Time Diff'] !== undefined &&
          parseFloat(alert['Time Diff']) === 0 &&
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

  const handleDownload = () => {
    const csvData = Papa.unparse(tableData);

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, 'auto-alerts.csv');
    } else {
      // Other browsers
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = 'auto-alerts.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
        <div className='alerts-time-table'>
        <h3>Auto Alerts</h3>
        <FontAwesomeIcon icon={faCircleDown} onClick={handleDownload} />
      </div>

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

export default AutoAlertsTable;