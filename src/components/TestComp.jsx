import React, {useState, useEffect } from 'react';
// import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import Papa from 'papaparse'


const Test = ({selectedDate, alertData, loading, filters, download, setDownload, searchTerm}) => {
 


  
  const [filteredData, setFilteredData] = useState([]);



// console.log("Filters: ",filters);
useEffect(() => {
    // Apply filters to alertData
    const applyFilters = () => {
      const filteredAlerts = alertData.filter((alert) => {
        return (
          (!filters.cluster?.length || filters.cluster.some((value) => alert.Cluster.includes(value))) &&
          (!filters.namespace?.length || filters.namespace.some((value) => alert.Namespace.includes(value))) &&
          (!filters.alertName?.length || filters.alertName.some((value) => alert['Alert Name'].includes(value))) &&
          (!filters.zone?.length || filters.zone.some((value) => alert.Zone.includes(value))) &&
          (!filters.priority?.length || filters.priority.some((value) => alert.Priority.includes(value))) &&
          (!filters.status?.length || filters.status.some((value) => alert.Status.includes(value))) &&
          
          (!searchTerm ||
            Object.values(alert).some(
              (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
            ))



        );
      });

      setFilteredData(filteredAlerts);
    };
  
    applyFilters();
  }, [selectedDate, alertData, loading, filters, searchTerm]);







  // console.log("Filtered Data for Table:", filteredData);
  // useEffect(() => {
  //   if (download) {
  //     // Download logic
  //     const csvHeaders = Object.keys(filteredData[0] || {});
  //     const csvData = filteredData.map((alert) => {
  //       return csvHeaders.reduce((rowData, header) => {
  //         rowData[header] = alert[header] ?? 'N/A';
  //         return rowData;
  //       }, {});
  //     });
  
  //     // Create a CSV file
  //     const csvFileName = 'alert_data.csv';
  //     const csvLink = document.createElement('a');
  //     csvLink.href = URL.createObjectURL(new Blob([Papa.unparse(csvData, { header: true })], { type: 'text/csv' }));
  //     csvLink.setAttribute('download', csvFileName);
  //     document.body.appendChild(csvLink);
  //     csvLink.click();
  //     document.body.removeChild(csvLink);
  
  //     setDownload(false); // Reset download state after download logic is executed
  //   }
  // }, [download, setDownload, filteredData]);

  useEffect(() => {
    if (download) {
      // Define the headers that correspond to the visible columns in the table
      const visibleHeaders = [
        'Date',
        'Alert ID',
        'Alert Name',
        'Description',
        'Zone',
        'Cluster',
        'Namespace',
        'Priority',
        'Acknowledged',
        'Alert Creation Time',
        'Alert Last Updated At',
        'Alert Ack By',
        'Last Occured At',
        'Service',
        'Severity',
        'Time To ACK',
        'Time To Close',
        'Time Diff',
        'Close Time',
        'Closed By',
        'Contact Method',
        'Count',
        'Status',
        'Alert Link',
        'Runbook ',
      ];
  
      // Create CSV data only from the visible columns
      const csvData = filteredData.map((alert) => {
        const rowData = {};
        visibleHeaders.forEach((header) => {
          rowData[header] = alert[header] ?? 'N/A';
        });
        return rowData;
      });
  
      // Create a CSV file
      const csvFileName = 'alert_data.csv';
      const csvLink = document.createElement('a');
      csvLink.href = URL.createObjectURL(new Blob([Papa.unparse(csvData, { header: true })], { type: 'text/csv' }));
      csvLink.setAttribute('download', csvFileName);
      document.body.appendChild(csvLink);
      csvLink.click();
      document.body.removeChild(csvLink);
  
      setDownload(false); // Reset download state after download logic is executed
    }
  }, [download, setDownload, filteredData]);
  
  
  
  

  const handleShowAlert = (url) => {
    window.open(url, '_blank');
  };

  const handleRunbook = (url) => {
    window.open(url, '_blank');
  };


  return (
    <div>
      {loading ? (
        <Oval type="Oval" color="#00BFFF" height={50} width={50} />
      ) :  filteredData && filteredData.length > 0 ? (
        <table>
          <thead>
            <tr>
            <th>DATE</th>
              {/* <th>Tiny ID</th> */}
              <th>ALERT ID</th>
              <th>ALERT NAME</th>
              {/* <th>Alias</th> */}
              <th>DESCRIPTION</th>
              <th>ZONE</th>
              <th>CLUSTER</th>
              <th>NAMESPACE</th>
              <th>PRIORITY</th>
              {/* <th>Is Seen</th> */}
              <th>ACKNOWLEDGE STATUS</th>
              <th>ALERT CREATION TIME</th>
              {/* <th>Ack Time(ms)</th> */}
              <th>ALERT LAST UPDATED AT</th>
              <th>ALERT ACK BY</th>
              <th>LAST OCCURED AT</th>
              {/* <th>Job</th> */}
              {/* <th>Owner</th> */}
              <th>SERVICE</th>
              <th>SEVERITY</th>
              {/* <th>Source</th> */}
              <th>TIME TO ACK(min)</th>
              <th>TIME TO CLOSE(min)</th>
              <th>TIME DIFF(min)</th>
              <th>CLOSE TIME</th>
              <th>CLOSED BY</th>
              {/* <th>Prometheus</th> */}
              {/* <th>Grafana</th> */}
              <th>CONTACT METHOD</th>
              <th>COUNT</th>
              <th>STATUS</th>
              <th>ALERT LINK</th>
              <th>RUNBOOK</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((alert, index) => (
              <tr key={`${alert?.['Alert ID']}-${index}`}>

                <td>{alert?.Date ?? 'N/A'}</td>
                {/* <td>{alert?.['Tiny ID'] ?? 'N/A'}</td> */}
                <td>{alert?.['Alert ID'] ?? 'N/A'}</td>
                <td>{alert?.['Alert Name'] ? alert?.['Alert Name']: 'N/A'}</td>
                {/* <td>{alert?.Alias ?? 'N/A'}</td> */}
                <td>{alert?.Description ?? 'N/A'}</td>
                <td>{alert?.Zone ?? 'N/A'}</td>
                <td>{alert?.Cluster ?? 'N/A'}</td>
                <td>{alert?.Namespace ?? 'N/A'}</td>
                <td>{alert?.Priority ?? 'N/A'}</td>
                {/* <td>{alert?.IsSeen ?? 'N/A'}</td> */}
                {/* <td>{alert?.Acknowledged ?? 'N/A'}</td> */}
                <td>{String(alert?.Acknowledged) === 'true' ? 'Acknowledged' : 'N/A'}</td>

                <td>{alert?.['Alert Creation Time'] ?? 'N/A'}</td>
                {/* <td>{alert?.['Ack Time'] ?? 'N/A'}</td> */}
                <td>{alert?.['Alert Last Updated At'] ?? 'N/A'}</td>
                <td>{alert?.['Alert Ack By'] ?? 'N/A'}</td>
                <td>{alert?.['Last Occured At'] ?? 'N/A'}</td>
                {/* <td>{alert?.Job ?? 'N/A'}</td> */}
                {/* <td>{alert?.Owner ?? 'N/A'}</td> */}
                <td>{alert?.Service ?? 'N/A'}</td>
                <td>{alert?.Severity ?? 'N/A'}</td>
                {/* <td>{alert?.Source ?? 'N/A'}</td> */}
                <td>{alert?.['Time To ACK'] ?? 'N/A'}</td>
                <td>{alert?.['Time To Close'] ?? 'N/A'}</td>
                <td>{alert?.['Time Diff'] ?? 'N/A'}</td>
                <td>{alert?.['Close Time'] ?? 'N/A'}</td>
                <td>{alert?.['Closed By'] ?? 'N/A'}</td>
                {/* <td>{alert?.Prometheus ?? 'N/A'}</td> */}
                {/* <td>{alert?.Grafana ?? 'N/A'}</td> */}
                <td>{alert?.['Contact Method'] ?? 'N/A'}</td>
                <td>{alert?.Count ?? 'N/A'}</td>
                <td>{alert?.Status ?? 'N/A'}</td>
                {/* <td>{alert?.['Alert Link'] ?? 'N/A'}</td> */}
                <td>
                  <button onClick={() => handleShowAlert(alert?.['Alert Link'])}>Show Alert</button>
                </td>
                {/* <td>{alert?.['Runbook '] ?? 'N/A'}</td> */}
                <td>
                  <button onClick={() => handleRunbook(alert?.['Runbook '])}>Run Book</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No alerts found.</p>
      )}
    </div>
  );
};

export default Test;
