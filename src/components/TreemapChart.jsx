

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
    a.download = `${selectedZone}.csv`;
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
          <Chart options={treemapChartOptions} series={treemapChartOptions.series} type="treemap" height={700}   />
          <button onClick={handleCSVDownload}>Download CSV</button>
        </div>
      ) : (
        <p>No alerts found.</p>
      )}
    </div>
  );
};

export default TreemapChart;
