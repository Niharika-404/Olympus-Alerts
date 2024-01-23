import React, {useState, useEffect} from 'react';
// import axios from 'axios';
import Papa from 'papaparse';
import Test from './TestComp';

// import { Oval } from 'react-loader-spinner';

const AlertsTable = ({ selectedStatus, selectedDate, alertData }) => {
//   const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterValues, setFilterValues] = useState({
    Cluster: '',
    Namespace: '',
    Zone: '',
    Status: '',
    Priority: '',
    'Alert Name': '',
  });
  const [filterOptions, setFilterOptions] = useState({
    Cluster: [],
    Namespace: [],
    Zone: [],
    Status: [],
    Priority: [],
    'Alert Name': [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.post(
        //   'http://127.0.0.1:5000/api/process_alerts',
        // //   { date: '2024-01-13' },
        //     {date: selectedDate},
        //   {
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //   }
        // );
        // const alerts = response.data.alerts || [];
        const alerts = alertData || [];
        if (alerts) {
            setData(alerts);
            setFilteredData(alerts);
            fetchFilterOptions(alerts);
          } else {
            console.error('Alerts data is null or undefined');
          }
       
      } catch (error) {
        console.error('Error fetching data:', error);
      } 
    //   finally {
    //     // setLoading(false);
    //   }
    };

    fetchData();
  }, [selectedDate, alertData]);

// //   useEffect(() => {
// //     const filteredByStatus = data.filter((row) => row.Status === selectedStatus || selectedStatus === '');

// //     const filteredByOtherFilters = filteredByStatus.filter((row) => {
// //       return Object.entries(filterValues).every(([key, filterValue]) => {
// //         const columnValue = String(row[key]);
// //         return filterValue === '' || columnValue.toLowerCase().includes(filterValue.toLowerCase());
// //       });
// //     });

// //     setFilteredData(filteredByOtherFilters);
// //   }, [selectedStatus, filterValues, data]);

//  // ...

useEffect(() => {
    const filteredByStatus = ((data || []).filter((row) => row && row.Status === selectedStatus) || selectedStatus === '');
  
    const filteredByOtherFilters = ((filteredByStatus || []).filter((row) => {
      return Object.entries(filterValues).every(([key, filterValue]) => {
        const columnValue = row ? String(row[key]) : '';
        return filterValue === '' || (columnValue && columnValue.toLowerCase().includes(filterValue.toLowerCase()));
      });
    })) || [];
  
    setFilteredData(filteredByOtherFilters);
  }, [selectedStatus, filterValues, data]);
  
 

//   const fetchFilterOptions = (tableData) => {
//     const options = {};
//     tableData.forEach((row) => {
//       Object.keys(row).forEach((key) => {
//         if (!options[key]) {
//           options[key] = [...new Set(tableData.map((item) => item[key]))];
//         }
//       });
//     });
//     setFilterOptions(options);
//   };


  

const fetchFilterOptions = (tableData) => {
    const options = {};
    (tableData || []).forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (!options[key]) {
          // Check if the property exists before accessing it
          if (row[key] !== null && row[key] !== undefined) {
            options[key] = [...new Set((tableData || []).map((item) => item[key]))];
          }
        }
      });
    });
    console.log('Options:', options); // Add this line to check the options object
    setFilterOptions(options);
  };
  
  const handleFilterChange = (columnName, value) => {
    const updatedFilterValues = { ...filterValues, [columnName]: value.trim() };

    const filtered = data.filter((row) => {
      return Object.entries(updatedFilterValues).every(([key, filterValue]) => {
        const columnValue = String(row[key]);
        if (filterValue === '') {
          return true;
        }
        return columnValue.toLowerCase().includes(filterValue.toLowerCase());
      });
    });

    setFilterValues(updatedFilterValues);
    setFilteredData(filtered);
  };

  const handleResetFilters = () => {
    setFilterValues({
      Cluster: '',
      Namespace: '',
      Zone: '',
      Status: '',
      Priority: '',
      'Alert Name': '',
    });
    setFilteredData(data);
  };

//   const handleShowAlert = (url) => {
//     window.open(url, '_blank');
//   };

//   const handleRunbook = (url) => {
//     window.open(url, '_blank');
//   };



  const handleDownload = () => {
    const csv = Papa.unparse(filteredData, {
      header: true,
      quotes: true,
      delimiter: ',',
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'alert_data.csv');
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <div className="filter-container">
        {Object.keys(filterValues).map((columnName) => (
          <div key={columnName}>
            <label>{columnName}:</label>
            {Array.isArray(filterOptions[columnName]) && (
              <select
                value={filterValues[columnName]}
                onChange={(e) => handleFilterChange(columnName, e.target.value)}
              >
                <option value="">All</option>
                {filterOptions[columnName].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        <button onClick={handleResetFilters}>Reset Filters</button>
        <button onClick={handleDownload} className="download-btn">
          Download Data
        </button>
      </div>
     
        <div className="table-container">
         <Test selectedDate={selectedDate}/>
        </div>
    </div>
  );
};

export default AlertsTable;
