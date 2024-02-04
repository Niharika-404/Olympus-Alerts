import React, { useState } from 'react';
import Chart from 'react-apexcharts'; // Install this library using: npm install react-apexcharts apexcharts

const PriorityTable = ({ priorityCounts }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const chartOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: priorityCounts.map((priorityCount) => priorityCount.priority),
    },
    colors: ['#CF3305', '#056D0A', '#051189'], // Add your custom colors here
  };

  const chartSeries = [
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

  return (
    <>
      <table>
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
      <button className='Analyze-btn' onClick={togglePopup}>
        View Chart
      </button>

      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup">
            <span className="close" onClick={togglePopup}>
              &times;
            </span>
            <Chart options={chartOptions} series={chartSeries} type="bar" height={400} width={700} />
          </div>
        </div>
      )}
    </>
  );
};

export default PriorityTable;
