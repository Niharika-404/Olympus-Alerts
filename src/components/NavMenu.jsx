import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';

const NavMenu = ({ onNavItemClick, onToggle }) => {
  const [activeItem, setActiveItem] = useState('Alerts');
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = (item) => {
    setActiveItem(item);
    onNavItemClick(item);
  };

  const toggleMenu = () => {
    onToggle(!isOpen);

    setIsOpen(!isOpen);
  };

  return (
    <>
      <div id='nav' className = {isOpen? 'nav' : 'nav-close'}  >
      <FontAwesomeIcon icon={isOpen ? faLessThan : faGreaterThan} onClick={toggleMenu} 
        className={isOpen ? 'close-navmenu': 'open-navmenu'}/>
        <div id='nav-menu' className={isOpen ? 'open' : 'closed'}>
        <div id='navmenu-items' >
            <div className={activeItem === 'Alerts' ? 'active' : ''} onClick={() => handleClick('Alerts')}>
            Alerts
            </div>
            <div className={activeItem === 'Dashboard' ? 'active' : ''} onClick={() => handleClick('Dashboard')}>
            Dashboard
            </div>
        </div>
        </div>
       

      </div>
      
    </>
  );
};

export default NavMenu;



// // NavMenu.js
// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';

// const NavMenu = ({ onNavItemClick, handleNavMenuToggle }) => {
//   const [activeItem, setActiveItem] = useState('Alerts');
//   const [isOpen, setIsOpen] = useState(true);

//   const handleClick = (item) => {
//     setActiveItem(item);
//     onNavItemClick(item);
//   };

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <div id='nav' className={isOpen ? 'open' : 'closed'}>
//       <FontAwesomeIcon
//         icon={isOpen ? faLessThan : faGreaterThan}
//         onClick={() => {
//             toggleMenu();
//             handleNavMenuToggle(); // Call handleNavMenuToggle when toggling the menu
//         }}
//         className={isOpen ? 'close-navmenu' : 'open-navmenu'}
//         />

//         <div id='nav-menu' className={isOpen ? 'open' : 'closed'}>
//           <div id='navmenu-items'>
//             <div
//               className={activeItem === 'Alerts' ? 'active' : ''}
//               onClick={() => handleClick('Alerts')}
//             >
//               Alerts
//             </div>
//             <div
//               className={activeItem === 'Dashboard' ? 'active' : ''}
//               onClick={() => handleClick('Dashboard')}
//             >
//               Dashboard
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NavMenu;
