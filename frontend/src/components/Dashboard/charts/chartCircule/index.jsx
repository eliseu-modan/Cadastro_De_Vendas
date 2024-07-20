import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const ChartFour = () => {
  const chartRef = useRef(null);
  var options = {
    series: [0, 0, 0, 0],
    chart: {
    height: 490,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      offsetY: -20,
      startAngle: 0,
      endAngle: 280,
      hollow: {
        margin: 11,
        size: '10%',
        background: 'transparent',
        image: undefined,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          show: false,
        }
      },
      barLabels: {
        // style:{
        //     left:'-20px'
        // },
        enabled: true,
        // useSeriesColors: true,
        offsetX: 80,
        offsetY:30,
        fontSize: '10px',
        formatter: function(seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
        },
      },
    }
  },
  colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
  labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
  responsive: [{
    breakpoint: 80,
    options: {
      legend: {
          show: false
      }
    }
  }]
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

export default ChartFour;
