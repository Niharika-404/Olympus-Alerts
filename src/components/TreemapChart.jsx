

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



// import React from 'react';
// import Chart from 'react-apexcharts';

// const TreemapChart = ({ data, selectedZone, filteredAlerts }) => {
//   // Function to group data by namespace
//   // const groupDataByNamespace = () => {
//   //   const namespaces = Array.from(new Set(filteredAlerts.map(alert => data.find(row => row.Zone === selectedZone && row['Alert Name'] === alert)?.Namespace || '')));

//   //   return namespaces.map((namespace, index) => {
//   //     const alertsForNamespace = filteredAlerts.filter(alert => data.find(row => row.Zone === selectedZone && row['Alert Name'] === alert)?.Namespace === namespace);

//   //     return {
//   //       name: namespace,
//   //       data: alertsForNamespace.map(alert => ({
//   //         x: alert,
//   //         y: data.find(row => row.Zone === selectedZone && row['Alert Name'] === alert)?.Count || 0,
//   //       })),
//   //     };
//   //   });
//   // };
//   const groupDataByNamespace = () => {
//     const namespaces = Array.from(new Set(data.map(row => row.Namespace).filter(namespace => namespace !== '')));
  
//     return namespaces.map((namespace, index) => {
//       const alertsForNamespace = filteredAlerts.map(alert => {
//         const alertData = data.filter(row => row.Namespace === namespace && row['Alert Name'] === alert);
//         const count = alertData && alertData.length > 0 ? alertData.reduce((acc, curr) => acc + curr.Count, 0) : 0;
//         return {
//           name: alert,
//           count: count,
//         };
//       });
  
//       return {
//         name: namespace,
//         data: alertsForNamespace,
//       };
//     });
//   };
  
  

//   // Function to get a color based on index or namespace
//   const getNamespaceColor = (index) => {
//     const colors = [
//       '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
//       '#FFA500', '#FFC0CB', '#008080', '#800080', '#FF4500',
//       '#32CD32', '#8A2BE2', '#FF6347', '#00FFFF', '#FF1493',
//       '#DC143C', '#696969', '#2E8B57', '#F08080', '#4682B4',
//       '#FFD700', '#4B0082', '#00CED1', '#8B4513', '#20B2AA',
//       '#7B68EE', '#87CEEB', '#FF69B4'
//     ];
//         return colors[index % colors.length];
//   };

//   const namespacesData = groupDataByNamespace();
//   console.log(namespacesData);

//   // Function to handle CSV download
//   const handleCSVDownload = () => {
//     // Prepare CSV content
//     const csvContent = prepareCSVContent(namespacesData, filteredAlerts, data, selectedZone);

//     // Trigger download
//     downloadCSV(csvContent, `${selectedZone}.csv`);
//   };

//   // Function to prepare CSV content
//   const prepareCSVContent = (namespacesData, filteredAlerts, data, selectedZone) => {
//     // Prepare the CSV header with all namespaces
//     const namespaces = Array.from(new Set(filteredAlerts.map(alert => data.find(row => row.Zone === selectedZone && row['Alert Name'] === alert)?.Namespace || '')));
//     let csvHeader = 'category,' + namespaces.join(',') + '\n';

//     // Generate CSV rows for each alert
//     let csvContent = '';
//     filteredAlerts.forEach(alert => {
//       // Initialize the row with the alert name
//       let row = `${alert},`;

//       // Fill in the counts for each namespace
//       namespaces.forEach(namespace => {
//         const count = data.find(row => row.Zone === selectedZone && row['Alert Name'] === alert && row.Namespace === namespace)?.Count || '';
//         row += `${count},`;
//       });

//       // Add the row to the CSV content
//       csvContent += `${row}\n`;
//     });

//     // Combine header and content to form the final CSV
//     return csvHeader + csvContent;
//   };

//   // Function to trigger CSV download
//   const downloadCSV = (content, filename) => {
//     const blob = new Blob([content], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);

//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', filename);
//     document.body.appendChild(link);

//     link.click();

//     // Cleanup
//     window.URL.revokeObjectURL(url);
//     document.body.removeChild(link);
//   };

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
//       toolbar: {
//         show: true, // Hide default toolbar
//         offsetX: 0,
//         offsetY: 0,
//         tools: {
//           download: false, // Hide default download button
//         },
//         autoSelected: 'zoom',
//       },
    
//     },
//     title: {
//       text: `${selectedZone}`, // Set the chart title
//       align: 'center',
//     },
//   };

//   return (
//     <div>
//       <div className="chart-container">
//         <Chart options={treemapChartOptions} series={treemapChartOptions.series} type="treemap" height={600} />
//         <button onClick={handleCSVDownload}>Download CSV</button>
//       </div>
//     </div>
//   );
// };

// export default TreemapChart;




// -----------------------------------------------------------------------------------------------------------


// import React from 'react';
// import Chart from 'react-apexcharts';

// const TreemapChart = ({ data, selectedZone, filteredAlerts }) => {
//   // const groupDataByNamespace = () => {
//   //   const namespaces = Array.from(new Set(data.map(row => row.Namespace).filter(namespace => namespace !== '')));

//   //   return namespaces.map(namespace => {
//   //     const alertsForNamespace = filteredAlerts.map(alert => {
//   //       const alertData = data.find(row => row.Namespace === namespace && row['Alert Name'] === alert);
//   //       const count = alertData ? alertData.Count : 0;
//   //       return {
//   //         x: alert,
//   //         y: count,
//   //       };
//   //     });

//   //     return {
//   //       name: namespace,
//   //       data: alertsForNamespace,
//   //     };
//   //   });
//   // };

//   // const groupDataByNamespace = () => {
//   //   const namespaces = Array.from(new Set(data
//   //     .filter(row => row.Zone === selectedZone)
//   //     .map(row => row.Namespace)
//   //     .filter(namespace => namespace !== '')));
    
//   //   return namespaces.map(namespace => {
//   //     const alertsForNamespace = filteredAlerts.map(alert => {
//   //       const alertData = data.filter(row => row.Namespace === namespace && row['Alert Name'] === alert && row.Zone === selectedZone);
//   //       const counts = alertData.map(row => row.Count); // Get counts for each row
//   //       return {
//   //         x: alert,
//   //         y: counts, // Use counts array
//   //       };
//   //     }).filter(alert => alert.y.length > 0); // Filter out alerts with no counts
    
//   //     return {
//   //       name: namespace,
//   //       data: alertsForNamespace,
//   //     };
//   //   }).filter(namespace => namespace.data.length > 0); // Filter out namespaces with no alerts
//   // };
  
  
//   const groupDataByNamespace = () => {
//     // Filter data for the selected zone
//     const zoneData = data.filter(row => row.Zone === selectedZone);
  
//     // Get unique namespaces in the selected zone
//     const namespaces = Array.from(new Set(zoneData.map(row => row.Namespace).filter(namespace => namespace !== '')));
  
//     // Generate a color for each namespace
//     const namespaceColors = {};
//     namespaces.forEach((namespace, index) => {
//       namespaceColors[namespace] = getNamespaceColor(index);
//     });
  
//     // Group alerts by namespace
//     const groupedData = {};
//     zoneData.forEach(row => {
//       const { Namespace, Count } = row;
//       const alertName = row['Alert Name']; // Access alert name using bracket notation
//       if (!groupedData[Namespace]) {
//         groupedData[Namespace] = {};
//       }
//       if (!groupedData[Namespace][Count]) {
//         groupedData[Namespace][Count] = [];
//       }
//       // groupedData[Namespace][Count].push({ x: 'Alert Name: ' + alertName, y: Count });
//       groupedData[Namespace][Count].push({ x: alertName, y: Count });

//     });
  
//     // Prepare data for each namespace
//     return namespaces.map(namespace => ({
//       name: namespace,
//       data: Object.values(groupedData[namespace]).flat(),
//       color: namespaceColors[namespace], // Assign color for each namespace
//     }));
//   };
  
  

//   const getNamespaceColor = (index) => {
//     const colors = [
//       '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
//       '#FFA500', '#FFC0CB', '#008080', '#800080', '#FF4500',
//       '#32CD32', '#8A2BE2', '#FF6347', '#00FFFF', '#FF1493',
//       '#DC143C', '#696969', '#2E8B57', '#F08080', '#4682B4',
//       '#FFD700', '#4B0082', '#00CED1', '#8B4513', '#20B2AA',
//       '#7B68EE', '#87CEEB', '#FF69B4'
//     ];
//     return colors[index % colors.length];
//   };

//   const namespacesData = groupDataByNamespace();
//   console.log(namespacesData);

//   const treemapChartOptions = {
//     series: namespacesData,
//     colors: namespacesData.map((namespace, index) => getNamespaceColor(index)),
//     legend: {
//       show: true,
//       position: 'bottom',
//     },
//     chart: {
//       height: 350,
//       type: 'treemap',
//       toolbar: {
//         show: true,
//         offsetX: 0,
//         offsetY: 0,
//         tools: {
//           download: false,
//         },
//         autoSelected: 'zoom',
//       }
//     },
//     title: {
//       text: `${selectedZone}`,
//       align: 'center',
//     },
//   };


//   const handleCSVDownload = () => {
//     const csvContent = generateCSVContent();

//     // Create a blob with the CSV data
//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);

//     // Create a temporary <a> element to trigger the download
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'treemap_data.csv';
//     document.body.appendChild(a);
//     a.click();

//     // Cleanup
//     window.URL.revokeObjectURL(url);
//     document.body.removeChild(a);
//   };

//   const generateCSVContent = () => {
//     let csvContent = 'namespace,alertname,count\n'; // Header row

//     namespacesData.forEach(({ name, data }) => {
//       data.forEach(({ x: alertName, y: count }) => {
//         csvContent += `${name},${alertName},${count}\n`;
//       });
//     });

//     return csvContent;
//   };
//   return (
//     <div>
//       <div className="chart-container">
//         <Chart options={treemapChartOptions} series={treemapChartOptions.series} type="treemap" height={700} width={1000} />
//         <button onClick={handleCSVDownload}>Download CSV</button>

//       </div>
//     </div>
//   );
// };

// export default TreemapChart;



// -------------------------------------------------------------------------------------------------------------------

import React from 'react';
import Chart from 'react-apexcharts';

const TreemapChart = ({ data, selectedZone, filteredAlerts }) => {
  const groupDataByCluster = () => {
    // Filter data for the selected zone
    const zoneData = data.filter(row => row.Zone === selectedZone);
  
    // Get unique namespaces in the selected zone
    const clusters = Array.from(new Set(zoneData.map(row => row.Cluster).filter(cluster => cluster !== '')));
  
    // Generate a color for each namespace
    const clusterColors = {};
    clusters.forEach((cluster, index) => {
      clusterColors[cluster] = getClusterColor(index);
    });
  
    // Group alerts by namespace and then by alert name
    const groupedData = {};
    zoneData.forEach(row => {
      const { Cluster } = row;
      const alertName = row['AlertName']; // Access alert name using bracket notation
      if (!groupedData[Cluster]) {
        groupedData[Cluster] = {};
      }
      if (!groupedData[Cluster][alertName]) {
        groupedData[Cluster][alertName] = 0;
      }
      groupedData[Cluster][alertName]++;
    });
  
    // Prepare data for each namespace
    return clusters.map(cluster => ({
      name: cluster,
      data: Object.entries(groupedData[cluster]).map(([alertName, count]) => ({ x: alertName, y: count })),
      color: clusterColors[cluster], // Assign color for each namespace
    }));
  };
  
  const getClusterColor = (index) => {
    const colors = [
      '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
      '#FFA500', '#FFC0CB', '#008080', '#800080', '#FF4500',
      '#32CD32', '#8A2BE2', '#FF6347', '#00FFFF', '#FF1493',
      '#DC143C', '#696969', '#2E8B57', '#F08080', '#4682B4',
      '#FFD700', '#4B0082', '#00CED1', '#8B4513', '#20B2AA',
      '#7B68EE', '#87CEEB', '#FF69B4'
    ];
    return colors[index % colors.length];
  };

  const clustersData = groupDataByCluster();

  const treemapChartOptions = {
    series: clustersData,
    colors: clustersData.map((cluster, index) => getClusterColor(index)),
    legend: {
      show: true,
      position: 'bottom',
    },
    chart: {
      height: 350,
      type: 'treemap',
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: false,
        },
        autoSelected: 'zoom',
      }
    },
    title: {
      text: `${selectedZone}`,
      align: 'center',
    },
  };

  const handleCSVDownload = () => {
    const csvContent = generateCSVContent();

    // Create a blob with the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary <a> element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'treemap_data.csv';
    document.body.appendChild(a);
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const generateCSVContent = () => {
    let csvContent = 'cluster,alertname,count\n'; // Header row

    clustersData.forEach(({ name, data }) => {
      data.forEach(({ x: alertName, y: count }) => {
        csvContent += `${name},${alertName},${count}\n`;
      });
    });

    return csvContent;
  };

  return (
    <div>
      {/* <div className="chart-container">
        <Chart options={treemapChartOptions} series={treemapChartOptions.series} type="treemap" height={700} width={1000} />
        <button onClick={handleCSVDownload}>Download CSV</button>
      </div> */}

        {clustersData.length > 0 ? (
        <div className="chart-container">
          <Chart options={treemapChartOptions} series={treemapChartOptions.series} type="treemap" height={700} width={1200}  />
          <button onClick={handleCSVDownload}>Download CSV</button>
        </div>
      ) : (
        <p>No alerts found.</p>
      )}
    </div>
  );
};

export default TreemapChart;
