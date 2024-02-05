



import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import NewDashboard from './components/NewDashboard';
import axios from 'axios';
// import Papa from 'papaparse';


function App() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());

  const [start, setStart] = useState(new Date().toISOString());
  const [end, setEnd] = useState(new Date().toISOString());

  const [selectedResponder, setSelectedResponder] = useState('');


  const [loading, setLoading] = useState(true);
  const [alertData, setAlertData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [responders, setResponders] = useState([]);

    // Split date and time from selectedDate
const selectedDateObj = new Date(selectedDate);
const selectedDateFormatted = {
  date: selectedDateObj.toISOString().split('T')[0],
  time: selectedDateObj.toTimeString().split(' ')[0]
};

// Split date and time from start
const startObj = new Date(start);
const startFormatted = {
  date: startObj.toISOString().split('T')[0],
  time: startObj.toTimeString().split(' ')[0]
};

// Split date and time from end
const endObj = new Date(end);
const endFormatted = {
  date: endObj.toISOString().split('T')[0],
  time: endObj.toTimeString().split(' ')[0]
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
        start_date: startFormatted.date,
        end_date: endFormatted.date,
        start_time: startFormatted.time,
        end_time: endFormatted.time
      }
    });
    console.log(response.data);
    const alerts=response.data;
    setAlertData(alerts)

    const responderNames = await axios.get('http://localhost:5000/responder_names');
    console.log(responderNames.responder_names);
    setResponders(responderNames.responder_names);


    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [startFormatted.date, endFormatted.date, startFormatted.time, endFormatted.time]);

  useEffect(() => {
    // Initial API call on component mount
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Subsequent API calls when refresh is true
    if (refresh) {
      fetchData();
      setRefresh(false); // Reset refresh state after handling it
    }
  }, [fetchData, refresh]);

  const handleDateChange= (date) =>{
    setSelectedDate(date);
  }

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




console.log(`Start - ${startFormatted.date}, ${startFormatted.time}; End - ${endFormatted.date}, ${endFormatted.time}; SelectedDate - ${selectedDateFormatted.date}, ${selectedDateFormatted.time}`);


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Main handleRefresh={onRefresh} onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange} end={end} selectedDate={selectedDate} onDateChange={handleDateChange}
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
