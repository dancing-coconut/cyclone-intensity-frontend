'use client'

import { useState, useEffect } from 'react';

import NavBar from '../components/NavBar';
import PredictionBar from '../components/PredictionBar';
import ArchivePictureBar from '../components/ArchivePictureBar';

import MiniChatbot from '../components/MiniChatbot';

import dayjs from 'dayjs';
import { StaticDateTimePicker } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"

const Archive = () => {
  const [visible, setVisible] = useState(false)
  const [archiveDate, setArchiveDate] = useState('2024-01-01')
  const [archiveTime, setArchiveTime] = useState('12:00:00')
  const [archiveData, setArchiveData] = useState({
    "archive_data": {
        "id": 662,
        "wind": "0.00000",
        "pressure": "0.00",
        "name": "BUREVI",
        "original_img": "/cyclone.jpg",
        "timestamp": "2020-12-04T09:00:00+05:30"
    },
    "category": 0,
    "t_number": 1,
    "next_wind_data": [
        25.0,
        25.0,
        25.0,
        25.0,
        20.0,
        20.0,
        20.0,
        0.0
    ],
    "previous_wind_data": [
        35.0,
        30.0,
        30.0,
        30.0,
        30.0,
        30.0,
        30.0,
        30.0
    ],
    "next_pressure_data": [
        1002.0,
        1002.0,
        1003.0,
        1003.0,
        1004.0,
        1006.0,
        1006.0,
        0.0
    ],
    "previous_pressure_data": [
        999.0,
        1000.0,
        1000.0,
        1000.0,
        1000.0,
        1000.0,
        1001.0,
        1001.0
    ] 
  }
)
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

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  async function handleArchiveRequest() {
    //Uncomment for fetch
    // try {
    //   const response = await fetch('http://127.0.0.1:8000/data/archive/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: `${archiveDate} ${archiveTime}`
    //   });
  
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
  
    //   const data = await response.json();
  
    //   setArchiveData(data);
    //   const { archive_data, next_wind_data, previous_wind_data, next_pressure_data, previous_pressure_data } = data;
    //   const { wind, pressure, timestamp } = archive_data;
  
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
  }
  
  const router = useRouter()

  const { data: session } = useSession()

  useEffect(() => {
    if(!session){
      router.push('/')
    } else {
      router.push('/archive')
    }
  },[router, session])

  // Un comment below for fetching:
  // useEffect(async () => {
    //Uncomment for fetch
    // try {
    //   const response = await fetch('http://127.0.0.1:8000/data/archive/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: `${archiveDate} ${archiveTime}`
    //   });
  
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
  
    //   const data = await response.json();
  
    //   setArchiveData(data);
    //   const { archive_data, next_wind_data, previous_wind_data, next_pressure_data, previous_pressure_data } = data;
    //   const { wind, pressure, timestamp } = archive_data;
  
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
              <div className='flex-none h-30 bg-white bg-opacity-20 rounded-lg text-white text-center p-2 w-80 mb-6 mr-6'>ARCHIVES</div>
              <div className="h-fit bg-white bg-opacity-10 rounded-lg w-80 mr-6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                        components={[
                        'StaticDateTimePicker',
                        ]}
                        sx={ {
                          margin: 0,
                          padding: 0,
                          "& .MuiStack-root":{
                            margin: 0,
                            padding: 0
                          },
                                              
                      } }
                    >
                      <StaticDateTimePicker 
                          onChange={(newValue) =>{
                            setArchiveDate(dayjs(newValue).format('YYYY-MM-DD'))
                            const time = {
                              hour: dayjs(newValue).format('HH'),
                              second: dayjs(newValue).format('ss')
                            }
                            var minutes = Number(dayjs(newValue).format('mm'))
                            if (minutes >= 30) {
                              time.minute = '30'
                            } else {
                              time.minute = '00'
                            }
                            setArchiveTime(time.hour + ':' + time.minute + ':' + time.second)
                          }}
                          defaultValue={dayjs('2022-04-17T15:30')} 
                          sx={ {
                              height: '29vw',
                              "& .MuiPickersCalendarHeader-root": {
                                    height: '29vw',
                              },
                              "& .MuiDialogActions-root":{
                                display: "none"
                              },               
                          } }
                      />
                    </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className='h-full bg-white bg-opacity-10 rounded-lg p-2 mt-6 mr-6'>

              </div>
              <button className='flex-none h-30 bg-white bg-opacity-50 rounded-lg text-white text-center p-2 w-80 mt-6 mr-6 hover:bg-opacity-100 transition ease-in-out delay-150 hover:text-zinc-950' 
              onClick={handleArchiveRequest}>
                SUBMIT
              </button>
            </div>

            <div className="relative flex flex-col items-center rounded-lg h-full w-full">
              {/* <ArchiveTimeDateBar /> */}
              <ArchivePictureBar date={new Date(archiveData.archive_data.timestamp).toISOString().split('T')[0]} time={new Date(archiveData.archive_data.timestamp).toISOString().substring(11, 19)} wind={windData} pressure={pressureData}  original={archiveData.archive_data.original_img}/>
              <PredictionBar windIntensity={archiveData.archive_data.wind} windPressure={archiveData.archive_data.pressure} windCategory={archiveData.category} />
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

export default Archive;
