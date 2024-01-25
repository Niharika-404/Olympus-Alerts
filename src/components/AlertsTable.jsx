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


// import React, { useState, useEffect } from 'react';
// import Test from './TestComp';

// const AlertsTable = ({ selectedDate, alertData, loading }) => {
//   // State variables to hold filter values
//   const [filters, setFilters] = useState({
//     cluster: '',
//     namespace: '',
//     alertName: '',
//     zone: '',
//     priority: '',
//     status: '',
//   });

//   // State variables to hold unique values for dropdowns
//   const [uniqueClusters, setUniqueClusters] = useState([]);
//   const [uniqueNamespaces, setUniqueNamespaces] = useState([]);
//   const [uniqueAlertNames, setUniqueAlertNames] = useState([]);
//   const [uniqueZones, setUniqueZones] = useState([]);
//   const [uniqueStatus, setUniqueStatus] = useState([]);
//   const [uniquePriorities, setUniquePriorities] = useState([]);

//   // useEffect to fetch unique values for dropdowns
//   useEffect(() => {
//     const getUniqueValues = () => {
//       // Function to get unique values from alertData
//       const getUnique = (key) => [...new Set(alertData.map((alert) => alert[key]))];
//       setUniqueClusters(getUnique('Cluster'));
//       setUniqueNamespaces(getUnique('Namespace'));
//       setUniqueAlertNames(getUnique('Alert Name'));
//       setUniqueZones(getUnique('Zone'));
//       setUniqueStatus(getUnique('Status'));
//       setUniquePriorities(getUnique('Priority'));
//     };

//     getUniqueValues();
//   }, [alertData]);

//   return (
//     <div className="container">
//       <div className='filter-container'>
//         {/* Dropdown filters */}
//         <div>
//         <label>
//           Cluster:
//           <select
//             value={filters.cluster}
//             onChange={(e) => setFilters({ ...filters, cluster: e.target.value })}
//           >
//             <option value="">All</option>
//             {uniqueClusters.map((cluster) => (
//               <option key={cluster} value={cluster}>{cluster}</option>
//             ))}
//           </select>
//         </label>
//         </div>
//        <div>
//        <label>
//           Namespace:
//           <select
//             value={filters.namespace}
//             onChange={(e) => setFilters({ ...filters, namespace: e.target.value })}
//           >
//             <option value="">All</option>
//             {uniqueNamespaces.map((namespace) => (
//               <option key={namespace} value={namespace}>{namespace}</option>
//             ))}
//           </select>
//         </label>
//        </div>
//         <div>
//         <label>
//           Alert Name:
//           <select
//             value={filters.alertName}
//             onChange={(e) => setFilters({ ...filters, alertName: e.target.value })}
//           >
//             <option value="">All</option>
//             {uniqueAlertNames.map((name) => (
//               <option key={name} value={name}>{name}</option>
//             ))}
//           </select>
//         </label>
//         </div>
//         <div>
//         <label>
//           Zone:
//           <select
//             value={filters.zone}
//             onChange={(e) => setFilters({ ...filters, zone: e.target.value })}
//           >
//             <option value="">All</option>
//             {uniqueZones.map((zone) => (
//               <option key={zone} value={zone}>{zone}</option>
//             ))}
//           </select>
//         </label>
//         </div>
//        <div>
//        <label>
//           Priority:
//           <select
//             value={filters.priority}
//             onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
//           >
//             <option value="">All</option>
//             {uniquePriorities.map((priority) => (
//               <option key={priority} value={priority}>{priority}</option>
//             ))}
//           </select>
//         </label>
//        </div>
//         <div>
//         <label>
//           Status:
//           <select
//             value={filters.status}
//             onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//           >
//             <option value="">All</option>
//             {uniqueStatus.map((status) => (
//               <option key={status} value={status}>{status}</option>
//             ))}
//           </select>
//         </label>
//         </div>
       
//       </div>
//       <div className="table-container">
//         <Test
//           selectedDate={selectedDate}
//           alertData={alertData}
//           loading={loading}
//           filters={filters}
//         />
//       </div>
//     </div>
//   );
// };

// export default AlertsTable;


// --------------------------------------------------------------------


import React, { useState, useEffect } from 'react';
import Test from './TestComp';

const AlertsTable = ({ selectedDate, alertData, loading, selectedStatus, setSelectedStatus }) => {

    const [download, setDownload] = useState(false);
    const [isDropdownVisible, setDropdownVisibility] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);


  // State variables to hold filter values
  const [filters, setFilters] = useState({
    cluster: [],
    namespace: [],
    alertName: [],
    zone: [],
    priority: [],
    status: [],
  });

  // State variables to hold unique values for checkboxes
  const [uniqueClusters, setUniqueClusters] = useState([]);
  const [uniqueNamespaces, setUniqueNamespaces] = useState([]);
  const [uniqueAlertNames, setUniqueAlertNames] = useState([]);
  const [uniqueZones, setUniqueZones] = useState([]);
  const [uniqueStatus, setUniqueStatus] = useState([]);
  const [uniquePriorities, setUniquePriorities] = useState([]);

  const handleDownloadData = () => {
    setDownload(true);
  };

  // useEffect to fetch unique values for checkboxes
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

  const handleCheckboxChange = (filterKey, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      const index = updatedFilters[filterKey].indexOf(value);

      if (index === -1) {
        // Value not present, add it
        updatedFilters[filterKey] = [...updatedFilters[filterKey], value];
      } else {
        // Value present, remove it
        updatedFilters[filterKey] = [
          ...updatedFilters[filterKey].slice(0, index),
          ...updatedFilters[filterKey].slice(index + 1),
        ];
      }

      return updatedFilters;
    });
  };

   // useEffect for manual selection along with other filters
//    useEffect(() => {
//     const filteredData = alertData.filter((row) => {
//       return Object.entries(filters).every(([key, filterValues]) => {
//         if (key === 'status') {
//           return filterValues.length === 0 ? !selectedStatus || row[key] === selectedStatus : filterValues.includes(row[key]);
//         }
//         return filterValues.length === 0 || filterValues.includes(row[key]);
//       });

//     });
  
//     // You can use the filtered data as needed
//     console.log('Filtered Data (Manual Selection):', filteredData);
//   }, [filters, selectedStatus, alertData]);

useEffect(() => {
    console.log('Filters:', filters);
    console.log('Selected Status:', selectedStatus);
  
    // const filteredData = alertData.filter((row) => {
    //   const statusFilterPassed = selectedStatus ? row.status === selectedStatus : true;
  
    //   const otherFiltersPassed = Object.entries(filters).every(([key, filterValues]) => {
    //     if (key === 'status') {
    //       return true;
    //     }
    //     return filterValues.length === 0 || filterValues.includes(row[key]);
    //   });
  
    //   return statusFilterPassed && otherFiltersPassed;
    // });
  
    // console.log('Filtered Data (Manual Selection):', filteredData);
  }, [filters, selectedStatus, alertData]);
  
  
 
  

   // useEffect for handling selectedStatus
   useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: selectedStatus ? [selectedStatus] : [],
    }));
  }, [selectedStatus]);

    // // useEffect for handling selectedStatus
    // useEffect(() => {
    //     setFilters((prevFilters) => {
    //       if (selectedStatus) {
    //         return {
    //           ...prevFilters,
    //           status: [selectedStatus],
    //         };
    //       }
    //       // Clear manually selected status if any
    //       const { status, ...restFilters } = prevFilters;
    //       return restFilters;
    //     });
    //   }, [selectedStatus]);

    // useEffect for handling selectedStatus
// useEffect(() => {
//     setFilters((prevFilters) => {
//       if (selectedStatus) {
//         return {
//           ...prevFilters,
//           status: [selectedStatus],
//         };
//       }
//       // Clear manually selected status if any
//       const { status, ...restFilters } = prevFilters || { status: [] }; // Ensure prevFilters is not undefined
//       return restFilters;
//     });
// }, [selectedStatus]);


  console.log(selectedStatus); //selectedStatus - open or closed

  const handleResetFilters = () => {
    setFilters({
      cluster: [],
      namespace: [],
      alertName: [],
      zone: [],
      priority: [],
      status: [],
    });
    setSelectedStatus('')
    setDropdownVisibility(false)
  };



  const toggleDropdown = () => {
    setDropdownVisibility(!isDropdownVisible);
  
  };

//   const closeDropdown = () => {
//     setDropdownVisibility(false);
//   };

//   const handleFilterSelection = (filter) => {
//     setSelectedFilter(filter);
//   };

const handleFilterSelection = (filter) => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? null : filter));
    // setDropdownVisibility(false);
  };
  

//   const handleCheckboxChangeAll = (filter) => {
//     const allValues = filter === 'alertName' ? uniqueAlertNames : filters[filter];
//     const allSelected = allValues.every(value => filters[filter].includes(value));
  
//     const updatedFilters = { ...filters };
//     if (allSelected) {
//       updatedFilters[filter] = [];
//     } else {
//       updatedFilters[filter] = [...new Set([...updatedFilters[filter], ...allValues])];
//     }
  
//     setFilters(updatedFilters);
//   };
  

  
const handleCheckboxChangeAll = (filter) => {
    const allValues = getAllFilterValues(filter);
    const allSelected = allValues.length > 0 && allValues.every(value => filters[filter].includes(value));
  
    const updatedFilters = { ...filters };
    if (allSelected) {
      updatedFilters[filter] = [];
    } else {
              updatedFilters[filter] = [...new Set([...updatedFilters[filter], ...allValues])];

    //   updatedFilters[filter] = [...new Set(allValues)];
    }
  
    setFilters(updatedFilters);
  };
  
  const getAllFilterValues = (filter) => {
    switch (filter) {
      case 'alertName':
        return uniqueAlertNames;
      case 'priority':
        console.log(uniquePriorities);
        return uniquePriorities;
      case 'zone':
        return uniqueZones;
      case 'cluster':
        return uniqueClusters;
      case 'namespace':
        return uniqueNamespaces;
      // Add cases for other filters...
      default:
        return [];
    }
  };
  
  const getFilterStyle = (filter) => {
    return selectedFilter === filter ? { backgroundColor: 'lightgray' } : {};
  };
  

//   const generateOptions = () => {
//     switch (selectedFilter) {
//       case 'Cluster':
//         return uniqueClusters.map((cluster) => (
//           <div key={cluster}>
//             <input
//               type="checkbox"
//               value={cluster}
//               checked={filters.cluster.includes(cluster)}
//               onChange={() => handleCheckboxChange('cluster', cluster)}
//             />
//             {cluster}
//           </div>
//         ));
//       case 'Namespace':
//         return uniqueNamespaces.map((namespace) => (
//           <div key={namespace}>
//             <input
//               type="checkbox"
//               value={namespace}
//               checked={filters.namespace.includes(namespace)}
//               onChange={() => handleCheckboxChange('namespace', namespace)}
//             />
//             {namespace}
//           </div>
//         ));
//       // Add cases for other filters...
//     //   case 'Alert Name':
//     //     return uniqueAlertNames.map((name) => (
//     //         <div key={name}>
//     //           <input
//     //             type="checkbox"
//     //             value={name}
//     //             checked={filters.alertName.includes(name)}
//     //             onChange={() => handleCheckboxChange('alertName', name)}
//     //           />
//     //           {name}
//     //         </div>
//     //     ));

//         case 'Alert Name':
//             const alertNameOptions = uniqueAlertNames.map((name) => (
//               <div key={name}>
//                 <input
//                   type="checkbox"
//                   value={name}
//                   checked={filters.alertName.includes(name)}
//                   onChange={() => handleCheckboxChange('alertName', name)}
//                 />
//                 {name}
//               </div>
//             ));
//             // Add "All" option
//             alertNameOptions.unshift(
//               <div key="all">
//                 <input
//                   type="checkbox"
//                   checked={filters.alertName.length === uniqueAlertNames.length}
//                   onChange={() => handleCheckboxChangeAll('alertName')}
//                 />
//                 All
//               </div>
//             );
//             return alertNameOptions;
    

//         case 'Priority':
//             return uniquePriorities.map((priority) => (
//                 <div key={priority}>
//                   <input
//                     type="checkbox"
//                     value={priority}
//                     checked={filters.priority.includes(priority)}
//                     onChange={() => handleCheckboxChange('priority', priority)}
//                   />
//                   {priority}
//                 </div>
//               ));

//         case 'Zone':
//             return uniqueZones.map((zone) => (
//                 <div key={zone}>
//                   <input
//                     type="checkbox"
//                     value={zone}
//                     checked={filters.zone.includes(zone)}
//                     onChange={() => handleCheckboxChange('zone', zone)}
//                   />
//                   {zone}
//                 </div>
//               ));

//         case 'Status':
//             return uniqueStatus.map((status) => (
//                 <div key={status}>
//                     <input
//                     type="checkbox"
//                     value={status}
//                     checked={filters.status.length === 0 ? selectedStatus === status : filters.status.includes(status)}
    
    
//                     onChange={() => handleCheckboxChange('status', status)}
//                     />
//                     {status}
//                 </div>
//                 ));

//       default:
//         return null;
//     }
//   };
  // ... (your existing code)

const generateOptions = () => {
    switch (selectedFilter) {
      case 'Cluster':
        return generateOptionsForFilterWithAll(uniqueClusters, 'cluster');
  
      case 'Namespace':
        return generateOptionsForFilterWithAll(uniqueNamespaces, 'namespace');
  
      case 'Alert Name':
        return generateOptionsForFilterWithAll(uniqueAlertNames, 'alertName');
  
      case 'Priority':
        return generateOptionsForFilterWithAll(uniquePriorities, 'priority');
  
      case 'Zone':
        return generateOptionsForFilterWithAll(uniqueZones, 'zone');
  
      case 'Status':
        return generateOptionsForFilter(uniqueStatus, 'status');
  
      default:
        return null;
    }
  };
  
  const generateOptionsForFilter = (values, filter) => {
    return values.map((value) => (
      <div key={value}>
        <input
          type="checkbox"
          value={value}
          checked={filters[filter].includes(value)}
          onChange={() => handleCheckboxChange(filter, value)}
        />
        {value}
      </div>
    ));
  };
  
  const generateOptionsForFilterWithAll = (values, filter) => {
    const options = values.map((value) => (
      <div key={value}>
        <input
          type="checkbox"
          value={value}
          checked={filters[filter].includes(value)}
          onChange={() => handleCheckboxChange(filter, value)}
        />
        {value}
      </div>
    ));
    // Add "All" option
    options.unshift(
      <div key="all">
        <input
          type="checkbox"
          checked={filters[filter].length === values.length}
          onChange={() => handleCheckboxChangeAll(filter)}
        />
        All
      </div>
    );
    return options;
  };
  
  // ... (rest of your existing code)
  

  return (
    <div className="container">
      <div className='filter-container'>
        {/* Checkbox filters */}
        <div>
      <div onClick={toggleDropdown} className='filter-btn'>
        Filter By
      </div>
      {isDropdownVisible && (
        <div className='filter-dropdown' >
          <p onClick={() => handleFilterSelection('Cluster')} style={getFilterStyle('Cluster')}>Cluster</p>
          <p onClick={() => handleFilterSelection('Namespace')} style={getFilterStyle('Namespace')}>Namespace</p>
          <p onClick={() => handleFilterSelection('Alert Name')} style={getFilterStyle('Alert Name')}>Alert Name</p>
          <p onClick={() => handleFilterSelection('Priority')} style={getFilterStyle('Priority')}>Priority</p>
          <p onClick={() => handleFilterSelection('Status')} style={getFilterStyle('Status')}>Status</p>
          <p onClick={() => handleFilterSelection('Zone')} style={getFilterStyle('Zone')}>Zone</p>
        </div>
      )}
    </div>
    {selectedFilter && isDropdownVisible &&(
        <div className='filters-checkbox'>
          <label className='options-checkbox'>
            <strong>{selectedFilter}: </strong>
            {generateOptions()}
          </label>
        </div>
      )}
        {/* <div className='filters-checkbox'>
          <label className='options-checkbox'>
            <strong>Cluster: </strong>
            {uniqueClusters.map((cluster) => (
              <div key={cluster} >
                <input
                  type="checkbox"
                  value={cluster}
                  checked={filters.cluster.includes(cluster)}
                  onChange={() => handleCheckboxChange('cluster', cluster)}
                />
                {cluster}
              </div>
            ))}
          </label>
        </div>
        <div className='filters-checkbox'>
          <label className='options-checkbox'>
            <strong>Namespace: </strong>
            {uniqueNamespaces.map((namespace) => (
              <div key={namespace}>
                <input
                  type="checkbox"
                  value={namespace}
                  checked={filters.namespace.includes(namespace)}
                  onChange={() => handleCheckboxChange('namespace', namespace)}
                />
                {namespace}
              </div>
            ))}
          </label>
        </div>
        <div className='filters-checkbox'>
          <label className='options-checkbox'>
            <strong>Alert Name: </strong>
            {uniqueAlertNames.map((name) => (
              <div key={name}>
                <input
                  type="checkbox"
                  value={name}
                  checked={filters.alertName.includes(name)}
                  onChange={() => handleCheckboxChange('alertName', name)}
                />
                {name}
              </div>
            ))}
          </label>
        </div>
        <div className='filters-checkbox'>
          <label className='options-checkbox'>
            <strong>Zone: </strong>
            {uniqueZones.map((zone) => (
              <div key={zone}>
                <input
                  type="checkbox"
                  value={zone}
                  checked={filters.zone.includes(zone)}
                  onChange={() => handleCheckboxChange('zone', zone)}
                />
                {zone}
              </div>
            ))}
          </label>
        </div>
        <div className='filters-checkbox'>
          <label className='options-checkbox'>
            <strong>Priority:</strong>
            {uniquePriorities.map((priority) => (
              <div key={priority}>
                <input
                  type="checkbox"
                  value={priority}
                  checked={filters.priority.includes(priority)}
                  onChange={() => handleCheckboxChange('priority', priority)}
                />
                {priority}
              </div>
            ))}
          </label>
        </div>
        {/* <div className='filters-checkbox'>
          <label className='options-checkbox'>
            <strong>Status:</strong>
            {uniqueStatus.map((status) => (
              <div key={status}>
                <input
                  type="checkbox"
                  value={status}
                  checked={filters.status.includes(status)}
                  onChange={() => handleCheckboxChange('status', status)}
                />
                {status}
              </div>
            ))}
          </label>
        </div> */}
        {/* <div className='filters-checkbox'>
        <label className='options-checkbox'>
            <strong>Status:</strong>
            {uniqueStatus.map((status) => (
            <div key={status}>
                <input
                type="checkbox"
                value={status}
                checked={filters.status.length === 0 ? selectedStatus === status : filters.status.includes(status)}


                onChange={() => handleCheckboxChange('status', status)}
                />
                {status}
            </div>
            ))}
        </label>
     
        </div>  */}
        <div className='reset-download-buttons'>
                <button onClick={handleResetFilters}>Reset Filters</button>
                <button onClick={handleDownloadData}>Download Data</button>
        </div>
        
      </div>
      <div className="table-container">
        <Test
          selectedDate={selectedDate}
          alertData={alertData}
          loading={loading}
          filters={filters}
          download={download}
          setDownload={setDownload}
        />
      </div>
    </div>
  );
};

export default AlertsTable;

// ------------------------------------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import Test from './TestComp';

// // FilterDropdown component
// const FilterDropdown = ({ label, options, selectedOptions, onOptionChange }) => {
//     return (
//       <div className='filters-dropdown'>
//         <label className='options-dropdown'>
//           <strong>{label}: </strong>
//           {options.map((option) => (
//             <div key={option}>
//               <input
//                 type="checkbox"
//                 value={option}
//                 checked={selectedOptions.includes(option)}
//                 onChange={() => {
//                   const updatedOptions = selectedOptions.includes(option)
//                     ? selectedOptions.filter((value) => value !== option)
//                     : [...selectedOptions, option];
//                   onOptionChange(updatedOptions);
//                 }}
//               />
//               {option}
//             </div>
//           ))}
//         </label>
//       </div>
//     );
//   };
  
  

// const AlertsTable = ({
//   selectedDate,
//   alertData,
//   loading,
//   selectedStatus,
//   setSelectedStatus,
// }) => {
//   // State variables to hold filter values
//   const [filters, setFilters] = useState({
//     cluster: [],
//     namespace: [],
//     alertName: [],
//     zone: [],
//     priority: [],
//     status: [],
//   });

//   // State variables to hold unique values for dropdowns
//   const [uniqueClusters, setUniqueClusters] = useState([]);
//   const [uniqueNamespaces, setUniqueNamespaces] = useState([]);
//   const [uniqueAlertNames, setUniqueAlertNames] = useState([]);
//   const [uniqueZones, setUniqueZones] = useState([]);
//   const [uniqueStatus, setUniqueStatus] = useState([]);
//   const [uniquePriorities, setUniquePriorities] = useState([]);

//   const [download, setDownload] = useState(false);

//     const handleDownloadData = () => {
//     setDownload(true);
//   };


//   // useEffect to fetch unique values for dropdowns
//   useEffect(() => {
//     const getUniqueValues = () => {
//       const getUnique = (key) => [...new Set(alertData.map((alert) => alert[key]))];
//       setUniqueClusters(getUnique('Cluster'));
//       setUniqueNamespaces(getUnique('Namespace'));
//       setUniqueAlertNames(getUnique('Alert Name'));
//       setUniqueZones(getUnique('Zone'));
//       setUniqueStatus(getUnique('Status'));
//       setUniquePriorities(getUnique('Priority'));
//     };

//     getUniqueValues();
//   }, [alertData]);

//   const handleDropdownChange = (filterKey, selectedOptions) => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [filterKey]: selectedOptions,
//     }));
//   };

// //     const handleCheckboxChange = (filterKey, value) => {
// //     setFilters((prevFilters) => {
// //       const updatedFilters = { ...prevFilters };
// //       const index = updatedFilters[filterKey].indexOf(value);

// //       if (index === -1) {
// //         // Value not present, add it
// //         updatedFilters[filterKey] = [...updatedFilters[filterKey], value];
// //       } else {
// //         // Value present, remove it
// //         updatedFilters[filterKey] = [
// //           ...updatedFilters[filterKey].slice(0, index),
// //           ...updatedFilters[filterKey].slice(index + 1),
// //         ];
// //       }

// //       return updatedFilters;
// //     });
// //   };

//    // useEffect for manual selection along with other filters
//    useEffect(() => {
//     const filteredData = alertData.filter((row) => {
//       return Object.entries(filters).every(([key, filterValues]) => {
//         if (key === 'status') {
//           return filterValues.length === 0 ? !selectedStatus || row[key] === selectedStatus : filterValues.includes(row[key]);
//         }
//         return filterValues.length === 0 || filterValues.includes(row[key]);
//       });

//     });
  

//     // You can use the filtered data as needed
//     console.log('Filtered Data (Manual Selection):', filteredData);
//   }, [filters, selectedStatus, alertData]);

//      // useEffect for handling selectedStatus
//    useEffect(() => {
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       status: selectedStatus ? [selectedStatus] : [],
//     }));
//   }, [selectedStatus]);

//   // ... (existing code)
//     console.log(selectedStatus); //selectedStatus - open or closed

//   const handleResetFilters = () => {
//     setFilters({
//       cluster: [],
//       namespace: [],
//       alertName: [],
//       zone: [],
//       priority: [],
//       status: [],
//     });
//     setSelectedStatus('')
//   };


//   return (
//     <div className='container'>
//       <div className='filter-container'>
//         {/* Dropdown filters */}
//         <FilterDropdown
//           label='Cluster'
//           options={uniqueClusters}
//           selectedOptions={filters.cluster}
//           onOptionChange={(selectedOptions) =>
//             handleDropdownChange('cluster', selectedOptions)
//           }
//         />
//         <FilterDropdown
//           label='Namespace'
//           options={uniqueNamespaces}
//           selectedOptions={filters.namespace}
//           onOptionChange={(selectedOptions) =>
//             handleDropdownChange('namespace', selectedOptions)
//           }
//         />
//         <FilterDropdown
//           label='Alert Name'
//           options={uniqueAlertNames}
//           selectedOptions={filters.alertName}
//           onOptionChange={(selectedOptions) =>
//             handleDropdownChange('alertName', selectedOptions)
//           }
//         />
//         <FilterDropdown
//           label='Zone'
//           options={uniqueZones}
//           selectedOptions={filters.zone}
//           onOptionChange={(selectedOptions) =>
//             handleDropdownChange('zone', selectedOptions)
//           }
//         />
//         <FilterDropdown
//           label='Priority'
//           options={uniquePriorities}
//           selectedOptions={filters.priority}
//           onOptionChange={(selectedOptions) =>
//             handleDropdownChange('priority', selectedOptions)
//           }
//         />
//         <FilterDropdown
//           label='Status'
//           options={uniqueStatus}
//           selectedOptions={filters.status}
//           onOptionChange={(selectedOptions) =>
//             handleDropdownChange('status', selectedOptions)
//           }
//         />

//         <div className='reset-download-buttons'>
//           <button onClick={handleResetFilters}>Reset Filters</button>
//           <button onClick={handleDownloadData}>Download Data</button>
//         </div>
//       </div>
//       <div className='table-container'>
//         <Test
//           selectedDate={selectedDate}
//           alertData={alertData}
//           loading={loading}
//           filters={filters}
//           download={download}
//           setDownload={setDownload}
//         />
//       </div>
//     </div>
//   );
// };

// export default AlertsTable;
