/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2024 ] [Maps Messaging B.V.]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

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
