


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

import React, { useState } from 'react';
import SideContainer from './SideContainer';
import AlertsTable from './AlertsTable';
import Title from './Title';
import NavMenu from './NavMenu';
import NewDashboard from './NewDashboard';

const Main = ({ onDateChange, selectedDate, loading, alertData, handleRefresh }) => {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [activeNavItem, setActiveNavItem] = useState('Alerts');
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(true);

  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
  };

  const handleNavMenuToggle = (isOpen) => {
    setIsNavMenuOpen(isOpen);
  };

  return (
    <div>
      <Title onDateChange={onDateChange} selectedDate={selectedDate} />
      <div id='mainContainer' className={activeNavItem === 'Alerts'? 'alertActive': 'dashboardActive'}>
        <NavMenu  onNavItemClick={handleNavItemClick} onToggle={handleNavMenuToggle}/>
        {activeNavItem === 'Alerts' && (
          <div id={isNavMenuOpen? 'alerttable-count' : 'alerttable-count-expand'}>
            <AlertsTable
              selectedDate={selectedDate}
              loading={loading}
              alertData={alertData}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              isNavMenuOpen={isNavMenuOpen}
            />
            <SideContainer
              onDateChange={onDateChange}
              selectedDate={selectedDate}
              loading={loading}
              alertData={alertData}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              handleRefresh={handleRefresh}
            />
          </div>
        )}
        {activeNavItem === 'Dashboard' && (
          <NewDashboard
            alertData={alertData}
            isNavMenuOpen={isNavMenuOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Main;
