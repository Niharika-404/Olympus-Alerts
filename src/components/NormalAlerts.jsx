

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown, faInfo } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';


import Papa from 'papaparse';

const NormalAlerts = ({ alertData, selectedZone }) => {
  const [tableData, setTableData] = useState([]);



  useEffect(() => {
    const generateTableData = () => {
      const filteredAlerts = alertData.filter(
        (alert) =>  alert?.Zone === selectedZone && alert?.Category === 'Normal'
      );

      const tableRows = filteredAlerts.map((alert) => ({
        alertName: alert['AlertName'],
        cluster: alert.Cluster,
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
      navigator.msSaveBlob(blob, 'normal-alerts.csv');
    } else {
      // Other browsers
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = 'normal-alerts.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
  

    <div>
      
    <div id='info'>
    <FontAwesomeIcon icon={faInfo} title='This is beta version'/>

    </div>
  <div className='alerts-time-table' style={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '1' }}>
    <h3>Normal Alerts</h3>
    <FontAwesomeIcon icon={faCircleDown} onClick={handleDownload} />

  </div>

  <div id='alert-vs-time-diff-table' style={{ overflowY: 'auto', maxHeight: '400px' }}>
    {tableData.length > 0 ? (
      <table style={{marginTop: '0px'}}>
        <thead style={{ position: 'sticky', top: '0px', backgroundColor: 'white', zIndex: '1' }}>
          <tr>
            <th>Alert Name</th>
            <th>Cluster</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.alertName}</td>
              <td>{row.cluster}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p style={{ textAlign: 'left', marginTop: '100px' }}>No normal alerts found.</p>
    )}
  </div>
</div>

  );
};

export default NormalAlerts;
