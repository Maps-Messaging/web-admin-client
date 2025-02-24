/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2025 ] [Maps Messaging B.V.]
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

interface DualNumberGraphProps {
  name1: string;
  data1: number[];
  name2: string;
  data2: number[];
}

const DualNumberGraph: React.FC<DualNumberGraphProps> = ({ name1, data1, name2, data2 }) => {
  const formatYAxis = (value: number):string => {
    return formatNumberWithPowerUnit(value);
  };

  const options: ApexOptions = {
    chart: {
      type: 'line',
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
      text: `${name1} and ${name2}`,
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },
    xaxis: {
      categories: Array.from(Array(Math.max(data1.length, data2.length)).keys()).map(key => key.toString()),
      tickAmount: 10, // Specify the number of ticks on the X axis
    },
    yaxis: {
      labels: {
        formatter: formatYAxis, // Use the imported function for formatting Y axis labels
      }
    }
  };

  const series = [
    {
      name: name1,
      data: data1
    },
    {
      name: name2,
      data: data2
    }
  ];

  return (
    <div className="chart-container" style={{width: '100%', height: '100%'}}>
      <Chart options={options} series={series} type="line"/>
    </div>
  );
};

export default DualNumberGraph;
