





// NoiseAlertsTable.jsx
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown } from '@fortawesome/free-solid-svg-icons';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

import Papa from 'papaparse';

const NoiseAlertsTable = ({ alertData, selectedZone }) => {
  const [tableData, setTableData] = useState([]);

  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'


  useEffect(() => {
    const generateTableData = () => {
      const filteredAlerts = alertData.filter(
        (alert) =>
          alert?.['TimeToClose'] !== undefined &&
          parseFloat(alert['TimeToClose']).toFixed(2) <= 5.016666666666667 && // Round off to 2 decimal digits
          parseFloat(alert['TimeToClose']) > 0 &&
          alert?.Zone === selectedZone &&
          alert?.Status === 'closed' &&
          alert?.ClosedBy === 'Alert API'
      );
      
      

      const tableRows = filteredAlerts.map((alert) => ({
        alertName: alert['AlertName'],
        closeTime: parseFloat(alert['TimeToClose']).toFixed(3),
      }));

      tableRows.sort((a, b) => parseFloat(b.closeTime) - parseFloat(a.closeTime));


      setTableData(tableRows);
    };

    try {
      generateTableData();
    } catch (error) {
      console.error('Error generating table data:', error);
    }
  }, [alertData, selectedZone]);


  const handleSort = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    const sortedData = [...tableData].sort((a, b) => {
      const valueA = parseFloat(a.closeTime);
      const valueB = parseFloat(b.closeTime);
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    });
    setTableData(sortedData);
  };
  

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
    // <div>
    //  <div className='alerts-time-table'>
    //     <h3>Noise Alerts</h3>
    //     <FontAwesomeIcon icon={faCircleDown} onClick={handleDownload} />
    //   </div>

    //   {tableData.length > 0 ? (
    //     <div id='noise-alerts-table'>
    //       <table>
    //         <thead>
    //           <tr>
    //             <th>Alert Name</th>
    //             <th>Time to Close</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {tableData.map((row, index) => (
    //             <tr key={index}>
    //               <td>{row.alertName}</td>
    //               <td>{row.closeTime}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   ) : (
    //     <p style={{textAlign:'left', marginTop:'100px'}}>No noise alerts found.</p>
    //   )}
    // </div>

    <div>
  <div className='alerts-time-table' style={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '1' }}>
    <h3>Noise Alerts</h3>
    <FontAwesomeIcon
              icon={sortOrder === 'asc' ? faSortUp : faSortDown}
              onClick={handleSort}
            />
    <FontAwesomeIcon icon={faCircleDown} onClick={handleDownload} />
  </div>

  {tableData.length > 0 ? (
    <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
      <table style={{marginTop:'0px'}}>
        <thead style={{ position: 'sticky', top: '0px', backgroundColor: 'white', zIndex: '1' }}>
          <tr>
            <th>Alert Name</th>
            <th>Time to Close</th>
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
  ) : (
    <p style={{ textAlign: 'left', marginTop: '100px' }}>No noise alerts found.</p>
  )}
</div>


  );
};

export default NoiseAlertsTable;
