'use client'

import { useState, useEffect } from 'react';

import NavBar from '../components/NavBar';
import PredictionBar from '../components/PredictionBar';
import TimeDateBar from '../components/TimeDateBar';
import PictureBar from '../components/PictureBar';

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

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  function handleArchiveRequest(){
    console.log(archiveDate)
    console.log(archiveTime)
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
  
  if (session) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="bg-black flex items-center p-6 h-screen w-screen">
          <NavBar setVisible={setVisible} visible={visible} />
          <div className="flex items-center rounded-lg h-full w-full">
            <div className='flex flex-col h-full'>
              <div className='flex-none h-30 bg-white bg-opacity-20 rounded-lg text-white text-center p-2 w-80 mb-4 mr-6'>ARCHIVES</div>
              <div className="h-full bg-white bg-opacity-10 rounded-lg w-80 mr-6">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                        components={[
                        'StaticDateTimePicker',
                        ]}
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
                              height: '520px',
                              "& .MuiPickersCalendarHeader-root": {
                                    height: 520,
                              },
                              "& .MuiDialogActions-root":{
                                display: "none"
                              }
                                                  
                          } }
                      />
                    </DemoContainer>
                </LocalizationProvider>
              </div>
              <button className='flex-none h-30 bg-white bg-opacity-50 rounded-lg text-white text-center p-2 w-80 mt-4 mr-6 hover:bg-opacity-100 transition ease-in-out delay-150 hover:text-zinc-950' 
              onClick={handleArchiveRequest}>
                SUBMIT
              </button>
            </div>

            <div className="relative flex flex-col items-center rounded-lg h-full w-full">
              <TimeDateBar />
              <PictureBar />
              <PredictionBar />
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
