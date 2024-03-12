'use client'
 
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Image from "next/image";
import CycloneIcon from '@mui/icons-material/Cyclone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import dayjs from 'dayjs';
import { StaticDateTimePicker } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


export default function Admin() {
  const router = useRouter()

  const [visible, setVisible] = useState(false)

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  function createData(
    t_number,
    categories,
  ) {
    return { t_number, categories};
  }

  const variants = {
    hidden: { opacity: 0},
    enter: { opacity: 1},
    exit: { opacity: 0},
  };
  
  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline />
    <div className="bg-black flex items-center p-6 h-screen w-screen">
      <div className="rounded-lg mr-6 h-full w-20 bg-white bg-opacity-10 flex flex-col items-center justify-between">
        <div className="flex flex-col items-center justify-between">
          <button className="m-4" onClick={() => router.push('/')}>
            <CycloneIcon style={{ color: 'white', fontSize: 40 }}/>
          </button>
          <hr className="w-full opacity-20"/>
          <button className="pt-6 opacity-40 hover:opacity-100 focus:bg-white" onClick={() => router.push('/archive')}>
            <CalendarMonthIcon style={{ color: 'white', fontSize: 40 }}/>
          </button>
          <button className="pt-6 opacity-40 hover:opacity-100" onClick={() => router.push('/admin')}>
            <AccessTimeIcon style={{ color: 'white', fontSize: 40 }}/>
          </button>
          <button className="pt-6 opacity-40 hover:opacity-100">
            <AnalyticsIcon style={{ color: 'white', fontSize: 40 }}/>
          </button>
          <button className="pt-6 opacity-40 hover:opacity-100" onClick={() => setVisible(!visible)}>
            <ChatIcon style={{ color: 'white', fontSize: 40 }}/>
          </button>
        </div>
        <div className="flex flex-col items-center justify-between">
          <button className="m-4">
            <AccountCircleIcon style={{ color: 'white', fontSize: 40 }}/>
          </button>
        </div>
      </div>
      <div className="flex items-center rounded-lg h-full w-full">
        <div className='flex flex-col'>
          <div className='flex-none h-30 bg-white bg-opacity-20 rounded-lg text-white text-center p-2 w-80 mb-4 mr-6'>ARCHIVES</div>
          <div className="grow h-30 bg-white bg-opacity-10 rounded-lg w-80 mr-6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                    components={[
                    'StaticDateTimePicker',
                    ]}
                >
                        <StaticDateTimePicker 
                            defaultValue={dayjs('2022-04-17T15:30')} 
                            sx={ {
                                height: '525px',
                                "& .MuiPickersCalendarHeader-root": {
                                     height: 525,
                                },
                                                    
                            } }
                        />
                </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className='flex-none h-30 bg-white bg-opacity-20 rounded-lg text-white text-center p-2 w-80 mt-4 mr-6'>SUBMIT</div>
        </div>

        <div className="relative flex flex-col items-center rounded-lg h-full w-full">
          <div className="flex items-center text-white rounded-lg w-full bg-white bg-opacity-20 px-4 py-2 mb-6">
              <div className='mr-4 w-1/4'>Date: {new Date().toISOString().split('T')[0]}</div>
              <div className='mr-4 w-1/4'>Time: {new Date().toLocaleTimeString()}</div>
              <div className='mr-4 w-1/4'>Temperature: 26 degC</div>
              <div className='w-1/4'>Humidity: 27 g</div>
          </div>
          <div className="flex rounded-lg h-full w-full">
            <div className="relative rounded-lg h-full mr-6 bg-white bg-opacity-10 w-1/2">
              <Image 
                className="h-full w-full rounded-lg"
                src="/cyclone.jpg"
                alt="Sample Cyclone"
                width={180}
                height={180}
              />
              <div className='absolute text-center p-1 rounded-md w-1/2 z-10 bg-zinc-800 text-zinc-300 top-5 left-1/4 right-1/4'>ORIGINAL</div>
            </div>
            <div className="relative rounded-lg h-full bg-white bg-opacity-10 w-1/2">
            <Image 
                className="h-full w-full rounded-lg"
                src="/cyclone.jpg"
                alt="Sample Cyclone"
                width={180}
                height={180}
              />
              <div className='absolute text-center p-1 rounded-md w-1/2 z-10 bg-zinc-800 text-zinc-300 top-5 left-1/4 right-1/4'>PROCESSED</div>
            </div>
          </div>
          <div className="flex items-center rounded-lg h-16 mt-6 p-6 w-full bg-white bg-opacity-10">
            <button className="w-full h-10 bg-white bg-opacity-10 rounded-lg mr-6 hover:bg-opacity-100 transition ease-in-out delay-150 text-white hover:text-zinc-950">Predicted Intensity: 20 kn</button>
            <button className="w-full h-10 bg-white bg-opacity-10 rounded-lg mr-6 hover:bg-opacity-100 transition ease-in-out delay-150 text-white hover:text-zinc-950">Estimated Pressure: 20 kPa</button>
            <button className="w-full h-10 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-100 transition ease-in-out delay-150 text-white hover:text-zinc-950">Predicted Category: Cat-1</button>
          </div>
          <AnimatePresence>
          {visible?
          <motion.div 
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ type: "linear" }}
          className='rounded-lg absolute z-10 right-0 bottom-0 bg-white overflow-hidden'>
            <iframe className="rounded-lg shadow-2xl shadow-zinc-950" width="350" height="430" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/e94e4dc9-5391-4087-8221-ec7bb543eee6"></iframe>
          </motion.div>
          :""}
          </AnimatePresence>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
}
