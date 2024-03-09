


import React, { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
// import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync,faCalendarAlt,faSearch } from '@fortawesome/free-solid-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';


import PriorityTable from './PriorityTable';
import Report from './Report';

const SideContainer = ({ setSelectedStatus, loading, alertData, handleRefresh, onDateChange, selectedDate, onStartDateChange, onEndDateChange, start, end, handleSearch, activeTab, selectedResponder, olympusData, nonOlympusData, category, trendData, priorityTrendData, setSelectedCategory, showClassifyButton, handleClassifyClick, alertModelData, olympusModelData, nonOlympusModelData, showClassifyButtonForOly, handleClassifyOlyClick, totalAnomaly, totalNormal, totalRare, countLoading, countLoadingOly}) => {
    const [totalOpened, setTotalOpened] = useState(0);
    const [totalClosed, setTotalClosed] = useState(0);
    const [totalAck, setTotalAck] = useState(0);
    // const [totalNormal, setTotalNormal] = useState(0);
    // const [totalRare, setTotalRare] = useState(0);
    // const [totalAnomaly, setTotalAnomaly] = useState(0);
    const [dateRange, setDateRange] = useState(false); // State to track if date range is selected


    const [priorityCounts, setPriorityCounts] = useState([]);


   
    // const[start, setStart] = useState('');
    // const[end, setEnd] = useState('');


    const [isPopupOpen, setPopupOpen] = useState(false);
  // console.log('SideContainer - ',activeTab);
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };
   
    const today = new Date();

 const currentDateTime = new Date().toISOString().slice(0, -8); // Remove seconds and milliseconds




 // Initialize start and end dates with today's date and time
// const todayISOString = today.toISOString();
// const todayDate = todayISOString.split('T')[0];
// const todayTime = todayISOString.split('T')[1].slice(0, 5);

// // const [startTemp, setStartTemp] = useState(start || `${todayDate}T00:00`);
// // const [endTemp, setEndTemp] = useState(end || `${todayDate}T${todayTime}`);

// const [startTemp, setStartTemp] = useState( `${todayDate}T00:00`);
// const [endTemp, setEndTemp] = useState( `${todayDate}T${todayTime}`);
    

const getISTDateAndTime = () => {
  // Current date and time in UTC
  const nowUTC = new Date();
  // Convert to IST: UTC + 5:30
  const offsetIST = 5.5 * 60; // in minutes
  const nowIST = new Date(nowUTC.getTime() + offsetIST * 60000); // Convert offset to milliseconds and add

  // Format the date part
  const datePart = nowIST.toISOString().split('T')[0];

  // Format the time part to HH:MM:SS
  const timePart = nowIST.toISOString().split('T')[1].slice(0, 8);

  return { datePart, timePart };
};

// Use the function to initialize your state
const { datePart, timePart } = getISTDateAndTime();

const [startTemp, setStartTemp] = useState(`${datePart}T00:00:00`); // Set start time to 00:00:00
const [endTemp, setEndTemp] = useState(`${datePart}T${timePart}`); // Set end time to the current time in HH:MM:SS


    const handleStatusClick = (status) => {
      setSelectedStatus(status);
    };
    const handleCategoryClick = (category) => {
      setSelectedCategory(category);
    };
  
    const refreshData = () => {
      
      const { datePart, timePart } = getISTDateAndTime();
    
      // Use functional updates to ensure the most recent state is used
      setStartTemp(`${datePart}T00:00:00`);
      setEndTemp(`${datePart}T${timePart}`);
      // console.log(startTemp,endTemp);
      handleRefresh(startTemp,endTemp);
    };
    
    const toggleDateRange = () => {
      setDateRange(!dateRange);
  };
  
    useEffect(() => {
      // console.log('Before fetchData:', { loading, alertData });

        try {
        
          const alerts= activeTab==='Alerts'? alertData : activeTab==='Olympus' && category==='Olympus'? olympusData: nonOlympusData;

          const modelData = activeTab==='Alerts'? alertModelData : activeTab==='Olympus' && category==='Olympus'? olympusModelData: nonOlympusModelData;         

          const totalOpenedCount = alerts.filter((alert)=>alert?.Status === 'open').length;
          const totalClosedCount = alerts.filter((alert)=>alert?.Status === 'closed').length;
          const totalAckCount = alerts.filter((alert)=>alert?.Status === 'acknowledged').length;


          // const totalNormalCount = modelData.filter((alert)=>alert?.Category === 'Normal').length;
          // const totalRareCount = modelData.filter((alert)=>alert?.Category === 'Rare').length;
          // const totalAnomalyCount = modelData.filter((alert)=>alert?.Category === 'Anomaly').length;

  
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
          // setTotalNormal(totalNormalCount);
          // setTotalRare(totalRareCount);
          // setTotalAnomaly(totalAnomalyCount);
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
  

    }, [ alertData, loading, category, olympusData, nonOlympusData, alertModelData, olympusModelData, nonOlympusModelData]);

  


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
    
    const dateConversion = (dateString) => {
      // Assuming dateString is in the format: Thu Feb 08 2024 00:00:00 GMT+0530 (India Standard Time)
      const date = new Date(dateString);
      return date;
    }
    

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
   
    const formatDateForInput = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };
    

  

    const onSearchClick = () => {
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
        // Check if start date is greater than end date
      if (startDate >= endDate) {
        alert('Start date must be less than end date.');
        return; // Stop further execution


      }


        // Check if active tab is Olympus and time difference is greater than 24 hours
  if (activeTab === 'Olympus' && differenceInDays > 1) {
    alert('Please select a date range within 24 hours for the Olympus tab.');
    return; // Stop further execution
  }
      // console.log(toLocaleConversion(startTemp), toLocaleConversion(endTemp));
      handleSearch(toLocaleConversion(startTemp), toLocaleConversion(endTemp));
      // Pass the temporary start and end dates to the actual start and end date states
      // onStartDateChange(toLocaleConversion(startTemp));
      // onEndDateChange(toLocaleConversion(endTemp));
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
                                    // value={startTemp} // Use temporary start date
                                    value={startTemp  }
                                    onChange={(e) => setStartTemp(e.target.value)}
                                    max={currentDateTime}
                                />
                              
                                <input
                                    id="date-input"
                                    type="datetime-local"
                                    step={1}
                                    // value={endTemp} // Use temporary start date
                                    value={endTemp }
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
                              value={startTemp || formatDateForInput(dateConversion(start))} // Use temporary start date
                              onChange={(e) => setStartTemp(e.target.value)}
                              max={currentDateTime}
                          />
                        )}
          </div>
           
              {/* <button id="refresh" onClick={refreshData}>Refresh</button> */}

                
              <FontAwesomeIcon id="date-range" icon={faCalendarAlt} onClick={toggleDateRange} title='Add Date Range'/>

              <FontAwesomeIcon id="date-search" icon={faSearch}  onClick={onSearchClick} title='Search'/>


              <FontAwesomeIcon id="refresh" icon={faSync} onClick={refreshData} title='Refresh' />


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
            {
              activeTab==='Alerts' && showClassifyButton && (
                <div>
                   
                    <button className='Analyze-btn'  style={{marginBottom:'2px'}} onClick={()=>handleClassifyClick()} >Classify Alerts</button>
                    <small style={{marginTop:'0'}}><FontAwesomeIcon icon={faInfo} className='info-symbol'/> This feature utilizes a machine learning model to categorize alerts into three distinct groups: Anomaly, Rare, and Normal.</small>
                </div>
            )}

 
            {
              activeTab==='Alerts' && !showClassifyButton && (
                <div className="normalRareCount"> 

                <div id="normal-alerts" onClick={()=> handleCategoryClick('Normal')}>
                <small className='info-icon alerts-tooltip'><FontAwesomeIcon icon={faInfo}/>
                <span className="alerts-tooltiptext">Normal alerts are labeled as such due to their frequency being typical compared to other zones and clusters.</span>
                </small>
                  Normal <br />
                  <strong>{countLoading? 'Loading...': totalNormal}</strong>
                </div>
                <div id="rare-alerts"  onClick={()=>handleCategoryClick('Rare')}>                                                
                <small className='info-icon alerts-tooltip'><FontAwesomeIcon icon={faInfo} />
                <span className="alerts-tooltiptext">Rare alerts denote occurrences that are infrequent within a given zone and cluster.</span>
                </small>

                  Rare <br />
                  <strong>{countLoading? 'Loading...': totalRare}</strong>
                </div>
                <div id="anomaly-alerts" onClick={()=>handleCategoryClick('Anomaly')}>            
                <small className='info-icon alerts-tooltip'><FontAwesomeIcon icon={faInfo}/>
                <span className="alerts-tooltiptext">Anomaly alerts, encompassing false positives, outliers, and noise, are classified based on their anomalous nature.</span>
                </small>

                  Anomaly <br />
                  <strong>{countLoading? 'Loading...': totalAnomaly}</strong>
                </div>
              </div>
              )
            } 
  
  {
              activeTab==='Olympus' && showClassifyButtonForOly && (
                <div>
                   
                    <button className='Analyze-btn' style={{marginBottom:'2px'}} onClick={()=>handleClassifyOlyClick()} >Classify Alerts</button>
                    <small style={{marginTop:'0'}}><FontAwesomeIcon icon={faInfo} className='info-symbol'/> This feature utilizes a machine learning model to categorize alerts into three distinct groups: Anomaly, Rare, and Normal.</small>
                </div>
            )}

 
            {
              activeTab==='Olympus' && !showClassifyButtonForOly && (
                <div className="normalRareCount">

                <div id="normal-alerts" onClick={()=> handleCategoryClick('Normal')}>
                <small className='info-icon alerts-tooltip'><FontAwesomeIcon icon={faInfo}  />
                <span className="alerts-tooltiptext">Normal alerts are labeled as such due to their frequency being typical compared to other zones and clusters.</span>
                </small>
           
                  Normal <br />
                  <strong>{countLoadingOly? 'Loading...': totalNormal}</strong>
                </div>
                <div id="rare-alerts"  onClick={()=>handleCategoryClick('Rare')}>                                                
                <small className='info-icon alerts-tooltip'><FontAwesomeIcon icon={faInfo}  />
                <span className="alerts-tooltiptext">Rare alerts denote occurrences that are infrequent within a given zone and cluster.</span>
                </small>

                  Rare <br />
                  <strong>{countLoadingOly? 'Loading...': totalRare}</strong>
                </div>
                <div id="anomaly-alerts" onClick={()=>handleCategoryClick('Anomaly')}>            
                <small className='info-icon alerts-tooltip'><FontAwesomeIcon icon={faInfo} />
                <span className="alerts-tooltiptext">Anomaly alerts, encompassing false positives, outliers, and noise, are classified based on their anomalous nature.</span>
                </small>

                  Anomaly <br />
                  <strong>{countLoadingOly? 'Loading...': totalAnomaly}</strong>
                </div>
              </div>
              )
            } 
  
            
          
            <PriorityTable priorityCounts={priorityCounts} trendData={trendData} priorityTrendData={priorityTrendData} activeTab={activeTab}/>
            <button className='Analyze-btn' onClick={togglePopup}>
              View Report
            </button>
            {isPopupOpen && (
        <div className="popup-container">
          <div className="popup">
            <span className="close" onClick={togglePopup}>
              &times;
            </span>
           
            <Report alertData={alertData} olympusData={olympusData} nonOlympusData={nonOlympusData} startTemp={startTemp} endTemp={endTemp} activeTab={activeTab} selectedResponder={selectedResponder} category={category}/>
          </div>
        </div>
      )}
          </div>
        )}
      </>
    );
  };
  
  export default SideContainer;



        

         
           
