

// import React, { useState } from 'react';
// // import DataTable from './DataTable';
// import SideContainer from './SideContainer';
// import AlertsTable from './AlertsTable';
// import Title from './Title';

// const Main = () => {
//   const [selectedStatus, setSelectedStatus] = useState('');

//   return (
//     <div >
//       <Title/>
//       {/* <DataTable style={{ width: '70%' }} selectedStatus={selectedStatus} /> */}
//       <div id='mainContainer'>
//       <AlertsTable style={{ width: '70%' }} selectedStatus={selectedStatus}/>
//       <SideContainer
//         style={{ width: '30%' }}
//         selectedStatus={selectedStatus}
//         setSelectedStatus={setSelectedStatus}
//       />
//       </div>
     
//     </div>
//   );
// }

// export default Main;


//--------------------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import SideContainer from './SideContainer';
// import AlertsTable from './AlertsTable';
// import Title from './Title';

// const Main = () => {
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [loading, setLoading] = useState(true);
//   const [alertData, setAlertData] = useState([]);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         // Perform API call based on selectedDate
//         // Update alertData state
//         const response = await axios.post(
//           'http://127.0.0.1:5000/api/process_alerts',
//           // { date: '2024-01-13' },
//           {date: selectedDate},
//           {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );
//         const alerts = response.data.alerts;
//         setAlertData(alerts);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [selectedDate]);

//   const handleDateChange = (date) => {
//     setSelectedDate(date, () => {
//       // This callback is executed after the state has been updated
//       console.log('After setSelectedDate:', selectedDate);
//     });
//   };
  

//   return (
//     <div>
//       <Title onDateChange={handleDateChange}/>
//       <div id='mainContainer'>
//         <AlertsTable
//           style={{ width: '70%' }}
//           selectedStatus={selectedStatus}
//           selectedDate={selectedDate}
//           loading={loading}
//           alertData={alertData}
//         />
//         <SideContainer
//           style={{ width: '30%' }}
//           selectedStatus={selectedStatus}
//           setSelectedStatus={setSelectedStatus}
//           selectedDate={selectedDate}
//           loading={loading}
//           alertData={alertData}
//         />
//       </div>
//     </div>
//   );
// };

// export default Main;




// Main.jsx
import React from 'react';
import SideContainer from './SideContainer';
import AlertsTable from './AlertsTable';
import Title from './Title';

const Main = ({ onDateChange, selectedDate, loading, alertData, fetchData }) => {
  return (
    <div>
      <Title onDateChange={onDateChange} />
      <div id='mainContainer'>
        <AlertsTable
          style={{ width: '70%' }}
          selectedDate={selectedDate}
          loading={loading}
          alertData={alertData}
          fetchData={fetchData}
        />
        <SideContainer
          style={{ width: '30%' }}
          selectedDate={selectedDate}
          loading={loading}
          alertData={alertData}
          fetchData={fetchData}
        />
      </div>
    </div>
  );
};

export default Main;
