

// import React from 'react';
// import Chart from 'react-apexcharts';

// const TreemapChart = ({ data, selectedZone, filteredAlerts }) => {
//   // Function to group data by namespace
//   const groupDataByNamespace = () => {
//     const namespaces = Array.from(new Set(filteredAlerts.map(alert => data.find(row => row.Zone === selectedZone && row['Alert Name'] === alert)?.Namespace || '')));

//     return namespaces.map((namespace, index) => {
//       const alertsForNamespace = filteredAlerts.filter(alert => data.find(row => row.Zone === selectedZone && row['Alert Name'] === alert)?.Namespace === namespace);

//       return {
//         name: namespace,
//         data: alertsForNamespace.map(alert => ({
//           x: alert,
//           y: data.find(row => row.Zone === selectedZone && row['Alert Name'] === alert)?.Count || 0,
//         })),
//       };
//     });
//   };

//   // Function to get a color based on index or namespace
//   const getNamespaceColor = (index) => {
//     const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF']; // Add more colors as needed
//     return colors[index % colors.length];
//   };

//   const namespacesData = groupDataByNamespace();

//   // Treemap Chart options
//   const treemapChartOptions = {
//     series: namespacesData,
//     colors: namespacesData.map((namespace, index) => getNamespaceColor(index)),
//     legend: {
//       show: true,
//       position: 'bottom',
//       markers: {
//         fillColors: namespacesData.map((namespace, index) => getNamespaceColor(index)),
//       },
//       offsetY: 10,
//       itemMargin: {
//         vertical: 5,
//       },
//       onItemClick: {
//         toggleDataSeries: false,
//       },
//     },
//     chart: {
//       height: 350,
//       type: 'treemap',
//     },
//     title: {
//       text: `${selectedZone}`,
//       align: 'center',
//     },

      
      
      
//   };

//   treemapChartOptions.legend = {
//     show: true,
//     position: 'bottom',
//     markers: {
//       fillColors: namespacesData.map((namespace, index) => getNamespaceColor(index)),
//     },
//     offsetY: 10,
//     itemMargin: {
//       vertical: 5,
//     },
//   };
  
  
//   return (
//     <Chart options={treemapChartOptions} series={treemapChartOptions.series} type="treemap" height={600} />
//   );
// };

// export default TreemapChart;



import React from 'react';
import Chart from 'react-apexcharts';

const TreemapChart = ({ data, selectedZone, filteredAlerts }) => {
  // Function to group data by namespace
  const groupDataByNamespace = () => {
    const namespaces = Array.from(new Set(filteredAlerts.map(alert => data.find(row => row.Zone === selectedZone && row['Alert Name'] === alert)?.Namespace || '')));

    return namespaces.map((namespace, index) => {
      const alertsForNamespace = filteredAlerts.filter(alert => data.find(row => row.Zone === selectedZone && row['Alert Name'] === alert)?.Namespace === namespace);

      return {
        name: namespace,
        data: alertsForNamespace.map(alert => ({
          x: alert,
          y: data.find(row => row.Zone === selectedZone && row['Alert Name'] === alert)?.Count || 0,
        })),
      };
    });
  };

  // Function to get a color based on index or namespace
  const getNamespaceColor = (index) => {
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF']; // Add more colors as needed
    return colors[index % colors.length];
  };

  const namespacesData = groupDataByNamespace();

  // Function to handle CSV download
  const handleCSVDownload = () => {
    // Prepare CSV content
    const csvContent = prepareCSVContent(namespacesData, filteredAlerts, data, selectedZone);

    // Trigger download
    downloadCSV(csvContent, `${selectedZone}.csv`);
  };

  // Function to prepare CSV content
  const prepareCSVContent = (namespacesData, filteredAlerts, data, selectedZone) => {
    // Prepare the CSV header with all namespaces
    const namespaces = Array.from(new Set(filteredAlerts.map(alert => data.find(row => row.Zone === selectedZone && row['Alert Name'] === alert)?.Namespace || '')));
    let csvHeader = 'category,' + namespaces.join(',') + '\n';

    // Generate CSV rows for each alert
    let csvContent = '';
    filteredAlerts.forEach(alert => {
      // Initialize the row with the alert name
      let row = `${alert},`;

      // Fill in the counts for each namespace
      namespaces.forEach(namespace => {
        const count = data.find(row => row.Zone === selectedZone && row['Alert Name'] === alert && row.Namespace === namespace)?.Count || '';
        row += `${count},`;
      });

      // Add the row to the CSV content
      csvContent += `${row}\n`;
    });

    // Combine header and content to form the final CSV
    return csvHeader + csvContent;
  };

  // Function to trigger CSV download
  const downloadCSV = (content, filename) => {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);

    link.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  // Treemap Chart options
  const treemapChartOptions = {
    series: namespacesData,
    colors: namespacesData.map((namespace, index) => getNamespaceColor(index)),
    legend: {
      show: true,
      position: 'bottom',
      markers: {
        fillColors: namespacesData.map((namespace, index) => getNamespaceColor(index)),
      },
      offsetY: 10,
      itemMargin: {
        vertical: 5,
      },
      onItemClick: {
        toggleDataSeries: false,
      },
    },
    chart: {
      height: 350,
      type: 'treemap',
      toolbar: {
        show: true, // Hide default toolbar
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: false, // Hide default download button
        },
        autoSelected: 'zoom',
      },
    
    },
    title: {
      text: `${selectedZone}`, // Set the chart title
      align: 'center',
    },
  };

  return (
    <div>
      <div className="chart-container">
        <Chart options={treemapChartOptions} series={treemapChartOptions.series} type="treemap" height={600} />
        <button onClick={handleCSVDownload}>Download CSV</button>
      </div>
    </div>
  );
};

export default TreemapChart;
