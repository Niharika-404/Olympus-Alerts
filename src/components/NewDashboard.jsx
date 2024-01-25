

// import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Papa from 'papaparse';
// import Chart from 'react-apexcharts';
// import TreemapChart from './TreemapChart.jsx';

// const NewDashboard = ({alertData}) => {
//   const [data, setData] = useState([]);
//   const [zoneOptions, setZoneOptions] = useState([]);
//   const [uniqueAlerts, setUniqueAlerts] = useState([]);
//   const [priorityCounts, setPriorityCounts] = useState([]);
//   const [selectedZone, setSelectedZone] = useState(''); // Set a default selected zone here
//   const [alertPriorities, setAlertPriorities] = useState({});


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // const response = await axios.post(
//         //   'http://127.0.0.1:5000/api/process_alerts',
//         //   { date: '2024-01-13' },
//         //   {
//         //     headers: {
//         //       'Content-Type': 'application/json',
//         //     },
//         //   }
//         // );
//         // const alerts = response.data.alerts;
//         const alerts = alertData;
//         setData(alertData);

//         // Extract unique zones
//           const uniqueZones = Array.from(new Set(alerts.map(alert=> alert?.Zone)));
//         setZoneOptions(uniqueZones);

//         // Extract unique alerts
//         const uniqueAlertNames = Array.from(new Set(alerts.map(alert=> alert?.['Alert Name'])))
//         setUniqueAlerts(uniqueAlertNames);

//         const alertPrioritiesMap = {};
//         uniqueAlertNames.forEach(alertName => {
         
//           alertPrioritiesMap[alertName] = Array.from(new Set(
//             alerts
//               .filter(alert => alert?.['Alert Name'] === alertName)
//               .map(alert => alert?.Priority)
//           ));
//         });
//         setAlertPriorities(alertPrioritiesMap);

//         // Extract priority-wise counts for open alerts
//         const priorities = ['P1', 'P2', 'P3', 'P4', 'P5'];
//         const priorityCounts = priorities.map(priority => ({
//           priority,
//           count: alerts.filter(alert => alert?.Priority === priority && alert?.Status === 'open').length,
//         }));
//         setPriorityCounts(priorityCounts);

//         // Set a default selected zone
//         if (uniqueZones.length > 0) {
//           setSelectedZone(uniqueZones[0]);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [alertData]);

//   // Filter unique alerts based on the selected zone
//   const filteredAlerts = uniqueAlerts.filter(alert =>
//     selectedZone? data.some(row => row?.Zone === selectedZone && row?.['Alert Name'] === alert) : true
//   );

//   // Render priorities for each unique alert
//   const renderPriorities = (alertName) => {
//     const priorities = alertPriorities[alertName] || [];
//     return priorities.join(', ');
//   };

//   const filteredPriorityCounts = priorityCounts.filter(priorityCount =>
//     selectedZone
//     ? data.some(alert => alert?.Zone === selectedZone && alert?.Priority === priorityCount.priority && alert?.Status === 'open')
//       : true
//   );

//   // Chart configuration
//   const chartOptions = {
//     labels: filteredPriorityCounts.map(item => item.priority),
//   };

//   const chartSeries = filteredPriorityCounts.map(item => item.count);



  

//   return (
//     <div>
//       <div id='zone-dropdown'>
//         {/* Filter Dropdown for Zones */}
//         <select value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)}>
//           {zoneOptions.map((zone, index) => (
//             <option key={index} value={zone}>
//               {zone}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div id='alerts-container'>
//         <div id='unique-alerts'>
//           {/* List of Unique Alerts for the Selected Zone */}
//           <h3>Unique Alerts</h3>
//           <ul>
//             {filteredAlerts.map((alert, index) => (
//               // <li key={index}>{alert '- Priorities:' renderPriorities(alert)} </li>
//               <li key={index}>
//               {alert} - {renderPriorities(alert)}
//             </li>
//             ))}
//           </ul>
//         </div>
//         <div id='priority-alerts'>
//           {/* Donut Chart for Open Alerts in Each Priority for the Selected Zone */}
//           <h3>Open Priority Alerts</h3>
//           <Chart options={chartOptions} series={chartSeries} type="donut" width="400" />
//         </div>
//       </div>
//       {/* Additional content can be added here */}
//       <div id='treemap-chart'>

//           <TreemapChart data={data} selectedZone={selectedZone} filteredAlerts={filteredAlerts} />
//         </div>    
//         </div>
//   );
// };

// export default NewDashboard;




import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import TreemapChart from './TreemapChart.jsx';
import PriorityVsTimeToAck from './PriorityVsTimeToAck.jsx';
// import AlertVsTimeDiff from './AlertVsTimeDiff.jsx';
// import NoiseAlerts from './NoiseAlerts.jsx';
import NoiseAlertsTable from './NoiseAlerts.jsx';
import AcknowledgementChart from './AcknowledgementChart.jsx';
import AlertVsTimeDiffTable from './AlertVsTimeDiff.jsx';


const NewDashboard = ({alertData}) => {
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
        const uniqueAlertNames = Array.from(new Set(alertData.map(alert => alert?.['Alert Name'])))
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
              .filter(alert => alert?.['Alert Name'] === alertName)
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
    selectedZone ? data.some(row => row?.Zone === selectedZone && row?.['Alert Name'] === alert) : true
  );

  // Render priorities for each unique alert
  const renderPriorities = (alertName) => {
    const priorities = alertPriorities[alertName] || [];
    return priorities.join(', ');
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

  return (
    <div>
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
      <div id='alerts-container'>
        <div id='unique-alerts'>
          {/* List of Unique Alerts for the Selected Zone */}
          <h3>Unique Alerts</h3>
          <ul>
            {filteredAlerts.map((alert, index) => (
              <li key={index}>
                <div className='alert-priority-div'>
                    <div>{alert}</div>
                    <div>{renderPriorities(alert)}</div>
                </div>
                {/* {alert} - {renderPriorities(alert)} */}
              </li>
            ))}
          </ul>
        </div>
        <div id='priority-alerts'>
          {/* Donut Chart for Open Alerts in Each Priority for the Selected Zone */}
          <h3>Open Priority Alerts</h3>
          <Chart options={chartOptions} series={chartSeries} type="donut" width="400" />
        </div>
      </div>
      <div>
        <div className='charts'>
           <PriorityVsTimeToAck alertData={alertData} selectedZone={selectedZone}/>
           <AcknowledgementChart alertData={alertData} selectedZone={selectedZone}/>

        </div>
        <div className='charts'>
            {/* <AlertVsTimeDiff alertData={alertData} selectedZone={selectedZone}/> */}
            {/* <NoiseAlerts alertData={alertData} selectedZone={selectedZone}/> */}
            <AlertVsTimeDiffTable alertData={alertData} selectedZone={selectedZone}/>
            <NoiseAlertsTable alertData={alertData} selectedZone={selectedZone} />


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
