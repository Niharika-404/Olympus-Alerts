


import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown } from '@fortawesome/free-solid-svg-icons';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

import Papa from 'papaparse';

const AlertVsTimeDiffTable = ({ alertData, selectedZone }) => {
  const [tableData, setTableData] = useState([]);

  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'


  useEffect(() => {
    const generateTableData = () => {
      const filteredAlerts = alertData.filter(
        (alert) => alert?.['TimeToClose'] && parseFloat(alert['TimeToClose']) > 5.02 && alert?.Zone === selectedZone && alert?.Status === 'closed'
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
    // <div>
    //   <div className='alerts-time-table'>
    //     <h3>Genuine Alerts</h3>
    //     <FontAwesomeIcon icon={faCircleDown} onClick={handleDownload} />
    //   </div>

    //   <div id='alert-vs-time-diff-table'>
    //     {tableData.length > 0 ? (
    //       <table>
    //         <thead>
    //           <tr>
    //             <th>Alert Name</th>
    //             <th>Time To Close</th>
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
    //     ) : (
    //       <p style={{textAlign:'left', marginTop:'100px'}}>No genuine alerts found.</p>
    //     )}
    //   </div>
    // </div>

    <div>
  <div className='alerts-time-table' style={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '1' }}>
    <h3>Genuine Alerts</h3>
    <FontAwesomeIcon
              icon={sortOrder === 'asc' ? faSortUp : faSortDown}
              onClick={handleSort}
            />
    <FontAwesomeIcon icon={faCircleDown} onClick={handleDownload} />
  </div>

  <div id='alert-vs-time-diff-table' style={{ overflowY: 'auto', maxHeight: '400px' }}>
    {tableData.length > 0 ? (
      <table style={{marginTop: '0px'}}>
        <thead style={{ position: 'sticky', top: '0px', backgroundColor: 'white', zIndex: '1' }}>
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
    ) : (
      <p style={{ textAlign: 'left', marginTop: '100px' }}>No genuine alerts found.</p>
    )}
  </div>
</div>

  );
};

export default AlertVsTimeDiffTable;
