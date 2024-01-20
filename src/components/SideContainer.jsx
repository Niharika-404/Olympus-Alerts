// import React, {useState} from 'react';
// import PriorityTable from './PriorityTable';

// const SideContainer = () => {

//     const [openCount, setOpenCount] = useState(0);
//     const [closedCount, setClosedCount] = useState(0);
  
//     // Callback function to receive open and closed counts
//     const handleAlertCounts = (open, closed) => {
//       setOpenCount(open);
//       setClosedCount(closed);
//     };
//   return (
//     <div>
//         <div className='openCloseCount'>
//             <div>Open: <strong>{openCount}</strong></div>
//             <div>Close: <strong>{closedCount}</strong></div>
//         </div>
//         <PriorityTable />
//         <button id='Analyze-btn'>Analyze</button>
//     </div>
//   );
// }

// export default SideContainer;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Papa from 'papaparse';
// import PriorityTable from './PriorityTable';


// const SideContainer = () => {
//   const [openCount, setOpenCount] = useState(0);
//   const [closedCount, setClosedCount] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://docs.google.com/spreadsheets/d/17e_YlTfAXZ44mU_6GB3bwAWTPsRNYnHWAONPMh1NNhU/export?format=csv&id=17e_YlTfAXZ44mU_6GB3bwAWTPsRNYnHWAONPMh1NNhU&gid=1316218754');
//         const parsedData = Papa.parse(response.data, { header: true });
//         const tableData = parsedData.data;

//         // Calculate open and closed counts
//         const openCount = tableData.filter((row) => row.Status === 'open').length;
//         const closedCount = tableData.filter((row) => row.Status === 'closed').length;

//         // Update state with counts
//         setOpenCount(openCount);
//         setClosedCount(closedCount);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <div className='openCloseCount'>
//         <div>Open <br/><strong>{openCount}</strong></div>
//         <div>Closed <br/><strong>{closedCount}</strong></div>
//       </div>
//       <PriorityTable />

//       <button id='Analyze-btn'>Analyze</button>
//     </div>
//   );
// }

// export default SideContainer;


// import React, { useState, useEffect } from 'react';
// import { Oval } from 'react-loader-spinner';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Papa from 'papaparse';
// import PriorityTable from './PriorityTable';

// const SideContainer = ({ setSelectedStatus }) => {
//   const [totalOpened, setTotalOpened] = useState(0);
//   const [totalClosed, setTotalClosed] = useState(0);
//   const [priorityCounts, setPriorityCounts] = useState([]);
//   const [loading, setLoading] = useState(true); // State to track loading status


//   const handleStatusClick = (status) => {
//     setSelectedStatus(status);
//   };


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://docs.google.com/spreadsheets/d/17e_YlTfAXZ44mU_6GB3bwAWTPsRNYnHWAONPMh1NNhU/export?format=csv&id=17e_YlTfAXZ44mU_6GB3bwAWTPsRNYnHWAONPMh1NNhU&gid=1316218754');
//         const parsedData = Papa.parse(response.data, { header: true });
//         const tableData = parsedData.data;

//         // Calculate total opened and closed counts
//         const totalOpenedCount = tableData.filter((row) => row.Status === 'open').length;
//         const totalClosedCount = tableData.filter((row) => row.Status === 'closed').length;

//         // Calculate priority-wise counts
//         const priorities = ['P1', 'P2', 'P3', 'P4', 'P5'];
//         const priorityCounts = priorities.map((priority) => ({
//           priority,
//           opened: tableData.filter((row) => row.Priority === priority && row.Status === 'open').length,
//           closed: tableData.filter((row) => row.Priority === priority && row.Status === 'closed').length,
//         }));

//         // Update state with counts
//         setTotalOpened(totalOpenedCount);
//         setTotalClosed(totalClosedCount);
//         setPriorityCounts(priorityCounts);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//       finally {
//         setLoading(false); // Set loading to false when data is fetched
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//        {loading ? ( // Display loader when loading is true
//     <Oval type="Oval" color="#00BFFF" height={50} width={50} />
//   ) : (
//     <div>
//         <div className='button-container'>
//             <Link to='/dashboard'><button id='analyze'>Analyze</button></Link>
            
//             <button id='refresh'>Refresh</button>
//         </div>
//       <div className='openCloseCount'>
//       <div id='open-alerts' onClick={() => handleStatusClick('open')}>Open <br /><strong>{totalOpened? totalOpened: 'Loading...'}</strong></div>
//         <div id='close-alerts' onClick={() => handleStatusClick('closed')}>Closed <br /><strong>{totalClosed? totalClosed: 'Loading...'}</strong></div>
//       </div>
//       <PriorityTable  priorityCounts={priorityCounts} />
//     </div>)}
//     </>
 
//   );
// };

// export default SideContainer;

// import React, { useState, useEffect } from 'react';
// import { Oval } from 'react-loader-spinner';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Papa from 'papaparse';
// import PriorityTable from './PriorityTable';

// const SideContainer = ({ setSelectedStatus }) => {
//   const [totalOpened, setTotalOpened] = useState(0);
//   const [totalClosed, setTotalClosed] = useState(0);
//   const [priorityCounts, setPriorityCounts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const handleStatusClick = (status) => {
//         setSelectedStatus(status);
//       };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://docs.google.com/spreadsheets/d/17e_YlTfAXZ44mU_6GB3bwAWTPsRNYnHWAONPMh1NNhU/export?format=csv&id=17e_YlTfAXZ44mU_6GB3bwAWTPsRNYnHWAONPMh1NNhU&gid=1316218754');
//       const parsedData = Papa.parse(response.data, { header: true });
//       const tableData = parsedData.data;

//       const totalOpenedCount = tableData.filter((row) => row.Status === 'open').length;
//       const totalClosedCount = tableData.filter((row) => row.Status === 'closed').length;

//       const priorities = ['P1', 'P2', 'P3', 'P4', 'P5'];
//       const priorityCounts = priorities.map((priority) => ({
//         priority,
//         opened: tableData.filter((row) => row.Priority === priority && row.Status === 'open').length,
//         closed: tableData.filter((row) => row.Priority === priority && row.Status === 'closed').length,
//       }));

//       setTotalOpened(totalOpenedCount);
//       setTotalClosed(totalClosedCount);
//       setPriorityCounts(priorityCounts);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = () => {
//     setLoading(true);
//     fetchData();
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <Oval type="Oval" color="#00BFFF" height={50} width={50} />
//       ) : (
//         <div>
//           <div className='button-container'>
//             <Link to='/dashboard'><button id='analyze'>Analyze</button></Link>
//             <button id='refresh' onClick={handleRefresh}>Refresh</button>
//           </div>
//           <div className='openCloseCount'>
//             <div id='open-alerts' onClick={() => handleStatusClick('open')}>Open <br /><strong>{totalOpened}</strong></div>
//             <div id='close-alerts' onClick={() => handleStatusClick('closed')}>Closed <br /><strong>{totalClosed}</strong></div>
//           </div>
//           <PriorityTable priorityCounts={priorityCounts} />
//         </div>
//       )}
//     </>
//   );
// };

// export default SideContainer;

// import React, { useState, useEffect } from 'react';
// import { Oval } from 'react-loader-spinner';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Papa from 'papaparse';
// import PriorityTable from './PriorityTable';

// const SideContainer = ({ setSelectedStatus }) => {
//   const [totalOpened, setTotalOpened] = useState(0);
//   const [totalClosed, setTotalClosed] = useState(0);
//   const [priorityCounts, setPriorityCounts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [lastRefreshTime, setLastRefreshTime] = useState(new Date());


//   const handleStatusClick = (status) => {
//     setSelectedStatus(status);
//   };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://docs.google.com/spreadsheets/d/17e_YlTfAXZ44mU_6GB3bwAWTPsRNYnHWAONPMh1NNhU/export?format=csv&id=17e_YlTfAXZ44mU_6GB3bwAWTPsRNYnHWAONPMh1NNhU&gid=1316218754');
//       const parsedData = Papa.parse(response.data, { header: true });
//       const tableData = parsedData.data;

//       const totalOpenedCount = tableData.filter((row) => row.Status === 'open').length;
//       const totalClosedCount = tableData.filter((row) => row.Status === 'closed').length;

//       const priorities = ['P1', 'P2', 'P3', 'P4', 'P5'];
//       const priorityCounts = priorities.map((priority) => ({
//         priority,
//         opened: tableData.filter((row) => row.Priority === priority && row.Status === 'open').length,
//         closed: tableData.filter((row) => row.Priority === priority && row.Status === 'closed').length,
//       }));

//       setTotalOpened(totalOpenedCount);
//       setTotalClosed(totalClosedCount);
//       setPriorityCounts(priorityCounts);
//       setLastRefreshTime(new Date()); // Update last refresh time
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRefresh = () => {
//     setLoading(true);
//     fetchData().then(() => {
      
//     setLastRefreshTime(new Date());
//     setLoading(false);
       
      
//     });
//   };
  
  

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <Oval type="Oval" color="#00BFFF" height={50} width={50} />
//       ) : (
//         <div>
//           <div className='button-container'>
//             <Link to='/dashboard'><button id='analyze'>Analyze</button></Link>
//             <button id='refresh' onClick={handleRefresh}>Refresh</button>
            
           
           
           
//           </div>
//           {lastRefreshTime && (
//               <small id='refresh-status'>Last refreshed {formatTimeDifference(new Date(), lastRefreshTime)} ago</small>
//             )}
//           <div className='openCloseCount'>
//             <div id='open-alerts' onClick={() => handleStatusClick('open')}>Open <br /><strong>{totalOpened}</strong></div>
//             <div id='close-alerts' onClick={() => handleStatusClick('closed')}>Closed <br /><strong>{totalClosed}</strong></div>
//           </div>
//           <PriorityTable priorityCounts={priorityCounts} />
//         </div>
//       )}
//     </>
//   );
// };

// const formatTimeDifference = (currentDate, lastRefreshTime) => {
//   const diffInSeconds = Math.floor((currentDate - lastRefreshTime) / 1000);
//   if (diffInSeconds < 60) {
//     return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''}`;
//   }
//   const diffInMinutes = Math.floor(diffInSeconds / 60);
//   return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''}`;
// };

// export default SideContainer;

// import React, { useState, useEffect } from 'react';
// import { Oval } from 'react-loader-spinner';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Papa from 'papaparse';
// import PriorityTable from './PriorityTable';

// const SideContainer = ({ setSelectedStatus }) => {
//   const [totalOpened, setTotalOpened] = useState(0);
//   const [totalClosed, setTotalClosed] = useState(0);
//   const [priorityCounts, setPriorityCounts] = useState([]);
//   const [loading, setLoading] = useState(true);



//   const handleStatusClick = (status) => {
//     setSelectedStatus(status);
//   };

//   useEffect(() => {

//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://docs.google.com/spreadsheets/d/17e_YlTfAXZ44mU_6GB3bwAWTPsRNYnHWAONPMh1NNhU/export?format=csv&id=17e_YlTfAXZ44mU_6GB3bwAWTPsRNYnHWAONPMh1NNhU&gid=1316218754');
//         const parsedData = Papa.parse(response.data, { header: true });
//         const tableData = parsedData.data;

//         const totalOpenedCount = tableData.filter((row) => row.Status === 'open').length;
//         const totalClosedCount = tableData.filter((row) => row.Status === 'closed').length;

//         const priorities = ['P1', 'P2', 'P3', 'P4', 'P5'];
//         const priorityCounts = priorities.map((priority) => ({
//           priority,
//           opened: tableData.filter((row) => row.Priority === priority && row.Status === 'open').length,
//           closed: tableData.filter((row) => row.Priority === priority && row.Status === 'closed').length,
//         }));

//         setTotalOpened(totalOpenedCount);
//         setTotalClosed(totalClosedCount);
//         setPriorityCounts(priorityCounts);
//         // setLastRefreshTime(new Date());
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();

//       // Set up interval to fetch data every 2 minutes (120,000 milliseconds)
//   const intervalId = setInterval(fetchData, 120000);

//   // Clean up the interval when the component unmounts
//   return () => clearInterval(intervalId);

  
//   }, );

//   return (
//     <>
//       {loading ? (
//         <Oval type="Oval" color="#00BFFF" height={50} width={50} />
//       ) : (
//         <div>
//           <div className="button-container">
//             <Link to="/dashboard">
//               <button id="analyze">Analyze</button>
//             </Link>

//             <button id="refresh" >Refresh</button>
           
//           </div>
//           <div>
//           {/* {lastRefreshTime && (
//               <small id="refresh-status">Last refreshed{} ago</small>
//             )} */}
//           </div>
//           <div className="openCloseCount">
//             <div id="open-alerts" onClick={() => handleStatusClick('open')}>
//               Open <br />
//               <strong>{totalOpened ? totalOpened : 'Loading...'}</strong>
//             </div>
//             <div id="close-alerts" onClick={() => handleStatusClick('closed')}>
//               Closed <br />
//               <strong>{totalClosed ? totalClosed : 'Loading...'}</strong>
//             </div>
//           </div>
//           <PriorityTable priorityCounts={priorityCounts} />
//         </div>
//       )}
//     </>
//   );
// };

// export default SideContainer;


import React, { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Papa from 'papaparse';
import PriorityTable from './PriorityTable';

const SideContainer = ({ setSelectedStatus }) => {
    const [totalOpened, setTotalOpened] = useState(0);
    const [totalClosed, setTotalClosed] = useState(0);
    const [priorityCounts, setPriorityCounts] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [lastRefreshTime, setLastRefreshTime] = useState(null);
    // const [refreshStatus, setRefreshStatus] = useState('');
  
    const handleStatusClick = (status) => {
      setSelectedStatus(status);
    };
  
    // const calculateTimeDifference = (lastRefreshTime) => {
    //   const now = new Date();
    //   const difference = now - lastRefreshTime;
    //   const minutes = Math.floor(difference / (1000 * 60));
    //   if (minutes === 0) {
    //     return 'less than a minute ago';
    //   } else if (minutes === 1) {
    //     return 'one minute ago';
    //   } else {
    //     return `${minutes} minutes ago`;
    //   }
    // };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://docs.google.com/spreadsheets/d/17e_YlTfAXZ44mU_6GB3bwAWTPsRNYnHWAONPMh1NNhU/export?format=csv&id=17e_YlTfAXZ44mU_6GB3bwAWTPsRNYnHWAONPMh1NNhU&gid=1316218754');
          const parsedData = Papa.parse(response.data, { header: true });
          const tableData = parsedData.data;
  
          const totalOpenedCount = tableData.filter((row) => row.Status === 'open').length;
          const totalClosedCount = tableData.filter((row) => row.Status === 'closed').length;
  
          const priorities = ['P1', 'P2', 'P3', 'P4', 'P5'];
          const priorityCounts = priorities.map((priority) => ({
            priority,
            opened: tableData.filter((row) => row.Priority === priority && row.Status === 'open').length,
            closed: tableData.filter((row) => row.Priority === priority && row.Status === 'closed').length,
          }));
  
          setTotalOpened(totalOpenedCount);
          setTotalClosed(totalClosedCount);
          setPriorityCounts(priorityCounts);

            // Set lastRefreshTime here
        // const now = new Date();
        // setLastRefreshTime(now);

        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
  
    //   const fetchDataIntervalId = setInterval(() => {
    //     fetchData();
    //     console.log('refresh call')
    //   }, 2000);
  
    //   // Set up interval to update refresh status every 500 milliseconds
    //   const refreshStatusIntervalId = setInterval(() => {
    //     if (lastRefreshTime) {
    //       setRefreshStatus(calculateTimeDifference(lastRefreshTime));
    //     }
    //   }, 500);
  
    //   // Clean up the intervals when the component unmounts
    //   return () => {
    //     clearInterval(fetchDataIntervalId);
    //     clearInterval(refreshStatusIntervalId);
    //   };
    }, []);
  
    return (
      <>
        {loading ? (
          <Oval type="Oval" color="#00BFFF" height={50} width={50} />
        ) : (
          <div>
            <div className="button-container">
              <Link to="/dashboard">
                <button id="analyze">Analyze</button>
              </Link>
              <button id="refresh">Refresh</button>
            </div>
            <div>
              {/* {lastRefreshTime && (
                <small id="refresh-status">Last refreshed {refreshStatus}</small>
              )} */}
            </div>
            <div className="openCloseCount">
              <div id="open-alerts" onClick={() => handleStatusClick('open')}>
                Open <br />
                <strong>{totalOpened ? totalOpened : 'Loading...'}</strong>
              </div>
              <div id="close-alerts" onClick={() => handleStatusClick('closed')}>
                Closed <br />
                <strong>{totalClosed ? totalClosed : 'Loading...'}</strong>
              </div>
            </div>
            <PriorityTable priorityCounts={priorityCounts} />
          </div>
        )}
      </>
    );
  };
  
  export default SideContainer;
