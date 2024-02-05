



import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import TreemapChart from './TreemapChart.jsx';
import PriorityVsTimeToAck from './PriorityVsTimeToAck.jsx';
// import AlertVsTimeDiff from './AlertVsTimeDiff.jsx';
// import NoiseAlerts from './NoiseAlerts.jsx';
import NoiseAlertsTable from './NoiseAlerts.jsx';
import AcknowledgementChart from './AcknowledgementChart.jsx';
import AlertVsTimeDiffTable from './AlertVsTimeDiff.jsx';
import AutoAlertsTable from './AutoAlerts.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown } from '@fortawesome/free-solid-svg-icons';
// import Papa from 'papaparse';



const NewDashboard = ({alertData, isNavMenuOpen}) => {
  const [data, setData] = useState([]);
  const [zoneOptions, setZoneOptions] = useState([]);
  const [uniqueAlerts, setUniqueAlerts] = useState([]);
  const [priorityCounts, setPriorityCounts] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');
  const [alertPriorities, setAlertPriorities] = useState({});

  useEffect(() => {
    

    
      try {
        

        

      

        if (!alertData) {
        console.error('Error: No alertData found.');
        return;}
        setData(alertData);

        // Extract unique zones
        const uniqueZones = Array.from(new Set(alertData.map(alert => alert?.Zone)));
        setZoneOptions(uniqueZones);

        // Extract unique alerts
        const uniqueAlertNames = Array.from(new Set(alertData.map(alert => alert?.['AlertName'])))
        setUniqueAlerts(uniqueAlertNames);

        // Extract priority-wise counts for open alerts
        const priorities = ['P1', 'P2', 'P3', 'P4', 'P5'];
        const priorityCounts = priorities.map(priority => ({
          priority,
          count: alertData.filter(alert => alert?.Priority === priority && alert?.Status === 'open').length,
        }));
        setPriorityCounts(priorityCounts);

        // Set a default selected zone
        if (uniqueZones.length > 0) {
          setSelectedZone(uniqueZones[0]);
        }

        // Extract priorities for each unique alert
        const alertPrioritiesMap = {};
        uniqueAlertNames.forEach(alertName => {
          alertPrioritiesMap[alertName] = Array.from(new Set(
            alertData
              .filter(alert => alert?.['AlertName'] === alertName)
              .map(alert => alert?.Priority)
          ));
        });
        setAlertPriorities(alertPrioritiesMap);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    
  }, [alertData]);

  // Filter unique alerts based on the selected zone
  const filteredAlerts = uniqueAlerts.filter(alert =>
    selectedZone ? data.some(row => row?.Zone === selectedZone && row?.['AlertName'] === alert) : true
  );

  // Render priorities for each unique alert
//   const renderPriorities = (alertName) => {
//     const priorities = alertPriorities[alertName] || [];
//     return priorities.join(', ');
//   };


// Update renderPriorities to consider only the selected zone
const renderPriorities = (alertName) => {
    const priorities = alertPriorities[alertName] || [];
    const prioritiesForSelectedZone = priorities.filter(
      (priority) =>
        data.some(
          (alert) =>
            alert?.['AlertName'] === alertName &&
            alert?.Zone === selectedZone &&
            alert?.Priority === priority 
            // alert?.Status === 'open'
        )
    );
    return prioritiesForSelectedZone.join(', ');
  };

  // Filter priority counts based on the selected zone
  const filteredPriorityCounts = priorityCounts.filter(priorityCount =>
    selectedZone ?
      data.some(alert =>
        alert?.Zone === selectedZone && alert?.Priority === priorityCount.priority && alert?.Status === 'open'
      ) :
      true
  );

  // Chart configuration
  const chartOptions = {
    labels: filteredPriorityCounts.map(item => item.priority),
  };

  const chartSeries = filteredPriorityCounts.map(item => item.count);
  // console.log(chartSeries)


  // function handleDownload() {
  //   // Create a new Blob containing the data to be downloaded
  //   const data = filteredAlerts.map((alert) => `${alert} - ${renderPriorities(alert)}`).join('\n');
  //   const blob = new Blob([data], { type: 'text/plain' });
  
  //   // Create a URL for the Blob
  //   const url = URL.createObjectURL(blob);
  
  //   // Create a temporary anchor element to trigger the download
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'unique_alerts.txt'; // Specify the filename for the downloaded file
  
  //   // Programmatically trigger the click event on the anchor element
  //   document.body.appendChild(a);
  //   a.click();
  
  //   // Clean up: remove the temporary anchor element and revoke the URL
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  // }

  function handleDownload() {
    // Prepare the CSV content
    let csvContent = 'Alert,Priority\n'; // Header row
  
    // Iterate over filteredAlerts and add each alert and its priority to the CSV content
    filteredAlerts.forEach((alert) => {
      csvContent += `"${alert}","${renderPriorities(alert)}"\n`;
    });
  
    // Create a Blob containing the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv' });
  
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'unique_alerts.csv'; // Specify the filename for the downloaded file
  
    // Programmatically trigger the click event on the anchor element
    document.body.appendChild(a);
    a.click();
  
    // Clean up: remove the temporary anchor element and revoke the URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  
  return (
    <div className={isNavMenuOpen? 'dashboard-container': 'full-width'}>
      <div id='zone-dropdown'>
        {/* Filter Dropdown for Zones */}
        <select value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)}>
          {zoneOptions.map((zone, index) => (
            <option key={index} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>
      {/* <div id='alerts-container'>
        <div id='unique-alerts'>
          <div className='alerts-time-table'> 
          <h3>Unique Alerts</h3>
          <FontAwesomeIcon icon={faCircleDown} onClick={handleDownload} />
          </div>
         <div className='unique-alerts-content'>
         <ul>
            {filteredAlerts.map((alert, index) => (
              <li key={index}>
                <div className='alert-priority-div'>
                    <div>{alert}</div>
                    <div>{renderPriorities(alert)}</div>
                </div>
              </li>
            ))}
          </ul>
         </div>
         
        </div>
        <div id='priority-alerts'>
          <h3>Open Priority Alerts</h3>
          <Chart options={chartOptions} series={chartSeries} type="donut" width="400" />
        </div>
      </div> */}

      <div id='alerts-container'>
        <div id='unique-alerts'>
          <div className='alerts-time-table'> 
            <h3>Unique Alerts</h3>
            <FontAwesomeIcon icon={faCircleDown} onClick={handleDownload} />
          </div>
          <div className='unique-alerts-content'>
            {filteredAlerts.length > 0 ? (
              <ul>
                {filteredAlerts.map((alert, index) => (
                  <li key={index}>
                    <div className='alert-priority-div'>
                      <div>{alert}</div>
                      <div>{renderPriorities(alert)}</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No unique alerts found.</p>
            )}
          </div>
        </div>
        <div id='priority-alerts'>
          <h3>Open Priority Alerts</h3>
          {chartSeries.every(count => count === 0) ? (
            <p>No open alerts in the selected zone.</p>
          ) : (
            <Chart options={chartOptions} series={chartSeries} type="donut" width="400" />
          )}
        </div>

      </div>


      <div>
        <div className='charts'>
           <PriorityVsTimeToAck alertData={alertData} selectedZone={selectedZone}/>
           <AcknowledgementChart alertData={alertData} selectedZone={selectedZone}/>

        </div>
        <div className='charts' >
            {/* <AlertVsTimeDiff alertData={alertData} selectedZone={selectedZone}/> */}
            {/* <NoiseAlerts alertData={alertData} selectedZone={selectedZone}/> */}
            <AlertVsTimeDiffTable alertData={alertData} selectedZone={selectedZone}/>
            <NoiseAlertsTable alertData={alertData} selectedZone={selectedZone} />
            <AutoAlertsTable alertData={alertData} selectedZone={selectedZone}/>

        </div>
       
       
      </div>
      {/* Additional content can be added here */}
      <div id='treemap-chart'>
        <TreemapChart data={data} selectedZone={selectedZone} filteredAlerts={filteredAlerts} />
      </div>
    </div>
  );
};

export default NewDashboard;
