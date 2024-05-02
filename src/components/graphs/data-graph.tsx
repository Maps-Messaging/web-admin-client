import React from 'react';
import {ApexOptions} from "apexcharts";
import {Chart} from "@/components/core/chart";
import {formatNumberWithPowerUnit} from "@/helper-functions";

interface NumberGraphProps {
  name: string;
  data: number[];
}

const NumberGraph: React.FC<NumberGraphProps> = ({ name, data }) => {
  const formatYAxis = (value: number):string => {
    return formatNumberWithPowerUnit(value);
  };

  // Define the chart configuration
  const options: ApexOptions = {
    chart: {
      type: 'line', // Ensure this is a literal match to the expected type
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: name,
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // this array will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: Array.from(data.keys()).map(key => key.toString()),
      tickAmount: 10,
    },
    yaxis: {
      labels: {
        formatter: formatYAxis // Use custom function for Y axis labels
      }
    }
  };

  const series = [{
    name: name,
    data: data
  }];

  return (
    <div className="chart-container" style={{width: '100%', height: '100%'}}>
      <Chart options={options} series={series} type="line" />
    </div>
  );
};

export default NumberGraph;
