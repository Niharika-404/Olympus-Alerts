


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import { Oval } from 'react-loader-spinner';

const DataTable = ({ selectedStatus }) => {
  const [loading, setLoading] = useState(true);

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
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://docs.google.com/spreadsheets/d/17e_YlTfAXZ44mU_6GB3bwAWTPsRNYnHWAONPMh1NNhU/export?format=csv&id=17e_YlTfAXZ44mU_6GB3bwAWTPsRNYnHWAONPMh1NNhU&gid=1316218754');
//         const parsedData = Papa.parse(response.data, { header: true });
//         const tableData = parsedData.data;
//         const filteredByStatus = data.filter((row) => row.Status === selectedStatus || selectedStatus === '');
//         setData(tableData);
//         setFilteredData(tableData);
//         fetchFilterOptions(tableData);
//         setFilteredData(filteredByStatus);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [ selectedStatus]);

 
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://docs.google.com/spreadsheets/d/17e_YlTfAXZ44mU_6GB3bwAWTPsRNYnHWAONPMh1NNhU/export?format=csv&id=17e_YlTfAXZ44mU_6GB3bwAWTPsRNYnHWAONPMh1NNhU&gid=1316218754');
        const parsedData = Papa.parse(response.data, { header: true });
        const tableData = parsedData.data;
  
        // Set the initial state for both data and filteredData
        setData(tableData);
  
        // Set filter options using the initially fetched data
        fetchFilterOptions(tableData);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  // Add a separate useEffect for filtering based on selectedStatus and filterValues
  useEffect(() => {
    const filteredByStatus = data.filter((row) => row.Status === selectedStatus || selectedStatus === '');
  
    // Filter data based on other filter values
    const filteredByOtherFilters = filteredByStatus.filter((row) => {
      return Object.entries(filterValues).every(([key, filterValue]) => {
        const columnValue = String(row[key]);
        return filterValue === '' || columnValue.toLowerCase().includes(filterValue.toLowerCase());
      });
    });
  
    // Set the filtered data state
    setFilteredData(filteredByOtherFilters);
  }, [selectedStatus, filterValues, data]);
  

  const fetchFilterOptions = (tableData) => {
    const options = {};
    tableData.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (!options[key]) {
          options[key] = [...new Set(tableData.map((item) => item[key]))];
        }
      });
    });
    setFilterOptions(options);
  };

  const handleFilterChange = (columnName, value) => {
    console.log('handleFilterChange called');
    const updatedFilterValues = { ...filterValues, [columnName]: value.trim() };

    const filtered = data.filter((row) => {
      console.log('Filtering Row:', row);
      return Object.entries(updatedFilterValues).every(([key, filterValue]) => {
        const columnValue = String(row[key]);
        if (filterValue === '') {
          return true;
        }
        return columnValue.toLowerCase().includes(filterValue.toLowerCase());
      });
    });

    console.log('Updated Filter Values:', updatedFilterValues);
    console.log('Filtered Data:', filtered);

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

  const handleShowAlert = (url) => {
    window.open(url, '_blank');
  };

  const handleRunbook = (url) => {
    window.open(url, '_blank');
  };

  const handleToggleAcknowledge = (index) => {
    setAcknowledgedAlerts((prev) => {
      if (prev.includes(index)) {
        return prev.filter((ackIndex) => ackIndex !== index);
      } else {
        return [...prev, index];
      }
    });
  };

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
      {loading ? (
        <div id="loading">
          <Oval type="Oval" color="#00BFFF" height={50} width={50} />
        </div>
      ) :  (<div className='table-container'>
        <table >
          <thead>
            <tr>
              <th>Date</th>
              <th>TinyID</th>
              <th>Alert Name</th>
              <th>Priority</th>
              <th>Zone</th>
              <th>Status</th>
              <th>Alert Link</th>
              <th>Runbook_URL</th>
              <th>Email or Call</th>
              <th>Description</th>
              <th>Cluster</th>
              <th>Namespace</th>
              <th>Created_at</th>
              <th>Updated_at</th>
              <th>Count</th>
              <th>Show Alert</th>
              <th>Acknowledge Alert</th>
              <th>Acknowledged Status</th>
              <th>Runbook</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.Date}</td>
                <td>{row.TinyID}</td>
                <td>{row['Alert Name']}</td>
                <td>{row.Priority}</td>
                <td>{row.Zone}</td>
                <td>{row.Status}</td>
                <td>
                  <a href={row['Alert Link']} target="_blank" rel="noopener noreferrer">
                    {row['Alert Link']}
                  </a>
                </td>
                <td>
                  <a href={row.Runbook_URL} target="_blank" rel="noopener noreferrer">
                    {row.Runbook_URL}
                  </a>
                </td>
                <td>{row['Email or Call']}</td>
                <td>{row.Description}</td>
                <td>{row.Cluster}</td>
                <td>{row.Namespace}</td>
                <td>{row.Created_at}</td>
                <td>{row.Updated_at}</td>
                <td>{row.Count}</td>
                <td>
                  <button onClick={() => handleShowAlert(row['Alert Link'])}>Show Alert</button>
                </td>
                <td>
                  <button
                    onClick={() => handleToggleAcknowledge(index)}
                    style={{
                      background: acknowledgedAlerts.includes(index) ? 'grey' : '',
                    }}
                  >
                    {acknowledgedAlerts.includes(index) ? 'Unacknowledge' : 'Acknowledge'}
                  </button>
                </td>
                <td>{acknowledgedAlerts.includes(index) ? 'Acknowledged' : ''}</td>
                <td>
                  <button onClick={() => handleRunbook(row.Runbook_URL)}>Run</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default DataTable;








