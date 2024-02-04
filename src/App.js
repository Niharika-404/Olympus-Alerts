



import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import NewDashboard from './components/NewDashboard';
import axios from 'axios';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [alertData, setAlertData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
    
      const response = await axios.get('http://127.0.0.1:5000/alerts')
       
       
      

      const alerts = response.data.data;
      setAlertData(alerts);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onRefresh = () => {
    setRefresh(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Main handleRefresh={onRefresh} onDateChange={handleDateChange} selectedDate={selectedDate} loading={loading} alertData={alertData} />}
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
