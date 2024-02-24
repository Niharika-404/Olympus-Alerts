import React from 'react';
import Papa from 'papaparse';


const Report = ({alertData,olympusData, nonOlympusData, startTemp, endTemp, activeTab, selectedResponder}) => {

const zones = ['hbl-aws-aps1-zeta-1-uat-eks', 'aws-ow-mumbai', 'hbl-aws-aps1-zeta-1-prod-eks', 'aws-common-prod-mumbai', 'aws-sodexo-prod-london', 'zeta-aws-use2-cprod-eks-01'];

  

      const alertCounts = {
        P1: {
          total: alertData.filter((alert) => alert.Priority === 'P1').length,
          closed: alertData.filter((alert) => alert.Priority === 'P1' && alert.Status === 'closed' && alert['TimeToClose']<=10).length,
          acked: alertData.filter((alert) => alert.Priority === 'P1' && alert.Status === 'acknowledged' && alert['TimeToAck']<=10).length,
        },
        P2: {
          total: alertData.filter((alert) => alert.Priority === 'P2').length,
          closed: alertData.filter((alert) => alert.Priority === 'P2' && alert.Status === 'closed' && alert['TimeToClose']<=20).length,
          acked: alertData.filter((alert) => alert.Priority === 'P2' && alert.Status === 'acknowledged' && alert['TimeToAck']<=20).length,
        },
        P3: {
          total: alertData.filter((alert) => alert.Priority === 'P3').length,
          closed: alertData.filter((alert) => alert.Priority === 'P3' && alert.Status === 'closed' && alert['TimeToClose']<=60).length,
          acked: alertData.filter((alert) => alert.Priority === 'P3' && alert.Status === 'acknowledged' && alert['TimeToAck']<=60).length,
        },
    };

  
    
    
    // Enhance alertCounts with percentages and SLO achieved
    Object.keys(alertCounts).forEach(priority => {
        const data = alertCounts[priority];
        const total = data.total;
        data.closedPercentage = total > 0 ? parseFloat(((data.closed / total) * 100).toFixed(2)) : 0;
        data.ackedPercentage = total > 0 ? parseFloat(((data.acked / total) * 100).toFixed(2)) : 0;
        // Here we sum closedPercentage and ackedPercentage to get sloAchieved
        data.sloAchieved = parseFloat((data.closedPercentage + data.ackedPercentage).toFixed(2));
        data.sloBreached = parseFloat((100 - data.sloAchieved).toFixed(2));
      });
    
    
      

      const OlympusAlertCounts = {
        P1: {
          total: olympusData.filter((alert) => alert.Priority === 'P1').length,
          closed: olympusData.filter((alert) => alert.Priority === 'P1' && alert.Status === 'closed' && alert['TimeToClose']<=10).length,
          acked: olympusData.filter((alert) => alert.Priority === 'P1' && alert.Status === 'acknowledged' && alert['TimeToAck']<=10).length,
        },
        P2: {
          total: olympusData.filter((alert) => alert.Priority === 'P2').length,
          closed: olympusData.filter((alert) => alert.Priority === 'P2' && alert.Status === 'closed' && alert['TimeToClose']<=20).length,
          acked: olympusData.filter((alert) => alert.Priority === 'P2' && alert.Status === 'acknowledged' && alert['TimeToAck']<=20).length,
        },
        P3: {
          total: olympusData.filter((alert) => alert.Priority === 'P3').length,
          closed: olympusData.filter((alert) => alert.Priority === 'P3' && alert.Status === 'closed' && alert['TimeToClose']<=60).length,
          acked: olympusData.filter((alert) => alert.Priority === 'P3' && alert.Status === 'acknowledged' && alert['TimeToAck']<=60).length,
        },
    };

  
    
    
    // Enhance alertCounts with percentages and SLO achieved
    Object.keys(OlympusAlertCounts).forEach(priority => {
        const data = OlympusAlertCounts[priority];
        const total = data.total;
        data.closedPercentage = total > 0 ? parseFloat(((data.closed / total) * 100).toFixed(2)) : 0;
        data.ackedPercentage = total > 0 ? parseFloat(((data.acked / total) * 100).toFixed(2)) : 0;
        // Here we sum closedPercentage and ackedPercentage to get sloAchieved
        data.sloAchieved = parseFloat((data.closedPercentage + data.ackedPercentage).toFixed(2));
        data.sloBreached = parseFloat((100 - data.sloAchieved).toFixed(2));
      });
    


      const nonOlympusAlertCounts = {
        P1: {
          total: nonOlympusData.filter((alert) => alert.Priority === 'P1').length,
          closed: nonOlympusData.filter((alert) => alert.Priority === 'P1' && alert.Status === 'closed' && alert['TimeToClose']<=10).length,
          acked: nonOlympusData.filter((alert) => alert.Priority === 'P1' && alert.Status === 'acknowledged' && alert['TimeToAck']<=10).length,
        },
        P2: {
          total: nonOlympusData.filter((alert) => alert.Priority === 'P2').length,
          closed: nonOlympusData.filter((alert) => alert.Priority === 'P2' && alert.Status === 'closed' && alert['TimeToClose']<=20).length,
          acked: nonOlympusData.filter((alert) => alert.Priority === 'P2' && alert.Status === 'acknowledged' && alert['TimeToAck']<=20).length,
        },
        P3: {
          total: nonOlympusData.filter((alert) => alert.Priority === 'P3').length,
          closed: nonOlympusData.filter((alert) => alert.Priority === 'P3' && alert.Status === 'closed' && alert['TimeToClose']<=60).length,
          acked: nonOlympusData.filter((alert) => alert.Priority === 'P3' && alert.Status === 'acknowledged' && alert['TimeToAck']<=60).length,
        },
    };

  
    
    
    // Enhance alertCounts with percentages and SLO achieved
    Object.keys(nonOlympusAlertCounts).forEach(priority => {
        const data = nonOlympusAlertCounts[priority];
        const total = data.total;
        data.closedPercentage = total > 0 ? parseFloat(((data.closed / total) * 100).toFixed(2)) : 0;
        data.ackedPercentage = total > 0 ? parseFloat(((data.acked / total) * 100).toFixed(2)) : 0;
        // Here we sum closedPercentage and ackedPercentage to get sloAchieved
        data.sloAchieved = parseFloat((data.closedPercentage + data.ackedPercentage).toFixed(2));
        data.sloBreached = parseFloat((100 - data.sloAchieved).toFixed(2));
      });
    

      let startDate = startTemp.substring(0,10);
      let endDate = endTemp.substring(0,10);

const data = [
    {
      severity: 'P1',
      slo: '10 min',
      subRows: [
        { category: 'NonOlympus', 
        total: nonOlympusAlertCounts.P1.total,
        closed: `${nonOlympusAlertCounts.P1.closedPercentage}%`, // Updated
        acked: `${nonOlympusAlertCounts.P1.ackedPercentage}%`, // Updated
        sloAchieved: `${nonOlympusAlertCounts.P1.sloAchieved}%`, // Updated
        sloBreached: `${nonOlympusAlertCounts.P1.sloBreached}%`,  
      },

        {
          category: 'Olympus',
          total: OlympusAlertCounts.P1.total,
          closed: `${OlympusAlertCounts.P1.closedPercentage}%`, // Updated
          acked: `${OlympusAlertCounts.P1.ackedPercentage}%`, // Updated
          sloAchieved: `${OlympusAlertCounts.P1.sloAchieved}%`, // Updated
          sloBreached: `${OlympusAlertCounts.P1.sloBreached}%`,
        },
        // ...other sub-rows if they exist
      ],
    },
    {
      severity: 'P2',
      slo: '20 min',
      subRows: [
        { category: 'NonOlympus', 
        total: nonOlympusAlertCounts.P2.total,
        closed: `${nonOlympusAlertCounts.P2.closedPercentage}%`, // Updated
        acked: `${nonOlympusAlertCounts.P2.ackedPercentage}%`, // Updated
        sloAchieved: `${nonOlympusAlertCounts.P2.sloAchieved}%`, // Updated
        sloBreached: `${nonOlympusAlertCounts.P2.sloBreached}%`,  
      },
              {
          category: 'Olympus',
          total: OlympusAlertCounts.P2.total,
          closed: `${OlympusAlertCounts.P2.closedPercentage}%`, // Updated
          acked: `${OlympusAlertCounts.P2.ackedPercentage}%`, // Updated
          sloAchieved: `${OlympusAlertCounts.P2.sloAchieved}%`, // Updated
          sloBreached: `${OlympusAlertCounts.P2.sloBreached}%`,
        },
        // ...sub-row data
      ],
    },
    {
      severity: 'P3',
      slo: '60 min',
      subRows: [
        { category: 'NonOlympus', 
        total: nonOlympusAlertCounts.P3.total,
        closed: `${nonOlympusAlertCounts.P3.closedPercentage}%`, // Updated
        acked: `${nonOlympusAlertCounts.P3.ackedPercentage}%`, // Updated
        sloAchieved: `${nonOlympusAlertCounts.P3.sloAchieved}%`, // Updated
        sloBreached: `${nonOlympusAlertCounts.P3.sloBreached}%`,  
      },
              {
          category: 'Olympus',
          total: OlympusAlertCounts.P3.total,
          closed: `${OlympusAlertCounts.P3.closedPercentage}%`, // Updated
          acked: `${OlympusAlertCounts.P3.ackedPercentage}%`, // Updated
          sloAchieved: `${OlympusAlertCounts.P3.sloAchieved}%`, // Updated
          sloBreached: `${OlympusAlertCounts.P3.sloBreached}%`,
        },
        // ...sub-row data
      ],
    },
    // ... more data rows if they exist
  ];

  const alertsReport = [
    {
      severity: 'P1',
      slo: '10 min',
      responder: selectedResponder, 
      total: alertCounts.P1.total, 
      closed: `${alertCounts.P1.closedPercentage}%`, // Updated
      acked: `${alertCounts.P1.ackedPercentage}%`, // Updated
      sloAchieved: `${alertCounts.P1.sloAchieved}%`, // Updated
      sloBreached: `${alertCounts.P1.sloBreached}%` ,
    },
    {
      severity: 'P2',
      slo: '20 min',
      responder: selectedResponder, 
      total: alertCounts.P2.total, 
      closed: `${alertCounts.P2.closedPercentage}%`, // Updated
      acked: `${alertCounts.P2.ackedPercentage}%`, // Updated
      sloAchieved: `${alertCounts.P2.sloAchieved}%`, // Updated
      sloBreached: `${alertCounts.P2.sloBreached}%` ,
    
    },
    {
      severity: 'P3',
      slo: '60 min',
      responder: selectedResponder, 
      total: alertCounts.P3.total, 
      closed: `${alertCounts.P3.closedPercentage}%`, // Updated
      acked: `${alertCounts.P3.ackedPercentage}%`, // Updated
      sloAchieved: `${alertCounts.P3.sloAchieved}%`, // Updated
      sloBreached: `${alertCounts.P3.sloBreached}%`,
    },
  ]

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
{activeTab && (
 activeTab==='Olympus' ? (
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
 ) : activeTab === 'Alerts' ? (
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
      {/* Table rows */}
      {alertsReport.map((item, index) => (
      <React.Fragment key={index}>
        <tr>
          <td>{item.severity}</td>
          <td>{item.slo}</td>
          <td>{item.responder}</td>
            <td>{item.total}</td>
            <td>{item.closed}</td>
            <td>{item.acked}</td>
            <td>{item.sloAchieved}</td>
            <td>{item.sloBreached}</td>
        </tr>
       
      </React.Fragment>
    ))}
    </tbody>
  </table>
) : (
  <></>
)
)}




    </div>
  );
}

export default Report;
