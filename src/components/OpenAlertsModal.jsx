// import React from 'react';

// const OpenAlertsModal = ({ openAlerts, onClose }) => {
//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close-openalerts" onClick={onClose}>&times;</span>
//         <h2>Open Alerts</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Alert Name</th>
//               <th>Zone</th>
//               <th>Priority</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {openAlerts.map((alert, index) => (
//               <tr key={index}>
//                 <td>{alert.AlertName}</td>
//                 <td>{alert.Zone}</td>
//                 <td>{alert.Priority}</td>
//                 <td>{alert.Status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OpenAlertsModal;


import React from 'react';

const OpenAlertsModal = ({ openAlerts, onClose }) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-openalerts" onClick={onClose}>&times;</span>
        <h2>Open Alerts</h2>
        <table>
          <thead>
            <tr>
              <th>Alert Name</th>
              <th>Zone</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {openAlerts.map((alert, index) => (
              <tr key={index}>
                <td>{alert.AlertName}</td>
                <td>{alert.Zone}</td>
                <td>{alert.Priority}</td>
                <td>{alert.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpenAlertsModal;
