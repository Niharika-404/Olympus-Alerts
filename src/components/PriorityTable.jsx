import React, { useState } from 'react';
import Chart from 'react-apexcharts'; // Install this library using: npm install react-apexcharts apexcharts
// import { trendData } from './trendData.js';

const PriorityTable = ({ priorityCounts, trendData, activeTab }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [clickedBtn, setClickedBtn] = useState('');

  const togglePopup = (btn) => {
    setClickedBtn(btn); // Set the clickedBtn state to the value of the clicked button
    setPopupOpen(!isPopupOpen);
  };
  
  console.log(trendData);

  const priorityChartOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: priorityCounts.map((priorityCount) => priorityCount.priority),
    },
    colors: ['#CF3305', '#056D0A', '#051189'], // Add your custom colors here
  };

  const priorityChartSeries = [
    {
      name: 'Opened',
      data: priorityCounts.map((priorityCount) => priorityCount.opened),
    },
    {
      name: 'Closed',
      data: priorityCounts.map((priorityCount) => priorityCount.closed),
    },
    {
      name: 'Acknowledged',
      data: priorityCounts.map((priorityCount) => priorityCount.acknowledged),
    },
  ];


  const lineData = [];
  const columnData = [];
  trendData.forEach(data => {
    const date = new Date(data.date);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      columnData.push({
        x: data.date,
        y: data.count
      });
    } 
     lineData.push({
        x: data.date,
        y: data.count
      });
    }
  );

  // ApexCharts options
  const trendOptions = {
    chart: {
      type: 'line',
      stacked: false,
      height: 400,
    },
    stroke: {
      width: [2, 2],
    },
    title: {
      text: 'Trend Data',
      align: 'left',
      style: {
        fontSize: '16px',
        color: '#666'
      },
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      title: {
        text: 'Count'
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  // ApexCharts series
  const trendSeries = [
    {
      name: 'Weekends',
      type: 'column',
      data: columnData
    },
    {
      name: 'Weekdays',
      type: 'line',
      data: lineData,
      showInLegend: false 
    }
  ];

  return (
    <>
      <table id='priority-wise-count'>
        <thead>
          <tr>
            <th>Priority</th>
            <th>Total Opened</th>
            <th>Total Closed</th>
            <th>Total Acknowledged</th>

          </tr>
        </thead>
        <tbody>
          {priorityCounts.map((priorityCount, index) => (
            <tr key={index}>
              <td>{priorityCount.priority}</td>
              <td>{priorityCount.opened}</td>
              <td>{priorityCount.closed}</td>
              <td>{priorityCount.acknowledged}</td>

            </tr>
          ))}
        </tbody>
      </table>

      {
        activeTab==='Alerts' ?(
          <div style={{display: 'flex', flexDirection: 'row'}}>
          <button className='Analyze-btn' onClick={() => togglePopup('Priority Chart')}>
          Priority Chart
        </button>
        <button className='Analyze-btn' onClick={() => togglePopup('View Trend')}>
          View Trend
        </button>
        <button className='Analyze-btn' onClick={() => togglePopup('Priority Trend')}>
          Priority Trend
        </button>
  
        </div>
        ):(
          <div style={{display: 'flex', flexDirection: 'row'}}>
          <button className='Analyze-btn' onClick={() => togglePopup('Priority Chart')}>
          Priority Chart
        </button>
  
        </div>
        )
      }



      {isPopupOpen && (
  <div className="popup-container">
    <div className="popup">
      <span className="close" onClick={togglePopup}>
        &times;
      </span>
      {clickedBtn && (
        clickedBtn === 'Priority Chart' ? (
          <Chart options={priorityChartOptions} series={priorityChartSeries} type="bar" height={400} width={700} />
        ) : clickedBtn === 'View Trend' ? (
          <Chart options={trendOptions} series={trendSeries} type="line" height={400} width={700} />
        ) : (
          <Chart options={priorityChartOptions} series={priorityChartSeries} type="bar" height={400} width={700} />
        )
      )}
    </div>
  </div>
)}

    </>
  );
};

export default PriorityTable;
