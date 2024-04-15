import React from 'react';
import {ApexOptions} from "apexcharts";
import {Chart} from "@/components/core/chart";

interface NumberGraphProps {
  name: string;
  data: number[];
}

const NumberGraph: React.FC<NumberGraphProps> = ({ name, data }) => {
  // Define the chart configuration
  const options: ApexOptions = {
    chart: {
      height: 350,
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
      categories: Array.from(data.keys()).map(key => key.toString()), // Convert keys to string array if needed
    }
  };

  const series = [{
    name: name,
    data: data
  }];

  return (
    <div>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default NumberGraph;
