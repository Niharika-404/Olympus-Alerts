


// // import React, { useState } from 'react';
// // import SideContainer from './SideContainer';
// // import AlertsTable from './AlertsTable';
// // import Title from './Title';
// // import NavMenu from './NavMenu';
// // import NewDashboard from './NewDashboard';

// // const Main = ({ onDateChange, selectedDate, loading, alertData, handleRefresh }) => {
// //   const [selectedStatus, setSelectedStatus] = useState('');
// //   const [activeNavItem, setActiveNavItem] = useState('Alerts');

// //   const handleNavItemClick = (item) => {
// //     setActiveNavItem(item);
// //   };

// //   return (
// //     <div>
// //               <Title onDateChange={onDateChange} selectedDate={selectedDate} />

// //       <div id='mainContainer'>
// //         <NavMenu  onNavItemClick={handleNavItemClick} />


// //         {activeNavItem === 'Alerts' && (
// //           <AlertsTable
            
// //             selectedDate={selectedDate}
// //             loading={loading}
// //             alertData={alertData}
// //             selectedStatus={selectedStatus}
// //             setSelectedStatus={setSelectedStatus}
// //           />
// //         )}
// //         {activeNavItem === 'Dashboard' && (
// //           <NewDashboard alertData={alertData}/>
// //         )}

// //         <SideContainer
// //          onDateChange={onDateChange}
// //           selectedDate={selectedDate}
// //           loading={loading}
// //           alertData={alertData}
// //           selectedStatus={selectedStatus}
// //           setSelectedStatus={setSelectedStatus}
// //           handleRefresh={handleRefresh}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Main;




// import React, { useState } from 'react';
// import SideContainer from './SideContainer';
// import AlertsTable from './AlertsTable';
// import Title from './Title';
// import NavMenu from './NavMenu';
// import NewDashboard from './NewDashboard';

// const Main = ({ onDateChange, selectedDate, loading, alertData, handleRefresh }) => {
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [activeNavItem, setActiveNavItem] = useState('Alerts');
//   const [isNavMenuOpen, setIsNavMenuOpen] = useState(true);

//   const handleNavItemClick = (item) => {
//     setActiveNavItem(item);
//   };

//   const handleNavMenuToggle = (isOpen) => {
//     setIsNavMenuOpen(isOpen);
//   };

//   return (
//     <div>
//       <Title onDateChange={onDateChange} selectedDate={selectedDate} />
//       <div id='mainContainer'>
//         <NavMenu onNavItemClick={handleNavItemClick} onToggle={handleNavMenuToggle} />
//           {activeNavItem === 'Alerts' && (
//             <AlertsTable
//               selectedDate={selectedDate}
//               loading={loading}
//               alertData={alertData}
//               selectedStatus={selectedStatus}
//               setSelectedStatus={setSelectedStatus}
//               isNavMenuOpen={isNavMenuOpen}
//             />
//           )}
//           {activeNavItem === 'Dashboard' && (
//             <NewDashboard alertData={alertData}
//             isNavMenuOpen={isNavMenuOpen}
//             />
//           )}
//         <SideContainer
//           onDateChange={onDateChange}
//           selectedDate={selectedDate}
//           loading={loading}
//           alertData={alertData}
//           selectedStatus={selectedStatus}
//           setSelectedStatus={setSelectedStatus}
//           handleRefresh={handleRefresh}
//         />
//       </div>
//     </div>
//   );
// };

// export default Main;




// ----------------------------------------------------------------------------------------

// import React, { useState } from 'react';
// import SideContainer from './SideContainer';
// import AlertsTable from './AlertsTable';
// import Title from './Title';
// import NavMenu from './NavMenu';
// import NewDashboard from './NewDashboard';

// const Main = ({  loading, alertData, handleRefresh, onStartDateChange, onEndDateChange, start, end, responders, onResponderChange, selectedResponder }) => {
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [activeNavItem, setActiveNavItem] = useState('Alerts');
//   const [isNavMenuOpen, setIsNavMenuOpen] = useState(true);

//   const handleNavItemClick = (item) => {
//     setActiveNavItem(item);
//   };

//   const handleNavMenuToggle = (isOpen) => {
//     setIsNavMenuOpen(isOpen);
//   };

//   return (
//     <div>
//       <Title  />
//       <div id='mainContainer' className={activeNavItem === 'Alerts'? 'alertActive': 'dashboardActive'}>
//         <NavMenu  onNavItemClick={handleNavItemClick} onToggle={handleNavMenuToggle}/>
//         {activeNavItem === 'Alerts' && (
//           <div id={isNavMenuOpen? 'alerttable-count' : 'alerttable-count-expand'}>
//             <AlertsTable
//               loading={loading}
//               alertData={alertData}
//               selectedStatus={selectedStatus}
//               setSelectedStatus={setSelectedStatus}
//               isNavMenuOpen={isNavMenuOpen}
//               responders={responders}
//               selectedResponder={selectedResponder}
//               onResponderChange={onResponderChange}
//             />
//             <SideContainer
           
//               onStartDateChange={onStartDateChange}
//               onEndDateChange={onEndDateChange}
//               start={start}
//               end={end}
//               loading={loading}
//               alertData={alertData}
//               selectedStatus={selectedStatus}
//               setSelectedStatus={setSelectedStatus}
//               handleRefresh={handleRefresh}
//               isNavMenuOpen={isNavMenuOpen}
//             />
//           </div>
//         )}
//         {activeNavItem === 'Dashboard' && (
//           <NewDashboard
//             alertData={alertData}
//             isNavMenuOpen={isNavMenuOpen}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Main;




// ----------------------------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import SideContainer from './SideContainer';
import AlertsTable from './AlertsTable';
import Title from './Title';
import NewDashboard from './NewDashboard';
import OlympusNonOlympus from './OlympusNonOlympus';

const Main = ({ loading, alertData, handleRefresh, onStartDateChange, onEndDateChange, start, end, responders, onResponderChange, selectedResponder, handleSearch, category,  onCategoryChange, olympusData, nonOlympusData, trendData }) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [activeTab, setActiveTab] = useState('Alerts');
  // const [isNavMenuOpen, setIsNavMenuOpen] = useState(true);


  // const [selectedPriority, setSelectedPriority] = useState('');
  // const [selZone, setSelZone] = useState('');
  // const [status, setStatus] = useState('')





  // useEffect(() => {
  //   console.log('Active tab now:', activeTab);
  // }, [activeTab]);
  
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // const handleNavMenuToggle = (isOpen) => {
  //   setIsNavMenuOpen(isOpen);
  // };

  // const handleSelectedPriority = (priority)=>{
  //   setSelectedPriority(priority)
  // }

  // const handleZone = (zone)=>{
  //   setSelZone(zone)
  // }

  // const handleStatus = (status)=>{
  //   setStatus(status)
  // }
  // useEffect(() => {
  //   console.log('Updated status:', status);
  //   console.log('Updated selected zone:', selZone);
  //   console.log('Updated selected priority:', selectedPriority);
  //   console.log('Active tab now:', activeTab);
  // }, [status, selZone, selectedPriority, activeTab]);
  
  // const handleChartSelection = (priority, zone, status, tab) => {
  //   handleSelectedPriority(priority);
  //   handleZone(zone);
  //   handleStatus(status);
  //   handleTabClick(tab);
  // };
  
 

  return (
    <div>
      <Title alertData={alertData} selectedResponder={selectedResponder} activeTab={activeTab} />
      <div className="tabs">
          <div className={activeTab === 'Alerts' ? 'active' : ''} onClick={() => handleTabClick('Alerts')}>Alerts</div>
          <div 
    className={activeTab === 'Dashboard' ? 'active' : ''} 
    style={{
        borderLeft: '1px solid gray',
        borderRight: '1px solid gray'
    }} 
    onClick={() => { handleTabClick('Dashboard')}}
>
    Dashboard
</div>

          <div className={activeTab === 'Olympus' ? 'active' : ''} onClick={() => handleTabClick('Olympus')}>Olympus/Non-Olympus</div>

        </div>
      <div id='mainContainer'>
      
        {activeTab === 'Alerts' && (
          <div id='alerttable-count'>
            <AlertsTable
              loading={loading}
              alertData={alertData}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            
              responders={responders}
              selectedResponder={selectedResponder}
              onResponderChange={onResponderChange}

              category={category}
              onCategoryChange={onCategoryChange}

              // selZone={selZone}
              // selectedPriority={selectedPriority}
              // Dashboardstatus={status}
            />
            <SideContainer
              onStartDateChange={onStartDateChange}
              onEndDateChange={onEndDateChange}
              start={start}
              end={end}
              loading={loading}
              alertData={alertData}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              handleRefresh={handleRefresh}
              handleSearch={handleSearch}
              selectedResponder={selectedResponder}
              activeTab={activeTab}
              olympusData={olympusData}
              nonOlympusData={nonOlympusData}
              category={category}
              trendData={trendData}
            
            />
          </div>
        )}
        {activeTab === 'Dashboard' && (
          <NewDashboard
            alertData={alertData}
            // onChartSelection={handleChartSelection} // New prop
          

           
          />
        )}
          {activeTab === 'Olympus' && (
          <div id='alerttable-count'>
            <OlympusNonOlympus
              loading={loading}
              olympusData={olympusData}
              nonOlympusData={nonOlympusData}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            
              responders={responders}
              selectedResponder={selectedResponder}
              onResponderChange={onResponderChange}

              category={category}
              onCategoryChange={onCategoryChange}

              // selZone={selZone}
              // selectedPriority={selectedPriority}
              // Dashboardstatus={status}
            />
            <SideContainer
              onStartDateChange={onStartDateChange}
              onEndDateChange={onEndDateChange}
              start={start}
              end={end}
              loading={loading}
              alertData={alertData}
              olympusData={olympusData}
              nonOlympusData={nonOlympusData}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              handleRefresh={handleRefresh}
              handleSearch={handleSearch}
              activeTab={activeTab}
              category={category}
              trendData={trendData}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
