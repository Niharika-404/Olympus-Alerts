// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import Dashboard from './components/Dashboard';
// import Main from './components/Main';
// import NewDashboard from './components/NewDashboard';


// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route
//             path="/"
//             element={<Main/>}
//           />
//           <Route
//             path="/dashboard"
//             // element={<Dashboard/>}
//             element={<NewDashboard/>}
//           />
         
//         </Routes>
//       </div>
//     </Router>

  
   
//   );
// }

// export default App;






// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import NewDashboard from './components/NewDashboard';
import axios from 'axios';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [alertData, setAlertData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          'http://127.0.0.1:5000/api/process_alerts',
          { date: selectedDate },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const alerts = response.data.alerts;
        setAlertData(alerts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [selectedDate]); // Include only the necessary dependencies
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Main onDateChange={handleDateChange} selectedDate={selectedDate} loading={loading} alertData={alertData} />}
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
