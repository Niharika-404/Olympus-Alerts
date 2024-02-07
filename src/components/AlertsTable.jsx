


import React, { useState, useEffect, useRef } from 'react';
import Test from './TestComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';



const AlertsTable = ({ selectedDate, alertData, loading, selectedStatus, setSelectedStatus, responders, onResponderChange, selectedResponder }) => {

    const [download, setDownload] = useState(false);
    const [isDropdownVisible, setDropdownVisibility] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [optionSearchTerm, setOptionSearchTerm] = useState('');
    // const [selectedResponder, setSelectedResponder] = useState('');


    const [searchResTerm, setSearchResTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
  
    const filteredResOptions = responders.filter(option =>
      option.toLowerCase().includes(searchResTerm.toLowerCase())
    );
  
  // State variables to hold filter values
  const [filters, setFilters] = useState({
    cluster: [],
    // namespace: [],
    alertName: [],
    zone: [],
    priority: [],
    status: [],
  });

  // State variables to hold unique values for checkboxes
  const [uniqueClusters, setUniqueClusters] = useState([]);
  // const [uniqueNamespaces, setUniqueNamespaces] = useState([]);
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
      // setUniqueNamespaces(getUnique('Namespace'));
      setUniqueAlertNames(getUnique('AlertName'));
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




  
  
 
  

   // useEffect for handling selectedStatus
   useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: selectedStatus ? [selectedStatus] : [],
    }));
  }, [selectedStatus]);

 



  const handleResetFilters = () => {
    setFilters({
      cluster: [],
      // namespace: [],
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



const handleFilterSelection = (filter) => {
    setSelectedFilter((prevFilter) => (prevFilter === filter ? null : filter));
    // setDropdownVisibility(false);
  };
  


  

  
const handleCheckboxChangeAll = (filter) => {
    const allValues = getAllFilterValues(filter);
    const allSelected = allValues.length > 0 && allValues.every(value => filters[filter]?.includes(value));
  
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
        return uniquePriorities;
      case 'zone':
        return uniqueZones;
      case 'cluster':
        return uniqueClusters;
      // case 'status':
      //   return uniqueStatus;
      // case 'namespace':
      //   return uniqueNamespaces;
      // Add cases for other filters...
      default:
        return [];
    }
  };
  
  const getFilterStyle = (filter) => {
    return selectedFilter === filter ? { backgroundColor: 'lightgray' } : {};
  };
  

const generateOptions = () => {
    switch (selectedFilter) {
      case 'Cluster':
        return generateOptionsForFilterWithAll(uniqueClusters, 'cluster');
  
      // case 'Namespace':
      //   return generateOptionsForFilterWithAll(uniqueNamespaces, 'namespace');
  
      case 'AlertName':
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
    const filteredValues = values.filter(value =>
        value?.toLowerCase().includes(optionSearchTerm.toLowerCase())
      );
    return filteredValues.map((value) => (
      <div key={value} className="checkbox-option">
        <input
          type="checkbox"
          value={value}
          checked={filters[filter]?.includes(value)}
          onChange={(event) => {
               // Prevent the event from reaching handleClickOutside
          event.stopPropagation();
            handleCheckboxChange(filter, value)}}
        />
        {value}
      </div>
    ));
  };

  
  
  const generateOptionsForFilterWithAll = (values, filter) => {
    const filteredValues = values.filter(value =>
        value?.toLowerCase().includes(optionSearchTerm.toLowerCase())
      );
    const options = filteredValues.map((value) => (
      <div key={value} className="checkbox-option">
        <input
          type="checkbox"
          value={value}
          checked={filters[filter]?.includes(value)}
          onChange={(event) => {
               // Prevent the event from reaching handleClickOutside
          event.stopPropagation();
            handleCheckboxChange(filter, value)}}
        />
        {value}
      </div>
    ));
    // Add "All" option
    options.unshift(
      <div key="all">
        <input
          type="checkbox"
          checked={filters[filter]?.length === values.length}
          onChange={(event) => {
             // Prevent the event from reaching handleClickOutside
          event.stopPropagation();
            handleCheckboxChangeAll(filter)}}
        />
        All
      </div>
    );
    return options;
  };
  
  const dropdownRef = useRef(null);

  useEffect(() => {

    const handleClickOutside = (event) => {
        const dropdownTrigger = document.querySelector('.filter-btn');
        const checkboxOptionClass = 'checkbox-option'; // Add this class to your checkbox options
        const optionsSearchClass = 'options-search';
      
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target) &&
          !dropdownTrigger.contains(event.target) &&
          !event.target.classList.contains(checkboxOptionClass) &&
          !event.target.classList.contains(optionsSearchClass)
        ) {
          // Clicked outside the dropdown, its trigger button, and not on a checkbox option, close it
          setDropdownVisibility(false);
        }
      };
      

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);


// Add a new function to handle search term change
const handleSearchChange = (event) => {
    setOptionSearchTerm(event.target.value);
  };
  

 // Function to clear a filter
const clearFilter = (filterName) => {

  setFilters((prevFilters) => ({
    ...prevFilters,
    [filterName]: [],
  }));

   // Clear selectedStatus if it matches the cleared filter
   if (filterName === 'status') {
    setSelectedStatus('');
  }
};


  const generateFilterSummary = () => {
    const selectedFilters = [];

    const addFilter = (filterName, filterValues) => {
      const filterCount = filterValues.length;
      if (filterCount === 1) {
        selectedFilters.push(
          <span key={filterName} className='selected-filter'>
            {filterName}: {filterValues[0]} <button className='clear-filter' onClick={() => clearFilter(filterName)}>x</button>
          </span>
        );
      } else if (filterCount > 1) {
        selectedFilters.push(
          <span key={filterName} className='selected-filter'>
            {filterName}: {filterCount} selected <button className='clear-filter' onClick={() => clearFilter(filterName)}>x</button>
          </span>
        );
      }
    };

    Object.entries(filters).forEach(([key, value]) => {
      if (value.length > 0) {
        switch (key) {
          case 'cluster':
            addFilter('cluster', value);
            break;
          // case 'namespace':
          //   addFilter('namespace', value);
          //   break;
          case 'alertName':
            addFilter('alertName', value);
            break;
          case 'zone':
            addFilter('zone', value);
            break;
          case 'priority':
            addFilter('priority', value);
            break;
          case 'status':
            addFilter('status', value);
            break;
          default:
            break;
        }
      }
    });

    return selectedFilters;
  };


  const dropdownSearchRef = useRef(null);

// useEffect to handle clicks outside the searchable dropdown
useEffect(() => {
  const handleClickOutsideSearchDropdown = (event) => {
    const dropdownSearchContainer = document.querySelector('.searchable-dropdown');
    if (
      dropdownSearchRef.current &&
      !dropdownSearchRef.current.contains(event.target) &&
      !dropdownSearchContainer.contains(event.target)
    ) {
      // Clicked outside the searchable dropdown, close it
      setIsOpen(false);
    }
  };

  document.addEventListener('click', handleClickOutsideSearchDropdown);

  return () => {
    document.removeEventListener('click', handleClickOutsideSearchDropdown);
  };
}, [dropdownSearchRef, setIsOpen]);

  // const responders = [...new Set(alertData.map((alert) => alert.Team))];


  return (
    <div 
    className='container'
    >
      <div className='filter-container'>
        {/* Checkbox filters */}
          <div style={{display:"flex", flexDirection:"row", gap:"40px"}}>
            <div onClick={toggleDropdown} className='filter-btn' >
              Filter       <FontAwesomeIcon className='filter-icon' icon={faFilter} />
            </div>
            {isDropdownVisible && (
              <div   className='filter-dropdown' ref={dropdownRef} >
                <p onClick={() => handleFilterSelection('Cluster')} style={getFilterStyle('Cluster')}>Cluster</p>
                {/* <p onClick={() => handleFilterSelection('Namespace')} style={getFilterStyle('Namespace')}>Namespace</p> */}
                <p onClick={() => handleFilterSelection('AlertName')} style={getFilterStyle('AlertName')}>Alert Name</p>
                <p onClick={() => handleFilterSelection('Priority')} style={getFilterStyle('Priority')}>Priority</p>
                <p onClick={() => handleFilterSelection('Status')} style={getFilterStyle('Status')}>Status</p>
                <p onClick={() => handleFilterSelection('Zone')} style={getFilterStyle('Zone')}>Zone</p>
              </div>
            )}
            
            <input
            id='normal-search'
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
            />
          </div>
            {selectedFilter && isDropdownVisible &&(
                <div className='filters-checkbox' >
                  <label 
                  className= 'options-checkbox'>
                    <strong>{selectedFilter}: </strong>
                    <input
                        type="search"
                        placeholder='Search...'
                        className='options-search'
                        value={optionSearchTerm}
                        onChange={handleSearchChange}
                    />
                    {generateOptions()}
                  </label>
                </div>
              )}
           

      
        <div className='reset-download-buttons'>

    
            {/* <select 
              id='team-select' 
              value={selectedResponder} 
              onChange={(e) => onResponderChange(e.target.value)} 
              placeholder="Select Responder"
            >
              {responders?.map((responder, index) => (
                <option key={index} value={responder}>
                  {responder}
                </option>
              ))}
            </select>  */}

          

<div className="searchable-dropdown" ref={dropdownSearchRef}>
      <input
        type="text"
        value={selectedResponder || 'olympus_middleware_sre'}
        onChange={() => {}}
        onClick={() => setIsOpen(!isOpen)}
        // placeholder="Select an option..."
        readOnly
      />
    {isOpen && (
        <div className='options'>
          <input
            type="search"
            value={searchResTerm}
            onChange={e => setSearchResTerm(e.target.value)}
            placeholder="Search..."
          />
          {filteredResOptions.map(option => (
            <div key={option} onClick={() => {
              onResponderChange(option);
              setIsOpen(false);
              setSearchResTerm('');
            }}>{option}</div>
          ))}
        </div>
      )}
      
    </div>

      

           
                <button onClick={handleResetFilters}>Reset Filters</button>
                {/* <button onClick={handleDownloadData}>Download Data</button> */}
                <FontAwesomeIcon icon={faCircleDown} onClick={handleDownloadData} className='download-table' />

        </div>

        
      </div>
        <div className="filter-summary">
          {generateFilterSummary().map((filter, index) => (
            <span key={index}>{filter}</span>
          ))}
        </div>
      <div >
        <Test
          selectedDate={selectedDate}
          alertData={alertData}
          loading={loading}
          filters={filters}
          download={download}
          setDownload={setDownload}
          searchTerm={searchTerm} 
        />
      </div>
    </div>
  );
};

export default AlertsTable;

