



import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import NewDashboard from './components/NewDashboard';
import axios from 'axios';
// import Papa from 'papaparse';


function App() {

  const today = new Date();
  const startInitial = new Date(today);
  startInitial.setHours(0, 0, 0, 0);
  const endInitial = new Date(today);

  const [start, setStart] = useState(startInitial);
  const [end, setEnd] = useState(endInitial);

  const [selectedResponder, setSelectedResponder] = useState('');


  const [loading, setLoading] = useState(true);
  const [alertData, setAlertData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [responders, setResponders] = useState([]);



// Split date and time from start
// const startObj = new Date(start);
// const startFormatted = {
//   date: startObj.toLocaleString().split('T')[0],
//   time: startObj.toTimeString().split(' ')[0]
// };

// // Split date and time from end
// const endObj = new Date(end);
// const endFormatted = {
//   date: endObj.toLocaleString().split('T')[0],
//   time: endObj.toTimeString().split(' ')[0]
// };


// Split date and time from start
// const startFormatted = {
//   date: start.split('T')[0],
//   time: start.split('T')[1].split('.')[0]
// };

// // Split date and time from end
// const endFormatted = {
//   date: end.split('T')[0],
//   time: end.split('T')[1].split('.')[0]
// };

// Split date and time from start
const startObj = new Date(start);
const startFormatted = {
  date: startObj.toLocaleString().split(',')[0], // Date part
  time: startObj.toLocaleString().split(',')[1].trim() // Time part
};

// Split date and time from end
const endObj = new Date(end);
const endFormatted = {
  date: endObj.toLocaleString().split(',')[0], // Date part
  time: endObj.toLocaleString().split(',')[1].trim() // Time part
};

const formatDate = (date) => {
  const [day, month, year] = date.split('/');
  
  // Construct the formatted date string in yyyy-mm-dd format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
    
      // const response = await fetch('/AlertsData.csv'); // Update the path
      // if (!response.ok) {
      //   throw new Error('Failed to fetch CSV file');
      // }
      // const csv = await response.text(); // Extract CSV content
      // const parsedData = Papa.parse(csv, { header: true }).data; // Parse CSV using Papaparse
      // setAlertData(parsedData);

      const response = await axios.get('http://localhost:5000/alerts', {
      params: {
        responder_name: 'olympus_middleware_sre',
        start_date: formatDate(startFormatted.date),
        end_date: formatDate(endFormatted.date),
        start_time: startFormatted.time,
        end_time: endFormatted.time
      }
    });
    console.log(response.data.data);
    const alerts=response.data.data;
    setAlertData(alerts)

    


    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [startFormatted.date, endFormatted.date, startFormatted.time, endFormatted.time]);

  useEffect(() => {
    const fetchResponderNames = async () => {
      try {
        const responderNames = await axios.get('http://localhost:5000/responder_names');
        console.log(responderNames.data.responder_names);
        setResponders(responderNames.data.responder_names);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchResponderNames();
  }, []);
  

  useEffect(() => {
    // Initial API call on component mount
    fetchData();
    const interval = setInterval(() => {
      // setRefresh(true); // Set refresh flag every 5 minutes
      fetchData();
      console.log('auto refresh')
    }, 3 * 60 * 1000); // 5 minutes interval
    return () => clearInterval(interval); 
  }, [fetchData]);

  useEffect(() => {
    // Subsequent API calls when refresh is true
    if (refresh) {
      fetchData();
      setRefresh(false); // Reset refresh state after handling it
    }
  }, [fetchData, refresh]);

  

  const handleStartDateChange = (date) => {
    setStart(date);
  };
  const handleEndDateChange = (date) => {
    setEnd(date);
  };

  const handleResponderChange = (responder) => {
    setSelectedResponder(responder);
  }


  const onRefresh = () => {
    setRefresh(true);
  };





console.log(`Start - ${startFormatted.date}, ${startFormatted.time}; End - ${endFormatted.date}, ${endFormatted.time};`);
console.log(start, end);


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Main handleRefresh={onRefresh} onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange} end={end} 
            start={start} loading={loading} alertData={alertData} responders={responders} selectedResponder={selectedResponder} onResponderChange={handleResponderChange} />}
          />
          <Route
            path="/dashboard"
            element={<NewDashboard alertData={alertData} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
