// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const Title = ({onDateChange}) => {
//   const location = useLocation();

//   // Determine whether to show date based on the route path
//   const showDate = location.pathname === '/';

//     // Get today's date in the format 'YYYY-MM-DD'
//     const todayDate = new Date().toISOString().split('T')[0];

//   return (
//     <div>
//       <h1>OLYMPUS MIDDLEWARE SRE</h1>
//       <div className='title-date'>
//         <h2>Alerts Dashboard</h2>
//         {showDate && (
       
         
//             <input type='date' max={todayDate} defaultValue={todayDate} 
//             onChange={(e) => onDateChange(e.target.value)} />
          
//         )}
//       </div>
//     </div>
//   );
// };

// export default Title;


import React from 'react';
import { useLocation } from 'react-router-dom';

const Title = ({ onDateChange }) => {
  const location = useLocation();
  // const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Determine whether to show date based on the route path
  const showDate = location.pathname === '/';

  // Get today's date in the format 'YYYY-MM-DD'
  const todayDate = new Date().toISOString().split('T')[0];

  // useEffect(() => {
  //   if (onDateChange) {
  //     onDateChange(date);
  //   }
  // }, [onDateChange, date]);

  return (
    <div>
      <h1>OLYMPUS MIDDLEWARE SRE</h1>
      <div className='title-date'>
        <h2>Alerts Dashboard</h2>
        {showDate && (
          <input
            type='date'
            max={todayDate}
            defaultValue={todayDate}
            onChange={(e) => onDateChange(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default Title;
