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

const Title = ({ alertData, selectedResponder }) => {

  // const todayDate = new Date().toISOString().split('T')[0];
  const primaryResponderEmails = new Set();
  const secondaryResponderEmails = new Set();
  
  alertData.forEach(alert => {
    if (alert?.PrimaryResponderEmail) {
      primaryResponderEmails.add(alert.PrimaryResponderEmail);
    }
    if (alert?.SecondaryResponderEmail) {
      secondaryResponderEmails.add(alert.SecondaryResponderEmail);
    }
  });
  
  // console.log("Unique Primary Responder Emails:", Array.from(primaryResponderEmails));
  // console.log("Unique Secondary Responder Emails:", Array.from(secondaryResponderEmails));
  

  return (
    <div id='title-container'>
      <div className='title-date'>
        <h2>Olympus Alerts Dashboard</h2>
       <div className='responder-oncall'>
          <strong>{selectedResponder}</strong>
         

       </div>
      </div>
    </div>
  );
};

export default Title;


{/* <div>
<small style={{fontSize: '0.7rem'}}>Primary Oncall:</small>
<p style={{marginTop:'0', fontSize: '0.9rem'}}>dineshkumar@zeta.tech</p>
</div>
<div>
<small style={{fontSize: '0.7rem'}}>Secondary Oncall:</small>
<p style={{marginTop:'0', fontSize:'0.9rem'}}>lovek@zeta.tech</p>
</div> */}