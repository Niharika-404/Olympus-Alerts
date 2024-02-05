


import React, { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight,faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import PriorityTable from './PriorityTable';

const SideContainer = ({ setSelectedStatus, loading, alertData, handleRefresh, onDateChange, selectedDate}) => {
    const [totalOpened, setTotalOpened] = useState(0);
    const [totalClosed, setTotalClosed] = useState(0);
    const [totalAck, setTotalAck] = useState(0);
    const [dateRange, setDateRange] = useState(false); // State to track if date range is selected


    const [priorityCounts, setPriorityCounts] = useState([]);


    const todayDate = new Date().toISOString().split('T')[0];

    

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
                                    defaultValue={todayDate}
                                    value={selectedDate || todayDate}
                                    onChange={(e) => onDateChange(e.target.value)}
                                    max={todayDate}
                                />
                              
                                <input
                                    id="date-input"
                                    type="datetime-local"
                                    defaultValue={todayDate}
                                    value={selectedDate || todayDate}
                                    onChange={(e) => onDateChange(e.target.value)}
                                    max={todayDate}
                                />
                               
                             
                            </>
                        ) : (
                            <input
                                id="date-input"
                                type="datetime-local"
                                defaultValue={todayDate}
                                value={selectedDate || todayDate}
                                onChange={(e) => onDateChange(e.target.value)}
                                max={todayDate}
                            />
                        )}
          </div>
           
              {/* <button id="refresh" onClick={refreshData}>Refresh</button> */}
              <FontAwesomeIcon id="date-range" icon={faCalendarAlt} onClick={toggleDateRange} />

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



        

         
           
