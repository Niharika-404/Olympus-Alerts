


import React, { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight,faCalendarAlt,faSearch } from '@fortawesome/free-solid-svg-icons';

import PriorityTable from './PriorityTable';

const SideContainer = ({ setSelectedStatus, loading, alertData, handleRefresh, onDateChange, selectedDate, onStartDateChange, onEndDateChange, start, end}) => {
    const [totalOpened, setTotalOpened] = useState(0);
    const [totalClosed, setTotalClosed] = useState(0);
    const [totalAck, setTotalAck] = useState(0);
    const [dateRange, setDateRange] = useState(false); // State to track if date range is selected


    const [priorityCounts, setPriorityCounts] = useState([]);

   
    // const[start, setStart] = useState('');
    // const[end, setEnd] = useState('');



   
    const today = new Date();

 const currentDateTime = new Date().toISOString().slice(0, -8); // Remove seconds and milliseconds




 // Initialize start and end dates with today's date and time
const todayISOString = today.toISOString();
const todayDate = todayISOString.split('T')[0];
const todayTime = todayISOString.split('T')[1].slice(0, 5);

const [startTemp, setStartTemp] = useState(start || `${todayDate}T00:00`);
const [endTemp, setEndTemp] = useState(end || `${todayDate}T${todayTime}`);


    

    const handleStatusClick = (status) => {
      setSelectedStatus(status);
    };
  
    const refreshData = () => {
      handleRefresh();
    };

    const toggleDateRange = () => {
      setDateRange(!dateRange);
  };
  
    useEffect(() => {
      // console.log('Before fetchData:', { loading, alertData });

        try {
        
          const alerts= alertData;
         

          const totalOpenedCount = alerts.filter((alert)=>alert?.Status === 'open').length;
          const totalClosedCount = alerts.filter((alert)=>alert?.Status === 'closed').length;
          const totalAckCount = alerts.filter((alert)=>alert?.Status === 'acknowledged').length;


  
          const priorities = ['P1', 'P2', 'P3', 'P4', 'P5'];
          const priorityCounts = priorities.map((priority) => ({
            priority,
         
             opened: alerts.filter((alert)=> alert?.Priority === priority && alert?.Status === 'open').length,
            closed: alerts.filter((alert)=> alert?.Priority === priority && alert?.Status === 'closed').length,
            acknowledged: alerts.filter((alert)=> alert?.Priority === priority && alert?.Status === 'acknowledged').length,

          }));
  
          setTotalOpened(totalOpenedCount);
          setTotalClosed(totalClosedCount);
          setTotalAck(totalAckCount);
          setPriorityCounts(priorityCounts);

          // console.log('After fetchData:', { loading,  alertData });

       

        } catch (error) {
          console.error('Error fetching data:', error);
        } 
        // finally {
          
        //   console.log('After finally:', { loading,  alertData });


        // }
      // };
  
      // fetchData();
  

    }, [ alertData, loading]);

  


    // const dateConversion = (dateString) => {
    //   dateString = String(dateString);

    //   if (typeof dateString !== 'string') {
    //     console.error('Invalid date string:', dateString);
    //     return null;
    //   }
    
    //   const [, day, month, dayOfMonth, year, time] = dateString.split(" ");
    
    //   // Check if all parts are present
    //   if (!day || !month || !dayOfMonth || !year || !time) {
    //     console.error('Invalid date string format:', dateString);
    //     return null;
    //   }
      
    //   // Convert month name to month number
    //   const monthIndex = new Date(Date.parse(`${month} 1, 2000`)).getMonth() + 1;
      
    //   // Format the date in ISO 8601 format
    //   const isoString = `${year}-${monthIndex < 10 ? '0' : ''}${monthIndex}-${dayOfMonth}T${time}`;
    
    //   return isoString;
    // }
    

    const toLocaleConversion = (isoString) => {
      const date = new Date(isoString);
      const options = {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Kolkata' // India's time zone
      };
      const dateString = new Intl.DateTimeFormat('en-US', options).format(date);
      return dateString;
    }
    

    // const [startTemp, setStartTemp] = useState(dateConversion(start) || todayDate.split('T')[0] + 'T00:00'); // Temporary state to hold start date
    // const [endTemp, setEndTemp] = useState(dateConversion(end) || todayDate); // Temporary state to hold end date
   

  

    const handleSearch = () => {
      // Calculate the difference between start and end dates
      const startDate = new Date(startTemp);
      const endDate = new Date(endTemp);
      const differenceInTime = endDate.getTime() - startDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    
      // Check if the selected date range is more than or equal to 7 days
      if (differenceInDays >= 7) {
        alert('Please select the date range within 7 days.');
        return; // Stop further execution
      }
    
      // Pass the temporary start and end dates to the actual start and end date states
      onStartDateChange(toLocaleConversion(startTemp));
      onEndDateChange(toLocaleConversion(endTemp));
    };
    
    return (
      <>
        {loading ? (
          <Oval type="Oval" color="#00BFFF" height={50} width={50} />
        ) : (
          <div id='side-container'>
            <div className="button-container">
            {/* <Link to={{ pathname: '/dashboard', state: { alertData } }}>
            <button id="analyze">Analyze</button>
          </Link> */}
          <div id='multiple-dates'>
          {dateRange ? (
                            <>
                                <input
                                    id="date-input"
                                    type="datetime-local"
                                    step={1}
                                    value={startTemp} // Use temporary start date
                                    onChange={(e) => setStartTemp(e.target.value)}
                                    max={currentDateTime}
                                />
                              
                                <input
                                    id="date-input"
                                    type="datetime-local"
                                    step={1}
                                    value={endTemp} // Use temporary start date
                                    onChange={(e) => setEndTemp(e.target.value)}
                                    max={currentDateTime}
                                />
                               
                             
                            </>
                        ) : (
                            // <input
                            //     id="date-input"
                            //     type="datetime-local"
                            //     step={1}
                            //     value={selectedDate || todayDate}
                            //     onChange={(e) => onDateChange(e.target.value)}
                            //     max={todayDate}
                            // />
                            <input
                              id="date-input"
                              type="datetime-local"
                              step={1}
                              value={startTemp} // Use temporary start date
                              onChange={(e) => setStartTemp(e.target.value)}
                              max={currentDateTime}
                          />
                        )}
          </div>
           
              {/* <button id="refresh" onClick={refreshData}>Refresh</button> */}


              <FontAwesomeIcon id="date-range" icon={faCalendarAlt} onClick={toggleDateRange} />

              <FontAwesomeIcon id="date-range" icon={faSearch}  onClick={handleSearch}/>


              <FontAwesomeIcon id="refresh" icon={faRotateRight} onClick={refreshData} />


            </div>
           
            <div className="openCloseCount">
              <div id="open-alerts" onClick={() => handleStatusClick('open')}>
                Open <br />
                <strong>{totalOpened}</strong>
              </div>
              <div id="close-alerts" onClick={() => handleStatusClick('closed')}>
                Closed <br />
                <strong>{totalClosed}</strong>
              </div>
              <div id="ack-alerts" onClick={() => handleStatusClick('acknowledged')}>
                Acknowledged <br />
                <strong>{totalAck}</strong>
              </div>
            </div>
            <PriorityTable priorityCounts={priorityCounts} />
          </div>
        )}
      </>
    );
  };
  
  export default SideContainer;



        

         
           
