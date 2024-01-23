import React, {useState, useEffect } from 'react';
// import axios from 'axios';
import { Oval } from 'react-loader-spinner';


const Test = ({selectedDate, alertData, loading, filters}) => {
 

//   const [alertData, setAlertData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     ( async () => {
//       try {
//         console.log('Component rendered');
//         // const response = await axios.post(
//         //   'http://127.0.0.1:5000/api/process_alerts',
//         // //   { date: '2024-01-13' },
//         // {date: selectedDate},
//         //   {
//         //     headers: {
//         //       'Content-Type': 'application/json',
//         //     },
//         //   }
//         // );
//         // const alerts = response.data.alerts;
//         console.log('Raw response data:', alertData);
  
//         // setAlertData(alerts);
//         // setLoading(false);
//       } catch (error) {
//         console.error('Error:', error);
//         // setLoading(false);
//       }
//     })();
  
//   }, [selectedDate, alertData, loading]); // Add dependencies if needed
  
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Apply filters to alertData
    const applyFilters = () => {
      const filteredAlerts = alertData.filter((alert) => {
        return (
          (!filters.cluster || alert.Cluster.includes(filters.cluster)) &&
          (!filters.namespace || alert.Namespace.includes(filters.namespace)) &&
          (!filters.alertName || alert['Alert Name'].includes(filters.alertName)) &&
          (!filters.zone || alert.Zone.includes(filters.zone)) &&
          (!filters.priority || alert.Priority.includes(filters.priority)) &&
          (!filters.status || alert.Status.includes(filters.status))
        );
      });

      setFilteredData(filteredAlerts);
    };

    applyFilters();
  }, [selectedDate, alertData, loading, filters]);

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
            <th>Date</th>
              <th>Tiny ID</th>
              <th>Alert ID</th>
              <th>Alert Name</th>
              <th>Alias</th>
              <th>Description</th>
              <th>Zone</th>
              <th>Cluster</th>
              <th>Namespace</th>
              <th>Priority</th>
              <th>Is Seen</th>
              <th>Acknowledged</th>
              <th>Alert Creation Time</th>
              <th>Ack Time</th>
              <th>Alert Last Updated At</th>
              <th>Alert Ack By</th>
              <th>Last Occured At</th>
              <th>Job</th>
              <th>Owner</th>
              <th>Service</th>
              <th>Severity</th>
              <th>Source</th>
              <th>Time To ACK</th>
              <th>Time To Close</th>
              <th>Time Diff</th>
              <th>Prometheus</th>
              <th>Grafana</th>
              <th>Contact Method</th>
              <th>Count</th>
              <th>Status</th>
              <th>Alert Link</th>
              <th>Runbook</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((alert) => (
              <tr key={`${alert?.['Tiny ID']}-${alert?.['Alert ID']}-${alert?.Cluster}`}>

                <td>{alert?.Date ?? 'N/A'}</td>
                <td>{alert?.['Tiny ID'] ?? 'N/A'}</td>
                <td>{alert?.['Alert ID'] ?? 'N/A'}</td>
                <td>{alert?.['Alert Name'] ?? 'N/A'}</td>
                <td>{alert?.Alias ?? 'N/A'}</td>
                <td>{alert?.Description ?? 'N/A'}</td>
                <td>{alert?.Zone ?? 'N/A'}</td>
                <td>{alert?.Cluster ?? 'N/A'}</td>
                <td>{alert?.Namespace ?? 'N/A'}</td>
                <td>{alert?.Priority ?? 'N/A'}</td>
                <td>{alert?.IsSeen ?? 'N/A'}</td>
                <td>{alert?.Acknowledged ?? 'N/A'}</td>
                <td>{alert?.['Alert Creation Time'] ?? 'N/A'}</td>
                <td>{alert?.['Ack Time'] ?? 'N/A'}</td>
                <td>{alert?.['Alert Last Updated At'] ?? 'N/A'}</td>
                <td>{alert?.['Alert Ack By'] ?? 'N/A'}</td>
                <td>{alert?.['Last Occured At'] ?? 'N/A'}</td>
                <td>{alert?.Job ?? 'N/A'}</td>
                <td>{alert?.Owner ?? 'N/A'}</td>
                <td>{alert?.Service ?? 'N/A'}</td>
                <td>{alert?.Severity ?? 'N/A'}</td>
                <td>{alert?.Source ?? 'N/A'}</td>
                <td>{alert?.['Time To ACK'] ?? 'N/A'}</td>
                <td>{alert?.['Time To Close'] ?? 'N/A'}</td>
                <td>{alert?.['Time Diff'] ?? 'N/A'}</td>
                <td>{alert?.Prometheus ?? 'N/A'}</td>
                <td>{alert?.Grafana ?? 'N/A'}</td>
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
