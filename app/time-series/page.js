'use client'
 
import { useState, useEffect } from 'react';

import NavBar from '../components/NavBar';
import PredictionBar from '../components/PredictionBar';
import TimeDateBar from '../components/TimeDateBar';
import PictureBar from '../components/PictureBar';

import MiniChatbot from '../components/MiniChatbot';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"

const TimeSeries = () => {
  const [visible, setVisible] = useState(false)

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
  
  if (session) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline /> 
        <div className="bg-black flex items-center p-6 h-screen w-screen">
          <NavBar setVisible={setVisible} visible={visible} />
          <div className="flex items-center rounded-lg h-full w-full">
            <div className='flex flex-col h-full'>
              <div className='h-30 bg-white bg-opacity-20 rounded-lg text-white text-center p-2 w-80 mb-4 mr-6'>FORECASTS</div>
              <div className="flex flex-col h-full bg-white bg-opacity-10 rounded-lg w-80 mr-6">
                <div className='bg-white bg-opacity-20 p-4 h-1/5 rounded-md mt-4 mx-4 text-center'>Forecasted
                <div className='bg-white bg-opacity-40 m-2 p-2 rounded-md border-box'>
                  Predicted Intensity
                </div>
                </div>
                <div className='bg-white bg-opacity-20 p-4 h-1/5 rounded-md mt-4 mx-4 text-center'>Forecasted
                <div className='bg-white bg-opacity-40 m-2 p-2 rounded-md border-box'>
                  Predicted Intensity
                </div>
                </div>
                <div className='bg-white bg-opacity-20 p-4 h-1/5 rounded-md mt-4 mx-4 text-center'>Forecasted
                <div className='bg-white bg-opacity-40 m-2 p-2 rounded-md border-box'>
                  Predicted Intensity
                </div>
                </div>
                <div className='bg-white bg-opacity-20 p-4 h-1/5 rounded-md mt-4 mx-4 text-center'>Forecasted
                <div className='bg-white bg-opacity-40 m-2 p-2 rounded-md border-box'>
                  Predicted Intensity
                </div>
                </div>
                <div className='bg-white bg-opacity-20 p-4 h-1/5 rounded-md mt-4 mb-4 mx-4 text-center'>Forecasted
                <div className='bg-white bg-opacity-40 m-2 p-2 rounded-md border-box'>
                  Predicted Intensity
                </div>
                </div>
              </div>
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

export default TimeSeries