'use client'
 
import { useState, useEffect } from 'react';

import NavBar from '../components/NavBar';
import PredictionBar from '../components/PredictionBar';
import TimeDateBar from '../components/TimeDateBar';
import PictureBar from '../components/PictureBar';
import TimeSeriesPictureBar from '../components/TimeSeriesPictureBar';

import MiniChatbot from '../components/MiniChatbot';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"

const TimeSeries = () => {
  const [visible, setVisible] = useState(false)
  const [timeSeriesData, setTimeSeriesData] = useState({
    "general_data": {
        "id": 98,
        "wind": "19.28828",
        "pressure": "1002.43",
        "t_number": "1.0",
        "category": "0",
        "original_img": "/cyclone.jpg",
        "processed_img": "/media/processed/processed_sYZibE5.png",
        "timestamp": "2024-04-13T07:04:07.423692+05:30"
    },
    "next_wind_data": [
        18.4065,
        19.3214,
        20.2363,
        21.1511
    ],
    "previous_wind_data": [
        11.43553,
        14.26533,
        12.50797,
        11.93501,
        11.79449,
        17.28666,
        15.80252,
        19.28828
    ],
    "next_pressure_data": [
        1002.89,
        1002.98,
        1003.06,
        1003.15
    ],
    "previous_pressure_data": [
        1002.0,
        1005.0,
        1002.0,
        1000.0,
        1000.0,
        1004.84,
        1002.93,
        1003.29
    ]
}
)

  function createData(
    t_number,
    categories,
  ) {
    return { t_number, categories};
  }

  const rows = [
    createData('1.0 - 1.5', 159),
    createData('2.0', 159),
    createData('2.5 - 3.0', 159),
    createData('3.5', 159),
    createData('4.0', 159),
    createData('4.5', 159),
    createData('5.0', 159),
    createData('5.5', 159),
    createData('6.0 - 6.5', 159),
    createData('7.0 - 8.5', 159),
  ];
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const router = useRouter()

  const { data: session } = useSession()

  useEffect(() => {
    if(!session){
      router.push('/')
    } else {
      router.push('/time-series')
    }
  },[router, session])

  const [windData, setWindData] = useState([ 
    {
      "name": "00:00:00",
      "Wind": 30.0,
    }, 
    {
      "name": "03:00:00",
      "Wind": 30.0,
    },
    {
      "name": "06:00:00",
      "Wind": 35.0,
    },
    {
    "name": "09:00:00",
    "Wind": 0.0,
  },
  {
    "name": "12:00:00",
    "Wind": 25.0,
  },
  {
    "name": "15:00:00",
    "Wind": 25.0,
  },
  {
    "name": "18:00:00",
    "Wind": 25.0,
  },
  {
    "name": "21:00:00",
    "Wind": 25.0,
  },
  {
    "name": "00:00:00",
    "Wind": 20.0,
  },
])

  const [pressureData, setPressureData] = useState([  {
    "name": "00:00:00",
    "Pressure": 1000.0,
  },
  {
    "name": "03:00:00",
    "Pressure": 1000.0,
  },
  {
    "name": "06:00:00",
    "Pressure": 999.0,
  },
  {
    "name": "09:00:00",
    "Pressure": 0.0,
  },
  {
    "name": "12:00:00",
    "Pressure": 1002.0,
  },
  {
    "name": "15:00:00",
    "Pressure": 1002.0,
  },
  {
    "name": "18:00:00",
    "Pressure": 1003.0,
  },
  {
    "name": "21:00:00",
    "Pressure": 1003.0,
  },
  {
    "name": "00:00:00",
    "Pressure": 1004.0,
  },
])

 // Un comment below for fetching:
  // useEffect(async () => {
    //Uncomment for fetch
    // try {
    //   const response = await fetch('http://127.0.0.1:8000/time_series/prediction/');
  
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
  
    //   const data = await response.json();
  
    //   setTimeSeries(data);
    //   const { general_data, next_wind_data, previous_wind_data, next_pressure_data, previous_pressure_data } = data;
    //   const { wind, pressure, timestamp } = general_data;
  
    //   const currentDate = new Date(timestamp);
  
    //   const formatTime = (date) =>
    //     `${String(date.getHours()).padStart(2, '0')}:${String(
    //       date.getMinutes()
    //     ).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  
    //   const previousWindObjects = previous_wind_data.map((windValue, index) => ({
    //     name: formatTime(new Date(currentDate.getTime() - (index + 1) * 3 * 60 * 60 * 1000)),
    //     Wind: windValue
    //   }));
  
    //   const currentWindObject = {
    //     name: formatTime(currentDate),
    //     Wind: parseFloat(wind)
    //   };
  
    //   const nextWindObjects = next_wind_data.map((windValue, index) => ({
    //     name: formatTime(new Date(currentDate.getTime() + (index + 1) * 3 * 60 * 60 * 1000)),
    //     Wind: windValue
    //   }));
  
    //   const previousPressureObjects = previous_pressure_data.map((pressureValue, index) => ({
    //     name: formatTime(new Date(currentDate.getTime() - (index + 1) * 3 * 60 * 60 * 1000)),
    //     Pressure: pressureValue
    //   }));
  
    //   const currentPressureObject = {
    //     name: formatTime(currentDate),
    //     Pressure: parseFloat(pressure)
    //   };
  
    //   const nextPressureObjects = next_pressure_data.map((pressureValue, index) => ({
    //     name: formatTime(new Date(currentDate.getTime() + (index + 1) * 3 * 60 * 60 * 1000)),
    //     Pressure: pressureValue
    //   }));
  
    //   const windResult = [...previousWindObjects.reverse(), currentWindObject, ...nextWindObjects];
    //   setWindData(windResult);
  
    //   const pressureResult = [...previousPressureObjects.reverse(), currentPressureObject, ...nextPressureObjects];
    //   setPressureData(pressureResult);
    // } catch (error) {
    //   console.error('There was a problem with your fetch operation:', error);
    // }
  // }, [])
  
  if (session) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline /> 
        <div className="bg-black flex items-center p-6 h-screen w-screen">
          <NavBar setVisible={setVisible} visible={visible} />
          <div className="flex items-center rounded-lg h-full w-full">
            <div className='flex flex-col h-full'>
              <div className='h-30 bg-white bg-opacity-30 rounded-lg text-white text-center p-2 w-80 mb-4 mr-6'>FORECASTS</div>
              <div className="flex flex-col h-full rounded-lg w-80 mr-6">
                <div className='h-1/2 mb-6 flex flex-col'>
                  <div className='bg-white bg-opacity-20 rounded-lg text-white text-center p-2 w-80 mb-4'>INTENSITY</div>
                  <div className='h-full w-full bg-white bg-opacity-10 rounded-lg p-4 overflow-scroll'>

                  </div>
                </div>
                <div className='h-1/2 flex flex-col'>
                  <div className='bg-white bg-opacity-20 rounded-lg text-white text-center p-2 w-80 mb-4'>PRESSURE</div>
                  <div className='h-full w-full bg-white bg-opacity-10 rounded-lg p-4 overflow-scroll'>

                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col items-center rounded-lg h-full w-full">
              <TimeDateBar />
              <TimeSeriesPictureBar wind={windData} pressure={pressureData} original={timeSeriesData.general_data.original_img}/>
              <PredictionBar windIntensity={timeSeriesData.general_data.wind} windPressure={timeSeriesData.general_data.pressure} windCategory={timeSeriesData.general_data.category}/>
              <MiniChatbot visible={visible} />
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
  return (
    <div className='w-screen h-screen bg-black'>
      {/* {useEffect(() => {
        router.push('/');
      })} */}
    </div>
  )
}

export default TimeSeries