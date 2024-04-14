'use client'

import Image from "next/image";
import { LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Line } from 'recharts';

export default function ArchivePictureBar({ date, time, wind, pressure }) {

    return(
        <div className="flex rounded-lg h-full w-full">
            <div className="flex flex-col rounded-lg h-full w-1/2">
              <div className="bg-white bg-opacity-10 w-full rounded-lg h-1/2 mb-6 p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={wind} 
                    margin={{
                      top: 20, right: 40, left: 5, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Wind" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-white text-center rounded-lg bg-white bg-opacity-20 px-4 py-2 mb-6">
                  INTENSITY GRAPH
              </div>
              <div className="bg-white bg-opacity-10 w-full rounded-lg h-1/2 p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={pressure}
                    margin={{
                      top: 20, right: 40, left: 5, bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Pressure" stroke="#82ca9d" />
                  </LineChart>   
                </ResponsiveContainer>             
              </div>
              <div className="text-white text-center rounded-lg bg-white bg-opacity-20 px-4 py-2 mt-6">
                  PRESSURE GRAPH
              </div>
            </div>

            <div className="flex flex-col w-1/2 mr-6">
              <div className="flex items-center text-white text-center rounded-lg w-full ml-6 bg-white bg-opacity-20 px-4 py-2 mb-6">
                  <div className='mr-4 w-1/2'>Date: {date}</div>
                  <div className='mr-4 w-1/2'>Time: {time}</div>
              </div>
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