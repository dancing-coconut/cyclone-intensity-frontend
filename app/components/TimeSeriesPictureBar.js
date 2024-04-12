'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import { LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Line } from 'recharts';

export default function TimeSeriesPictureBar() {
  const useDate = () => {
    const locale = 'en';
    const [today, setDate] = useState(new Date());
  
    useEffect(() => {
        const timer = setInterval(() => { 
        setDate(new Date());
      }, 1000);
      return () => {
        clearInterval(timer); 
      }
    }, []);
  
    const date = today.toISOString().split('T')[0]
    const time = today.toLocaleTimeString()
  
    return {
      date,
      time,
    };
};

    const [windData, setWindData] = useState([  {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }])
    const [pressureData, setPressureData] = useState([  {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }])

    return(
        <div className="flex rounded-lg h-full w-full">
            <div className="flex flex-col rounded-lg h-full w-1/2">
              <div className="bg-white bg-opacity-10 w-full rounded-lg h-1/2 mb-6 p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={windData} 
                    margin={{
                      top: 5, right: 5, left: 5, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-white text-center rounded-lg bg-white bg-opacity-20 px-4 py-2 mb-6">
                  INTENSITY GRAPHS
              </div>
              <div className="bg-white bg-opacity-10 w-full rounded-lg h-1/2 p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={pressureData}
                    margin={{
                      top: 5, right: 5, left: 5, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>   
                </ResponsiveContainer>             
              </div>
              <div className="text-white text-center rounded-lg bg-white bg-opacity-20 px-4 py-2 mt-6">
                  INTENSITY GRAPHS
              </div>
            </div>

            <div className="flex flex-col w-1/2 mr-6">
              <div className="relative rounded-lg h-full ml-6 bg-white bg-opacity-10 w-full">
                <Image 
                  className="h-full w-full rounded-lg"
                  src="/cyclone.jpg"
                  alt="Sample Cyclone"
                  width={180}
                  height={180}
                />
                <div className='absolute text-center p-1 rounded-md w-1/2 z-10 bg-zinc-800 text-zinc-300 top-5 left-1/4 right-1/4'>ORIGINAL</div>
              </div>
            </div>
        </div>
    )
}