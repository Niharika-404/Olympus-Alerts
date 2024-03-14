
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
// import NewDashboard from './components/NewDashboard';
import axios from 'axios';

import Papa, { parse } from 'papaparse';
// import Home from './components/Home';


function App() {

  const apiUrl = process.env.REACT_APP_API_URL;


  const today = new Date();
  const startInitial = new Date(today);
  startInitial.setHours(0, 0, 0, 0);
  const endInitial = new Date();

  const [start, setStart] = useState(startInitial);
  const [end, setEnd] = useState(endInitial);

  const [selectedResponder, setSelectedResponder] = useState('olympus_middleware_sre');

  const [activeTab, setActiveTab] = useState('Alerts');

  const [alertsLoading, setAlertsLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  const [alertData, setAlertData] = useState([]);
  const [olympusData, setOlympusData] = useState([]);
  const [nonOlympusData, setNonOlympusData] = useState([]);

  const [alertModelData, setAlertModelData] = useState([]);
  const [olympusModelData, setOlympusModelData] = useState([]);
  const [nonOlympusModelData, setNonOlympusModelData] = useState([]);


  const [refresh, setRefresh] = useState(false);

  const [responders, setResponders] = useState([]);
  const [trendData, setTrendData] = useState([]);

  const [priorityTrendData, setPriorityTrendData] = useState([]);



  const [category, setCategory] = useState('Olympus');

  const [dashboardData, setDashboardData] = useState('Alerts');
  const [showClassifyButton, setShowClassifyButton] = useState(true); // State to track the visibility of "Classify Alerts" button
  const [showClassifyButtonForOly, setShowClassifyButtonForOly] = useState(true); // State to track the visibility of "Classify Alerts" button
  const [showClassifyButtonForNonOly, setShowClassifyButtonForNonOly] = useState(true);


  const [countLoading, setcountLoading] = useState(false);
  const [countLoadingOly, setcountLoadingOly] = useState(false);
  const [countLoadingNonOly, setcountLoadingNonOly] = useState(false)



  const handleClassifyClick = () => {
    setShowClassifyButton(false); // Hide the "Classify Alerts" button
    setcountLoading(true)
    classifyAlerts('Alerts');
  };

  const handleClassifyOlyClick = () => {
    setShowClassifyButtonForOly(false); // Hide the "Classify Alerts" button
    setcountLoadingOly(true);
    classifyAlerts('Olympus');
  };

  const handleClassifyNonOlyClick = () => {
    setShowClassifyButtonForNonOly(false); // Hide the "Classify Alerts" button
    setcountLoadingNonOly(true);
    classifyAlerts('Olympus');
  };
  
  const handleDashboardData = (dashboardData) => {
    setDashboardData(dashboardData)
  }

  useEffect(() => {
    // Whenever there's a change in alertData, show the "Classify Alerts" button
    setShowClassifyButton(true);
  }, [alertData]);
  
  useEffect(() => {
    // Whenever there's a change in olympusData or nonOlympusData, show the "Classify Alerts" button for Olympus
    setShowClassifyButtonForOly(true);
  }, [olympusData]);

  useEffect(() => {
    // Whenever there's a change in olympusData or nonOlympusData, show the "Classify Alerts" button for Olympus
    setShowClassifyButtonForNonOly(true);
  }, [nonOlympusData]);
  

const handleTabChange  = (tab) =>{
  setActiveTab(tab);
  if(tab!=='Olympus')
    setDashboardData('Alerts');
  if (tab==='Olympus')
    setCategory('Olympus')
}

// Modify the handleCategoryChange function to handle category selection
const handleCategoryChange = (category) => {

  setCategory(category);
};




// console.log(category);

const formatDate = (date) => {
  const [day, month, year] = date.split('/');
  
  // Construct the formatted date string in yyyy-mm-dd format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

const classifyAlerts = useCallback(async (activetab) => {
  try {
    let dataToBeSent = {}; // Default to an empty object
    // Determine the data to be sent based on the active tab and category
    if(activetab==='Alerts'){
      dataToBeSent = alertData;
      const response = await axios.post(`${apiUrl}/predict`, {data: dataToBeSent}, {headers: {'Content-Type': 'application/json'}});
      const safeResponseData = response.data.replace(/\bNaN\b/g, "null");
      const parsedData = JSON.parse(safeResponseData);
      setAlertModelData(parsedData);
      setcountLoading(false)

    }
    else if(activetab==='Olympus'){
      dataToBeSent = category==='Olympus' ? olympusData : nonOlympusData;
      const response = await axios.post(`${apiUrl}/predict`, {data: dataToBeSent}, {headers: {'Content-Type': 'application/json'}});
      const safeResponseData = response.data.replace(/\bNaN\b/g, "null");
      const parsedData = JSON.parse(safeResponseData);
      if(category==='Olympus'){
        setOlympusModelData(parsedData)
      }
      else{
        setNonOlympusModelData(parsedData)
      }
      setcountLoadingOly(false)
      setcountLoadingNonOly(false)


    }

  
    
    
  } catch (error) {
    console.error('Error classifying alerts:', error);
  }
}, [alertData, olympusData, nonOlympusData, category]);





 

const fetchData = useCallback(async (startParam = start, endParam=end) => {
  try {
    setAlertsLoading(true);

    // Convert startParam to the required format for your API call
    const startObj = new Date(startParam);
    const startFormatted = {
      date: startObj.toLocaleString().split(',')[0], // Date part
      time: startObj.toLocaleString().split(',')[1].trim() // Time part
    };

    // Convert endParam to the required format for your API call
    let endFormatted;
    if (endParam) {
      const endObj = new Date(endParam);
      endFormatted = {
        date: endObj.toLocaleString().split(',')[0], // Date part
        time: endObj.toLocaleString().split(',')[1].trim() // Time part
      };
    } else {
      // Use current date and time if endParam is not provided
      const endObj = new Date();
      endFormatted = {
        date: endObj.toLocaleString().split(',')[0],
        time: endObj.toLocaleString().split(',')[1].trim()
      };
    }
  

    const response = await axios.get(`${apiUrl}/alerts`, {
      params: {
        responder_name: selectedResponder,
        start_date: formatDate(startFormatted.date),
        end_date: formatDate(endFormatted.date),
        start_time: startFormatted.time,
        end_time: endFormatted.time,
      },
    });

 

    // Your existing logic to handle the response
    setAlertData(response.data.data);
   
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setAlertsLoading(false);
    
  }
}, [selectedResponder]);



const fetchOlympusData = useCallback(async (startParam = start, endParam=end) => {
  try {
    setLoading(true);

    // Convert startParam to the required format for your API call
    const startObj = new Date(startParam);
    const startFormatted = {
      date: startObj.toLocaleString().split(',')[0], // Date part
      time: startObj.toLocaleString().split(',')[1].trim() // Time part
    };

    // Convert endParam to the required format for your API call
    let endFormatted;
    if (endParam) {
      const endObj = new Date(endParam);
      endFormatted = {
        date: endObj.toLocaleString().split(',')[0], // Date part
        time: endObj.toLocaleString().split(',')[1].trim() // Time part
      };
    } else {
      // Use current date and time if endParam is not provided
      const endObj = new Date();
      endFormatted = {
        date: endObj.toLocaleString().split(',')[0],
        time: endObj.toLocaleString().split(',')[1].trim()
      };
    }
    // console.log('API call');
   

    const olyResponse = await axios.get(`${apiUrl}/alerts/olympus`, {
      params: {
        start_date: formatDate(startFormatted.date),
        end_date: formatDate(endFormatted.date),
        start_time: startFormatted.time,
        end_time: endFormatted.time,
      },
    });

   
    setOlympusData(olyResponse.data.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
});

const fetchNonOlympusData = useCallback(async (startParam = start, endParam=end) => {
  try {
    setLoading(true);

    // Convert startParam to the required format for your API call
    const startObj = new Date(startParam);
    const startFormatted = {
      date: startObj.toLocaleString().split(',')[0], // Date part
      time: startObj.toLocaleString().split(',')[1].trim() // Time part
    };

    // Convert endParam to the required format for your API call
    let endFormatted;
    if (endParam) {
      const endObj = new Date(endParam);
      endFormatted = {
        date: endObj.toLocaleString().split(',')[0], // Date part
        time: endObj.toLocaleString().split(',')[1].trim() // Time part
      };
    } else {
      // Use current date and time if endParam is not provided
      const endObj = new Date();
      endFormatted = {
        date: endObj.toLocaleString().split(',')[0],
        time: endObj.toLocaleString().split(',')[1].trim()
      };
    }
    // console.log('API call');
   

    const nonOlyResponse = await axios.get(`${apiUrl}/alerts/non_olympus`, {
      params: {
        start_date: formatDate(startFormatted.date),
        end_date: formatDate(endFormatted.date),
        start_time: startFormatted.time,
        end_time: endFormatted.time,
      },
    });

   
    setNonOlympusData(nonOlyResponse.data.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    setLoading(false);
  }
});

  useEffect(() => {
    const fetchResponderNames = async () => {
      try {
        const responderNames = await axios.get(`${apiUrl}/responder_names`);
        // console.log(responderNames.data.responder_names);
        setResponders(responderNames.data.responder_names);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchResponderNames();
  }, []);
  


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchOlympusData();
    fetchNonOlympusData();
  }, []); // Empty dependency array means this effect runs only once on mount
  
  
  useEffect(()=>{
    const fetchTrendData = async ()=>{
      try {
        const trendResponse = await axios.get(`${apiUrl}/trend`, {
          params: {
            responder_name: selectedResponder
          },
        });
        // console.log(trendResponse.data);
        setTrendData(trendResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchTrendData()
  },[selectedResponder])

  useEffect(()=>{
    const fetchPriorityTrendData = async ()=>{
      try {
        const priorityTrendResponse = await axios.get(`${apiUrl}/priority`, {
          params: {
            responder_name: selectedResponder
          },
        });
        // console.log(priorityTrendResponse.data);
        setPriorityTrendData(priorityTrendResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchPriorityTrendData()
  },[selectedResponder])
  


  const handleStartDateChange = (date) => {
    setStart(date);
  };
  const handleEndDateChange = (date) => {
    setEnd(date);
  };

  const handleResponderChange = (responder) => {
    setSelectedResponder(responder);
  }



 


  const handleSearch = (startTemp, endTemp) => {
    // Validation and conversion logic here
    // Update start and end state
    // console.log(startTemp,endTemp);

    const selectedStart = new Date(startTemp);
    const selectedEnd = endTemp && new Date(endTemp);

    // setStart(new Date(startTemp));
    // setEnd(new Date(endTemp));
    // Trigger fetchData or any other necessary actions
    if(activeTab==='Alerts'){
      fetchData(selectedStart, selectedEnd)
      setShowClassifyButton(true)


    }
    else if(activeTab==='Olympus'){
      if(category==='Olympus'){
        fetchOlympusData(selectedStart, selectedEnd)
        setShowClassifyButtonForOly(true)

      }
      else{
        fetchNonOlympusData(selectedStart, selectedEnd)
        setShowClassifyButtonForNonOly(true)

      }
    }
  };
// Remove the immediate check for `refresh` within `onRefresh`
const onRefresh = () => {
  setRefresh(true); // Simply set `refresh` to true
  if(activeTab==='Alerts'){
    setShowClassifyButton(true)

  }
  else if(activeTab==='Olympus'){
    if(category==='Olympus'){
      setShowClassifyButtonForOly(true)

    }
    else{
      setShowClassifyButtonForNonOly(true)
    }
  }
};

// Use an effect to react to changes in `refresh`
useEffect(() => {
  if (refresh) {
    // Place your logic that should run after refresh is set to true here
    // console.log("Refresh logic runs now.");
    const startInitial = new Date(today);
    startInitial.setHours(0, 0, 0, 0);
    const endInitial = new Date();

    if (activeTab === 'Alerts') {
      fetchData(startInitial, endInitial);
    } else if(activeTab === 'Olympus'){
        if ( category === 'Olympus') {
          fetchOlympusData(startInitial, endInitial);
        } else {
          fetchNonOlympusData(startInitial, endInitial);
        }
    }

    // Then reset the `refresh` state
    setRefresh(false);
  }
}, [refresh]); // This effect runs whenever `refresh` changes






// const DataFetchFromCSV = useCallback(async () => {
//   try {
//     const response = await fetch('/AlertsData.csv'); // Update the path
//     if (!response.ok) {
//       throw new Error('Failed to fetch CSV file');
//     }
//     const csv = await response.text(); // Extract CSV content
//     const parsedData = Papa.parse(csv, { header: true }).data; // Parse CSV using Papaparse
//     setAlertData(parsedData);
//     setResponders(['olympus_middleware_sre', 'Data_Commons_DevOps_Team', 'Metis_Dev_Team', 'Commons_DevOps', 'olympus_dbre_team', 'Prod_Ops']);
//   } catch (error) {
//     console.error('Error fetching CSV data:', error);
//   }
// }, []);

// useEffect(() => {
//   // Initial API call on component mount
//   DataFetchFromCSV();
// }, [DataFetchFromCSV]);





  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Main handleRefresh={onRefresh} onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange} end={end} trendData={trendData} priorityTrendData={priorityTrendData}
            start={start} loading={loading} alertData={alertData} responders={responders} selectedResponder={selectedResponder} onResponderChange={handleResponderChange} handleSearch={handleSearch} category={category} onCategoryChange={handleCategoryChange} olympusData={olympusData} nonOlympusData={nonOlympusData} handleTabChange={handleTabChange} activeTab={activeTab} alertsLoading={alertsLoading} handleDashboardData={handleDashboardData} dashboardData={dashboardData} showClassifyButton={showClassifyButton} handleClassifyClick={handleClassifyClick} alertModelData={alertModelData} olympusModelData={olympusModelData} nonOlympusModelData={nonOlympusModelData} showClassifyButtonForOly={showClassifyButtonForOly} handleClassifyOlyClick={handleClassifyOlyClick}  countLoading={countLoading} countLoadingOly={countLoadingOly} showClassifyButtonForNonOly={showClassifyButtonForNonOly} countLoadingNonOly={countLoadingNonOly} handleClassifyNonOlyClick={handleClassifyNonOlyClick}/>}
          />
          {/* <Route
            path="/"
            element={<Home/>}
          /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
