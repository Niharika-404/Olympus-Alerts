

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
    },
    title: {
      text: `${selectedZone}`,
      align: 'center',
    },

      
      
      
  };

  treemapChartOptions.legend = {
    show: true,
    position: 'bottom',
    markers: {
      fillColors: namespacesData.map((namespace, index) => getNamespaceColor(index)),
    },
    offsetY: 10,
    itemMargin: {
      vertical: 5,
    },
  };
  
  
  return (
    <Chart options={treemapChartOptions} series={treemapChartOptions.series} type="treemap" height={600} />
  );
};

export default TreemapChart;
