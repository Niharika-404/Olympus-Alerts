// import React, {useState, useEffect } from 'react';
// // import axios from 'axios';
// import { Oval } from 'react-loader-spinner';
// import Papa from 'papaparse'


// const Test = ({selectedDate, alertData, loading, filters, download, setDownload, searchTerm}) => {
 


  
//   const [filteredData, setFilteredData] = useState([]);



// // console.log("Filters: ",filters);
// useEffect(() => {
//     // Apply filters to alertData
//     const applyFilters = () => {
//     if (Array.isArray(alertData)){
//       const filteredAlerts = alertData.filter((alert) => {
//         return (
//           // (!filters.cluster?.length || filters.cluster.some((value) => alert.Cluster.includes(value))) &&
//           (!filters.cluster?.length || (alert.Cluster && filters.cluster.some((value) => alert.Cluster.includes(value)))) &&

//           // (!filters.namespace?.length || filters.namespace.some((value) => alert.Namespace.includes(value))) &&
//           // (!filters.alertName?.length || filters.alertName.some((value) => alert['AlertName'].includes(value))) &&
//           (!filters.alertName?.length || (alert.AlertName && filters.alertName.some((value) => alert.AlertName.includes(value)))) &&

//           // (!filters.zone?.length || filters.zone.some((value) => alert.Zone.includes(value))) &&
//           (!filters.zone?.length || (alert.Zone && filters.zone.some((value) => alert.Zone.includes(value)))) &&

//           // (!filters.priority?.length || filters.priority.some((value) => alert.Priority.includes(value))) &&
//           (!filters.priority?.length || (alert.Priority && filters.priority.some((value) => alert.Priority.includes(value)))) &&

//           // (!filters.status?.length || filters.status.some((value) => alert.Status.includes(value))) &&
//           (!filters.status?.length || (alert.Status && filters.status.some((value) => alert.Status.includes(value)))) &&

          
//           (!searchTerm ||
//             Object.values(alert).some(
//               (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
//             ))



//         );
       
//       });

//       setFilteredData(filteredAlerts);
//     }
//       else{
//          // Handle cases where alertData is not an array
//             console.error("alertData is not an array:", alertData);
//             // You might want to set filteredData to an empty array or handle it differently based on your requirements
//             setFilteredData([]);
//               }

      
//     };
  
//     applyFilters();
//   }, [selectedDate, alertData, loading, filters, searchTerm]);







//   // console.log("Filtered Data for Table:", filteredData);
//   // useEffect(() => {
//   //   if (download) {
//   //     // Download logic
//   //     const csvHeaders = Object.keys(filteredData[0] || {});
//   //     const csvData = filteredData.map((alert) => {
//   //       return csvHeaders.reduce((rowData, header) => {
//   //         rowData[header] = alert[header] ?? 'N/A';
//   //         return rowData;
//   //       }, {});
//   //     });
  
//   //     // Create a CSV file
//   //     const csvFileName = 'alert_data.csv';
//   //     const csvLink = document.createElement('a');
//   //     csvLink.href = URL.createObjectURL(new Blob([Papa.unparse(csvData, { header: true })], { type: 'text/csv' }));
//   //     csvLink.setAttribute('download', csvFileName);
//   //     document.body.appendChild(csvLink);
//   //     csvLink.click();
//   //     document.body.removeChild(csvLink);
  
//   //     setDownload(false); // Reset download state after download logic is executed
//   //   }
//   // }, [download, setDownload, filteredData]);
//   useEffect(() => {
//     if (download) {
//       // Define the headers that correspond to the visible columns in the table
//       const visibleHeaders = [
//         'AlertID',
//         'AlertName',
//         'AlertType',
//         'Zone',
//         'Cluster',
//         'Priority',
//         'Acknowledged',
//         'CreatedAt',
//         'UpdatedAt',
//         'AckBy',
//         'AlertAckTime',
//         'Tags',
//         'Teams',
//         'PrimaryResponderEmail',
//         'SecondaryResponderEmail',
//         'Severity',
//         'TimeToAck',
//         'TimeToClose',
//         'AlertCloseTime',
//         'ClosedBy',
//         'Status',
//         'AlertURL',
//         'RunbookUrl',
//       ];
      
  
//       // Create CSV data only from the visible columns
//       const csvData = filteredData.map((alert) => {
//         const rowData = {};
//         visibleHeaders.forEach((header) => {
//           rowData[header] = alert[header] ?? 'N/A';
//         });
//         return rowData;
//       });
  
//       // Create a CSV file
//       const csvFileName = 'alert_data.csv';
//       const csvLink = document.createElement('a');
//       csvLink.href = URL.createObjectURL(new Blob([Papa.unparse(csvData, { header: true })], { type: 'text/csv' }));
//       csvLink.setAttribute('download', csvFileName);
//       document.body.appendChild(csvLink);
//       csvLink.click();
//       document.body.removeChild(csvLink);
  
//       setDownload(false); // Reset download state after download logic is executed
//     }
//   }, [download, setDownload, filteredData]);
  
  
  
  

//   const handleShowAlert = (url) => {
//     window.open(url, '_blank');
//   };

//   const handleRunbook = (url) => {
//     window.open(url, '_blank');
//   };


//   return (
//     <div>
//       {loading ? (
//         <Oval type="Oval" color="#00BFFF" height={50} width={50} />
//       ) :  filteredData && filteredData.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
            
//               {/* <th>Tiny ID</th> */}
//               <th>ALERT ID</th>
//               <th>ALERT NAME</th>
//               {/* <th>Alias</th> */}
//               <th>ALERT TYPE</th>
//               <th>ZONE</th>
//               <th>CLUSTER</th>

//               <th>PRIORITY</th>
//               {/* <th>Is Seen</th> */}
//               <th>ACKNOWLEDGE STATUS</th>
//               <th>ALERT CREATION TIME</th>
//               {/* <th>Ack Time(ms)</th> */}
//               <th>ALERT LAST UPDATED AT</th>
//               <th>ALERT ACK BY</th>
//               <th>ALERT ACK TIME</th>
             
//               <th>TAGS</th>
//               <th>TEAMS</th>
//               <th>PRIMARY ONCALL</th>
//               <th>SECONDARY ONCALL</th>
//               {/* <th>Job</th> */}
//               {/* <th>Owner</th> */}
    
//               <th>SEVERITY</th>
//               {/* <th>Source</th> */}
//               <th>TIME TO ACK(min)</th>
//               <th>TIME TO CLOSE(min)</th>

//               <th>CLOSE TIME</th>
//               <th>CLOSED BY</th>
//               {/* <th>Prometheus</th> */}
//               {/* <th>Grafana</th> */}
           

//               <th>STATUS</th>
//               <th>ALERT LINK</th>
//               <th>RUNBOOK</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((alert, index) => (
//               <tr key={`${alert?.['Alert ID']}-${index}`}>

                
//                 {/* <td>{alert?.['Tiny ID'] ?? 'N/A'}</td> */}
//                 <td>{alert?.['AlertID'] ?? 'N/A'}</td>
//                 <td>{alert?.['AlertName'] ? alert?.['AlertName']: 'N/A'}</td>
//                 <td>{alert?.['AlertType'] ? alert?.['AlertType']: 'N/A'}</td>
//                 {/* <td>{alert?.Alias ?? 'N/A'}</td> */}
//                 {/*<td>{alert?.Description ?? 'N/A'}</td>*/}
//                 <td>{alert?.Zone ?? 'N/A'}</td>
//                 <td>{alert?.Cluster ?? 'N/A'}</td>

//                 <td>{alert?.Priority ?? 'N/A'}</td>
//                 {/* <td>{alert?.IsSeen ?? 'N/A'}</td> */}
//                 {/* <td>{alert?.Acknowledged ?? 'N/A'}</td> */}
//                 {/* <td>{String(alert?.Acknowledged) === 'true' ? 'Acknowledged' : 'false'}</td> */}
//                 <td>{alert?.Acknowledged ?? 'false'}</td>

//                 <td>{alert?.['CreatedAt'] ?? 'N/A'}</td>
//                 <td>{alert?.['UpdatedAt'] ?? 'N/A'}</td>
//                 <td>{alert?.['AckBy'] ?? 'N/A'}</td>
//                 <td>{alert?.['AlertAckTime'] ?? 'N/A'}</td>
//                 {/* <td>{alert?.['Ack Time'] ?? 'N/A'}</td> */}
                
                
                
//                 <td>{alert?.['Tags'] ?? 'N/A'}</td>
//                 <td>{alert?.['Team'] ?? 'N/A'}</td>
//                 {/* <td>{alert?.Job ?? 'N/A'}</td> */}
//                 {/* <td>{alert?.Owner ?? 'N/A'}</td> */}
//                 <td>{alert?.['PrimaryResponderEmail'] ?? 'N/A'}</td>
//                 <td>{alert?.['SecondaryResponderEmail'] ?? 'N/A'}</td>
//                 <td>{alert?.Severity ?? 'N/A'}</td>
//                 {/* <td>{alert?.Source ?? 'N/A'}</td> */}
//                 <td>{alert?.['TimeToAck'] ?? 'N/A'}</td>
//                 <td>{alert?.['TimeToClose'] ?? 'N/A'}</td>
               
//                 <td>{alert?.['AlertCloseTime'] ?? 'N/A'}</td>
//                 <td>{alert?.['ClosedBy'] ?? 'N/A'}</td>
//                 {/* <td>{alert?.Prometheus ?? 'N/A'}</td> */}
//                 {/* <td>{alert?.Grafana ?? 'N/A'}</td> */}
              
//                 {/* <td>{alert?.Count ?? 'N/A'}</td> */}
//                 <td>{alert?.Status ?? 'N/A'}</td>
//                 {/* <td>{alert?.['Alert Link'] ?? 'N/A'}</td> */}
//                 <td>
//                   <button onClick={() => handleShowAlert(alert?.['AlertURL'])}>Show Alert</button>
//                 </td>
//                 {/* <td>{alert?.['Runbook '] ?? 'N/A'}</td> */}
//                 <td>
//                   <button onClick={() => handleRunbook(alert?.['RunbookUrl'])}>Run Book</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//        ) : (
//         <p>No alerts found.</p>
//       )} 
//     </div>
//   );
// };

// export default Test;





// import React, { useState, useEffect } from 'react';
// import { Oval } from 'react-loader-spinner';
// import Papa from 'papaparse';

// const Test = ({ selectedDate, alertData, loading, filters, download, setDownload, searchTerm }) => {
//   const [filteredData, setFilteredData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const applyFilters = () => {
//       if (Array.isArray(alertData)) {
//         const filteredAlerts = alertData.filter((alert) => {
//           return (
//             (!filters.cluster?.length || (alert.Cluster && filters.cluster.some((value) => alert.Cluster.includes(value)))) &&
//             (!filters.alertName?.length || (alert.AlertName && filters.alertName.some((value) => alert.AlertName.includes(value)))) &&
//             (!filters.zone?.length || (alert.Zone && filters.zone.some((value) => alert.Zone.includes(value)))) &&
//             (!filters.priority?.length || (alert.Priority && filters.priority.some((value) => alert.Priority.includes(value)))) &&
//             (!filters.status?.length || (alert.Status && filters.status.some((value) => alert.Status.includes(value)))) &&
//             (!searchTerm ||
//               Object.values(alert).some(
//                 (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
//               ))
//           );
//         });

//         setFilteredData(filteredAlerts);
//       } else {
//         console.error("alertData is not an array:", alertData);
//         setFilteredData([]);
//       }
//     };

//     applyFilters();
//   }, [selectedDate, alertData, loading, filters, searchTerm]);

//   // Calculate total pages
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   // Slice the data based on current page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//   const handleShowAlert = (url) => {
//     window.open(url, '_blank');
//   };

//   const handleRunbook = (url) => {
//     window.open(url, '_blank');
//   };

//   // Function to change page
//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   useEffect(() => {
//     if (download) {
//       const visibleHeaders = [
//         'AlertID',
//         'AlertName',
//         'AlertType',
//         'Zone',
//         'Cluster',
//         'Priority',
//         'Acknowledged',
//         'CreatedAt',
//         'UpdatedAt',
//         'AckBy',
//         'AlertAckTime',
//         'Tags',
//         'Teams',
//         'PrimaryResponderEmail',
//         'SecondaryResponderEmail',
//         'Severity',
//         'TimeToAck',
//         'TimeToClose',
//         'AlertCloseTime',
//         'ClosedBy',
//         'Status',
//         'AlertURL',
//         'RunbookUrl',
//       ];

//       const allCsvData = filteredData.map((alert) => {
//         const rowData = {};
//         visibleHeaders.forEach((header) => {
//           rowData[header] = alert[header] ?? 'N/A';
//         });
//         return rowData;
//       });

//       const csvFileName = 'alert_data.csv';
//       const csvLink = document.createElement('a');
//       csvLink.href = URL.createObjectURL(new Blob([Papa.unparse(allCsvData, { header: true })], { type: 'text/csv' }));
//       csvLink.setAttribute('download', csvFileName);
//       document.body.appendChild(csvLink);
//       csvLink.click();
//       document.body.removeChild(csvLink);

//       setDownload(false); // Reset download state after download logic is executed
//     }
//   }, [download, setDownload, filteredData]);

//   return (
//     <>
//       {loading ? (
//         <Oval type="Oval" color="#00BFFF" height={50} width={50} />
//       ) : filteredData && filteredData.length > 0 ? (
//         <>
//           <table>
//             <thead>
//               <tr>
//                 <th>ALERT ID</th>
//                 <th>ALERT NAME</th>
//                 <th>ALERT TYPE</th>
//                 <th>ZONE</th>
//                 <th>CLUSTER</th>
//                 <th>PRIORITY</th>
//                 <th>ACKNOWLEDGE STATUS</th>
//                 <th>ALERT CREATION TIME</th>
//                 <th>ALERT LAST UPDATED AT</th>
//                 <th>ALERT ACK BY</th>
//                 <th>ALERT ACK TIME</th>
//                 <th>TAGS</th>
//                 <th>TEAMS</th>
//                 <th>PRIMARY ONCALL</th>
//                 <th>SECONDARY ONCALL</th>
//                 <th>SEVERITY</th>
//                 <th>TIME TO ACK(min)</th>
//                 <th>TIME TO CLOSE(min)</th>
//                 <th>CLOSE TIME</th>
//                 <th>CLOSED BY</th>
//                 <th>STATUS</th>
//                 <th>ALERT LINK</th>
//                 <th>RUNBOOK</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.map((alert, index) => (
//                 <tr key={`${alert?.['Alert ID']}-${index}`}>
//                   <td>{alert?.['AlertID'] ?? 'N/A'}</td>
//                   <td>{alert?.['AlertName'] ? alert?.['AlertName'] : 'N/A'}</td>
//                   <td>{alert?.['AlertType'] ? alert?.['AlertType'] : 'N/A'}</td>
//                   <td>{alert?.Zone ?? 'N/A'}</td>
//                   <td>{alert?.Cluster ?? 'N/A'}</td>
//                   <td>{alert?.Priority ?? 'N/A'}</td>
//                   <td>{alert?.Acknowledged ?? 'false'}</td>
//                   <td>{alert?.['CreatedAt'] ?? 'N/A'}</td>
//                   <td>{alert?.['UpdatedAt'] ?? 'N/A'}</td>
//                   <td>{alert?.['AckBy'] ?? 'N/A'}</td>
//                   <td>{alert?.['AlertAckTime'] ?? 'N/A'}</td>
//                   <td>{alert?.['Tags'] ?? 'N/A'}</td>
//                   <td>{alert?.['Team'] ?? 'N/A'}</td>
//                   <td>{alert?.['PrimaryResponderEmail'] ?? 'N/A'}</td>
//                   <td>{alert?.['SecondaryResponderEmail'] ?? 'N/A'}</td>
//                   <td>{alert?.Severity ?? 'N/A'}</td>
//                   <td>{alert?.['TimeToAck'] ?? 'N/A'}</td>
//                   <td>{alert?.['TimeToClose'] ?? 'N/A'}</td>
//                   <td>{alert?.['AlertCloseTime'] ?? 'N/A'}</td>
//                   <td>{alert?.['ClosedBy'] ?? 'N/A'}</td>
//                   <td>{alert?.Status ?? 'N/A'}</td>
//                   <td>
//                     <button onClick={() => handleShowAlert(alert?.['AlertURL'])}>Show Alert</button>
//                   </td>
//                   <td>
//                     <button onClick={() => handleRunbook(alert?.['RunbookUrl'])}>Run Book</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
        
//         </>
//       ) : (
//         <p>No alerts found.</p>
//       )}
//         {/* <ul className="pagination">
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
//               <li key={pageNumber}>
//                 <button onClick={() => paginate(pageNumber)}>{pageNumber}</button>
//               </li>
//             ))}
//           </ul> */}
// <div className="pagination">
//   <p onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{'<'}</p>
//   {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1 + (currentPage > 5 ? currentPage - 5 : 0))
//     .filter(pageNumber => pageNumber <= totalPages)
//     .map((pageNumber) => (
//       <p key={pageNumber} onClick={() => paginate(pageNumber)}>{pageNumber}</p>
//     ))}
//   <p onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>{'>'}</p>
// </div>








//     </>
//   );
// };

// export default Test;



import React, { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import Papa from 'papaparse';
import { TablePagination } from '@mui/material';

const Test = ({ selectedDate, alertData, loading, filters, download, setDownload, searchTerm }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  React.useEffect(() => {
    const applyFilters = () => {
      if (Array.isArray(alertData)) {
        const filteredAlerts = alertData.filter((alert) => {
          return (
            (!filters.cluster?.length || (alert.Cluster && filters.cluster.some((value) => alert.Cluster.includes(value)))) &&
            (!filters.alertName?.length || (alert.AlertName && filters.alertName.some((value) => alert.AlertName.includes(value)))) &&
            (!filters.zone?.length || (alert.Zone && filters.zone.some((value) => alert.Zone.includes(value)))) &&
            (!filters.priority?.length || (alert.Priority && filters.priority.some((value) => alert.Priority.includes(value)))) &&
            (!filters.status?.length || (alert.Status && filters.status.some((value) => alert.Status.includes(value)))) &&
            (!searchTerm ||
              Object.values(alert).some(
                (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
              ))
          );
        });

        setFilteredData(filteredAlerts);
      } else {
        console.error("alertData is not an array:", alertData);
        setFilteredData([]);
      }
    };

    applyFilters();
  }, [selectedDate, alertData, loading, filters, searchTerm]);

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
        'CreatedAt',
        'UpdatedAt',
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
                  <td>{alert?.Acknowledged ?? 'false'}</td>
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
