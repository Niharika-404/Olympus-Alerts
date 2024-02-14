import React from 'react';
import Papa from 'papaparse';


const Report = ({alertData, startTemp, endTemp}) => {



    const alertCounts = {
        P1: {
          total: alertData.filter((alert) => alert.Priority === 'P1').length,
          closed: alertData.filter((alert) => alert.Priority === 'P1' && alert.Status === 'closed').length,
          acked: alertData.filter((alert) => alert.Priority === 'P1' && alert.Status === 'acknowledged').length,
        
        },
        P2: {
          total: alertData.filter((alert) => alert.Priority === 'P2').length,
          closed: alertData.filter((alert) => alert.Priority === 'P2' && alert.Status === 'closed').length,
          acked: alertData.filter((alert) => alert.Priority === 'P2' && alert.Status === 'acknowledged').length,
        
        },
        P3: {
          total: alertData.filter((alert) => alert.Priority === 'P3').length,
          closed: alertData.filter((alert) => alert.Priority === 'P3' && alert.Status === 'closed').length,
          acked: alertData.filter((alert) => alert.Priority === 'P3' && alert.Status === 'acknowledged').length,
       
        },
        // Add more priorities if needed
      };
      alertCounts.P1.slo = ((alertData.filter(alert => alert.Priority === 'P1' && alert.AckBy !== 'N/A' && alert.TimeToAck <= 10).length / alertData.filter(alert => alert.Priority === 'P1' && alert.AckBy !== 'N/A').length) * 100).toFixed(2);
      alertCounts.P2.slo = ((alertData.filter(alert => alert.Priority === 'P2' && alert.AckBy !== 'N/A' && alert.TimeToAck <= 20).length / alertData.filter(alert => alert.Priority === 'P2' && alert.AckBy !== 'N/A').length) * 100).toFixed(2);
      alertCounts.P3.slo = ((alertData.filter(alert => alert.Priority === 'P3' && alert.AckBy !== 'N/A' && alert.TimeToAck <= 60).length / alertData.filter(alert => alert.Priority === 'P3' && alert.AckBy !== 'N/A').length) * 100).toFixed(2);
      

      console.log('Total P1 alerts that are acknowledged by someone',alertData.filter((alert) => alert.Priority === 'P1' && alert.AckBy !== 'N/A').length);

      let startDate = startTemp.substring(0,10);
      let endDate = endTemp.substring(0,10);

const data = [
    {
      severity: 'P1',
      slo: '10 min',
      subRows: [
        { category: 'Business Clusters', total: '...', closed: '...', acked: '...', sloAchieved: '...', sloBreached: '...' },
        { category: 'Olympus', total: alertCounts.P1.total, closed: alertCounts.P1.closed, acked: alertCounts.P1.acked, sloAchieved: alertCounts.P1.slo+'%', sloBreached: '...' },
        // ...other sub-rows if they exist
      ],
    },
    {
      severity: 'P2',
      slo: '20 min',
      subRows: [
        { category: 'Business Clusters', total: '...', closed: '...', acked: '...', sloAchieved: '...', sloBreached: '...' },
        { category: 'Olympus', total: alertCounts.P2.total, closed: alertCounts.P2.closed, acked: alertCounts.P2.acked, sloAchieved: alertCounts.P2.slo+'%', sloBreached: '...' },
        // ...sub-row data
      ],
    },
    {
      severity: 'P3',
      slo: '60 min',
      subRows: [
        { category: 'Business Clusters', total: '...', closed: '...', acked: '...', sloAchieved: '...', sloBreached: '...' },
        { category: 'Olympus', total: alertCounts.P3.total, closed: alertCounts.P3.closed, acked: alertCounts.P3.acked, sloAchieved: alertCounts.P3.slo+'%', sloBreached: '...' },
        // ...sub-row data
      ],
    },
    // ... more data rows if they exist
  ];


  const downloadReportAsCSV = () => {


    const isSameDate = startDate === endDate;

    // Include start and end dates in the file name if they are different
    let fileName = isSameDate ? `Report for ${startDate}.csv` : `Report from ${startDate} to ${endDate}.csv`;

    // Initialize CSV string with headers
    let csv = 'Severity,SLO,Category,Total,Closed,Acked,SLO Achieved,SLO Breached\n';

    // Loop through data array and subRows to construct CSV rows
    data.forEach(item => {
        item.subRows.forEach(subItem => {
            csv += `${item.severity},${item.slo},${subItem.category},${subItem.total},${subItem.closed},${subItem.acked},${subItem.sloAchieved},${subItem.sloBreached}\n`;
        });
    });

    // Create Blob object
    const blob = new Blob([csv], { type: 'text/csv' });

    // Create temporary link element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    // Simulate click event on the link to trigger download
    link.click();
};

  return (
    <div>

    <div className='report-download'>
    <h1>Report Data</h1>

        <button className='reportDownload-btn' onClick={downloadReportAsCSV}>Download</button>
    </div>


<table>
      <thead>
        <tr>
          <th>Severity</th>
          <th>SLO</th>
          <th>Category</th>
          <th>Total</th>
          <th>Closed</th>
          <th>Acked</th>
          <th>SLO Achieved</th>
          <th>SLO Breached</th>
          {/* ... other headers */}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <tr>
              <td>{item.severity}</td>
              <td>{item.slo}</td>
              <td colSpan={6}></td>
            </tr>
            {item.subRows.map((subItem, subIndex) => (
              <tr key={subIndex}>
                <td></td> {/* Empty cell for indentation */}
                <td></td> {/* Empty cell for indentation */}
                <td>{subItem.category}</td>
                <td>{subItem.total}</td>
                <td>{subItem.closed}</td>
                <td>{subItem.acked}</td>
                <td>{subItem.sloAchieved}</td>
                <td>{subItem.sloBreached}</td>

              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>


    </div>
  );
}

export default Report;
