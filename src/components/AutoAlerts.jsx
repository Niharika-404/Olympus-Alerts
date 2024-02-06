import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown } from '@fortawesome/free-solid-svg-icons';
import Papa from 'papaparse';

const AutoAlertsTable = ({ alertData, selectedZone }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const generateTableData = () => {
      const filteredAlerts = alertData.filter((alert) => {
        // Log within the filter function to have access to the alert object
        console.log(Boolean(alert?.Acknowledged)); // This will now correctly print the Acknowledged value of each alert being processed

        return (
          alert?.Zone === selectedZone &&
          alert?.Status === 'closed' &&
          Boolean(alert?.Acknowledged) === false &&
          alert?.ClosedBy === 'Alert API'
        );
      });
      
      const tableRows = filteredAlerts.map((alert) => ({
        alertName: alert['AlertName'],

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
    // <div>
    //     <div className='alerts-time-table'>
    //     <h3>Auto Close Alerts</h3>
    //     <FontAwesomeIcon icon={faCircleDown} onClick={handleDownload} />
    //   </div>

    //   {tableData.length > 0 ? (
    //     <div id='noise-alerts-table'>
    //       <table>
    //         <thead>
    //           <tr>
    //             <th>Alert Name</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {tableData.map((row, index) => (
    //             <tr key={index}>
    //               <td>{row.alertName}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   ) : (
    //     <p style={{textAlign:'left', marginTop:'100px'}}>No auto close alerts found.</p>
    //   )}
    // </div>


    <div>
  <div className='alerts-time-table' style={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '1' }}>
    <h3>Auto Close Alerts</h3>
    <FontAwesomeIcon icon={faCircleDown} onClick={handleDownload} />
  </div>

  <div id='noise-alerts-table' style={{ overflowY: 'auto', maxHeight: '400px' }}>
    {tableData.length > 0 ? (
      <table style={{marginTop: '0px'}}>
        <thead style={{ position: 'sticky', top: '0px', backgroundColor: 'white', zIndex: '1' }}>
          <tr>
            <th>Alert Name</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.alertName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p style={{ textAlign: 'left', marginTop: '100px' }}>No auto close alerts found.</p>
    )}
  </div>
</div>

  );
};

export default AutoAlertsTable;