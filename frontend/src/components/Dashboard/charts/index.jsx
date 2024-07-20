import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const ChartOne = () => {
  const chartRef = useRef(null);

  const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'];

  const options = {
    series: [{
      data: [0, 0, 0, 0, 0,]
    }],
    chart: {
      height: 200,
      width:600,
      offsetX: -30,
      offsetY: -30,

      
      type: 'bar',
      
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '65%',
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: [
        'John', 'Doe',
        'Joe', 'Smith',
        'Jake'
      ],
      labels: {
        style: {
          colors: colors,
          fontSize: '10px'
        }
      }
    }
  };

  useEffect(() => {
    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    // Cleanup function to destroy the chart
    return () => {
      chart.destroy();
    };
  }, []); // Empty dependency array ensures this runs only once

  return <div id="chart" ref={chartRef}></div>;
};

export default ChartOne;
