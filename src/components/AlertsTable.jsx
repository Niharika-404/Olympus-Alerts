// import React from 'react';
// import Test from './TestComp';


// const AlertsTable = ({  selectedDate, alertData, loading }) => {


//   return (
   
//     <div className="container">
//         <div className='filter-container'>
//             Add Filter for cluster, namespace, alert name, zone , priority, status - alertData consists of all the data
//         </div>
//         <div className="table-container">
            
//          <Test selectedDate={selectedDate} alertData={alertData} loading={loading}/>
//         </div>
//     </div>
//   );
// };

// export default AlertsTable;


import React, { useState, useEffect } from 'react';
import Test from './TestComp';

const AlertsTable = ({ selectedDate, alertData, loading }) => {
  // State variables to hold filter values
  const [filters, setFilters] = useState({
    cluster: '',
    namespace: '',
    alertName: '',
    zone: '',
    priority: '',
    status: '',
  });

  // State variables to hold unique values for dropdowns
  const [uniqueClusters, setUniqueClusters] = useState([]);
  const [uniqueNamespaces, setUniqueNamespaces] = useState([]);
  const [uniqueAlertNames, setUniqueAlertNames] = useState([]);
  const [uniqueZones, setUniqueZones] = useState([]);
  const [uniqueStatus, setUniqueStatus] = useState([]);
  const [uniquePriorities, setUniquePriorities] = useState([]);

  // useEffect to fetch unique values for dropdowns
  useEffect(() => {
    const getUniqueValues = () => {
      // Function to get unique values from alertData
      const getUnique = (key) => [...new Set(alertData.map((alert) => alert[key]))];
      setUniqueClusters(getUnique('Cluster'));
      setUniqueNamespaces(getUnique('Namespace'));
      setUniqueAlertNames(getUnique('Alert Name'));
      setUniqueZones(getUnique('Zone'));
      setUniqueStatus(getUnique('Status'));
      setUniquePriorities(getUnique('Priority'));
    };

    getUniqueValues();
  }, [alertData]);

  return (
    <div className="container">
      <div className='filter-container'>
        {/* Dropdown filters */}
        <div>
        <label>
          Cluster:
          <select
            value={filters.cluster}
            onChange={(e) => setFilters({ ...filters, cluster: e.target.value })}
          >
            <option value="">All</option>
            {uniqueClusters.map((cluster) => (
              <option key={cluster} value={cluster}>{cluster}</option>
            ))}
          </select>
        </label>
        </div>
       <div>
       <label>
          Namespace:
          <select
            value={filters.namespace}
            onChange={(e) => setFilters({ ...filters, namespace: e.target.value })}
          >
            <option value="">All</option>
            {uniqueNamespaces.map((namespace) => (
              <option key={namespace} value={namespace}>{namespace}</option>
            ))}
          </select>
        </label>
       </div>
        <div>
        <label>
          Alert Name:
          <select
            value={filters.alertName}
            onChange={(e) => setFilters({ ...filters, alertName: e.target.value })}
          >
            <option value="">All</option>
            {uniqueAlertNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </label>
        </div>
        <div>
        <label>
          Zone:
          <select
            value={filters.zone}
            onChange={(e) => setFilters({ ...filters, zone: e.target.value })}
          >
            <option value="">All</option>
            {uniqueZones.map((zone) => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
        </label>
        </div>
       <div>
       <label>
          Priority:
          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          >
            <option value="">All</option>
            {uniquePriorities.map((priority) => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </label>
       </div>
        <div>
        <label>
          Status:
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All</option>
            {uniqueStatus.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </label>
        </div>
       
      </div>
      <div className="table-container">
        <Test
          selectedDate={selectedDate}
          alertData={alertData}
          loading={loading}
          filters={filters}
        />
      </div>
    </div>
  );
};

export default AlertsTable;
