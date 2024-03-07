



import React, { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import Papa from 'papaparse';
import { TablePagination } from '@mui/material';

const Test = ({ selectedDate, alertData, loading, filters, download, setDownload, searchTerm, alertModelData }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getCategory = (alertId) => {
    const matchedAlert = alertModelData.find(alert => alert.AlertID === alertId);
    return matchedAlert ? matchedAlert.Category : 'N/A';
  };

  React.useEffect(() => {
    const applyFilters = () => {
      if (Array.isArray(alertData)) {
        let filteredAlerts = [...alertData];
  
        if (Array.isArray(alertModelData)) {
          // If alertModelData is available, filter alerts based on category
          const selectedCategory = filters.category[0]; // Assuming only one category can be selected at a time
          filteredAlerts = filteredAlerts.filter(alert => {
            const matchedAlert = alertModelData.find(modelAlert => modelAlert.AlertID === alert.AlertID);
            return matchedAlert && matchedAlert.Category === selectedCategory;
          });
        }
  
        // Apply other filters
        filteredAlerts = filteredAlerts.filter((alert) => (
          (!filters.cluster?.length || (alert.Cluster && filters.cluster.some((value) => alert.Cluster.includes(value)))) &&
          (!filters.alertName?.length || (alert.AlertName && filters.alertName.some((value) => alert.AlertName.includes(value)))) &&
          (!filters.zone?.length || (alert.Zone && filters.zone.some((value) => alert.Zone.includes(value)))) &&
          (!filters.priority?.length || (alert.Priority && filters.priority.some((value) => alert.Priority.includes(value)))) &&
          (!filters.status?.length || (alert.Status && filters.status.some((value) => alert.Status.includes(value)))) &&
          (!searchTerm ||
            Object.values(alert).some(
              (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
            ))
        ));
  
        setFilteredData(filteredAlerts);
      } else {
        console.error("alertData is not an array:", alertData);
        setFilteredData([]);
      }
    };
  
    applyFilters();
  }, [selectedDate, alertData, loading, filters, searchTerm, alertModelData]);
  

    // Effect to reset page when filtered data changes
    useEffect(() => {
      setPage(0);
    }, [filteredData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

    const handleShowAlert = (url) => {
        window.open(url, '_blank');
      };
    
      const handleRunbook = (url) => {
        window.open(url, '_blank');
      };

  useEffect(() => {
    if (download) {
      const visibleHeaders = [
        'AlertID',
        'AlertName',
        'AlertType',
        'Zone',
        'Cluster',
        'Priority',
        'Acknowledged',
        'CreatedAtTime',
        'UpdatedAtTime',
        'AckBy',
        'AlertAckTime',
        'Tags',
        'Team',
        'PrimaryResponderEmail',
        'SecondaryResponderEmail',
        'Severity',
        'TimeToAck',
        'TimeToClose',
        'AlertCloseTime',
        'ClosedBy',
        'Status',
        'AlertURL',
        'RunbookUrl',
      ];

      const allCsvData = filteredData.map((alert) => {
        const rowData = {};
        visibleHeaders.forEach((header) => {
          rowData[header] = alert[header] ?? 'N/A';
        });
        return rowData;
      });

      const csvFileName = 'alert_data.csv';
      const csvLink = document.createElement('a');
      csvLink.href = URL.createObjectURL(new Blob([Papa.unparse(allCsvData, { header: true })], { type: 'text/csv' }));
      csvLink.setAttribute('download', csvFileName);
      document.body.appendChild(csvLink);
      csvLink.click();
      document.body.removeChild(csvLink);

      setDownload(false); // Reset download state after download logic is executed
    }
  }, [download, setDownload, filteredData]);

  const indexOfLastItem = (page + 1) * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      {loading ? (
        <Oval type="Oval" color="#00BFFF" height={50} width={50} />
      ) : filteredData && filteredData.length > 0 ? (
        <>
             <TablePagination
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <div className='table-container'>

          
          <table>
            <thead>
              <tr>
                <th>ALERT ID</th>
                <th>ALERT NAME</th>
                <th>ALERT TYPE</th>
                <th>ZONE</th>
                <th>CLUSTER</th>
                <th>PRIORITY</th>
                <th>ACKNOWLEDGE STATUS</th>
                <th>ALERT CREATION TIME</th>
                <th>ALERT LAST UPDATED AT</th>
                <th>ALERT ACK BY</th>
                <th>ALERT ACK TIME</th>
                <th>TAGS</th>
                <th>TEAMS</th>
                <th>PRIMARY ONCALL</th>
                <th>SECONDARY ONCALL</th>
                <th>SEVERITY</th>
                <th>TIME TO ACK(min)</th>
                <th>TIME TO CLOSE(min)</th>
                <th>CLOSE TIME</th>
                <th>CLOSED BY</th>
                <th>STATUS</th>
                <th>ALERT LINK</th>
                <th>RUNBOOK</th>
                <th>CATEGORY</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((alert, index) => (
                <tr key={`${alert?.['Alert ID']}-${index}`}>
                  <td>{alert?.['AlertID'] ?? 'N/A'}</td>
                  <td>{alert?.['AlertName'] ? alert?.['AlertName'] : 'N/A'}</td>
                  <td>{alert?.['AlertType'] ? alert?.['AlertType'] : 'N/A'}</td>
                  <td>{alert?.Zone ?? 'N/A'}</td>
                  <td>{alert?.Cluster ?? 'N/A'}</td>
                  <td>{alert?.Priority ?? 'N/A'}</td>
                  <td>{alert?.Acknowledged ?? ''}</td>
                  <td>{alert?.['CreatedAtTime'] ?? 'N/A'}</td>
                  <td>{alert?.['UpdatedAtTime'] ?? 'N/A'}</td>
                  <td>{alert?.['AckBy'] ?? 'N/A'}</td>
                  <td>{alert?.['AlertAckTime'] ?? 'N/A'}</td>
                  <td>{alert?.['Tags'] ?? 'N/A'}</td>
                  <td>{alert?.['Team'] ?? 'N/A'}</td>
                  <td>{alert?.['PrimaryResponderEmail'] ?? 'N/A'}</td>
                  <td>{alert?.['SecondaryResponderEmail'] ?? 'N/A'}</td>
                  <td>{alert?.Severity ?? 'N/A'}</td>
                  <td>{alert?.['TimeToAck'] ?? 'N/A'}</td>
                  <td>{alert?.['TimeToClose'] ?? 'N/A'}</td>
                  <td>{alert?.['AlertCloseTime'] ?? 'N/A'}</td>
                  <td>{alert?.['ClosedBy'] ?? 'N/A'}</td>
                  <td>{alert?.Status ?? 'N/A'}</td>

                  <td>
                    <button onClick={() => handleShowAlert(alert?.['AlertURL'])}>Show Alert</button>
                  </td>
                  <td>
                    <button onClick={() => handleRunbook(alert?.['RunbookUrl'])}>Run Book</button>
                  </td>
                  <td>
                      {getCategory(alert?.['AlertID'])}
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </>
      ) : (
        <p>No alerts found.</p>
      )}
    </>
  );
};

export default Test;
