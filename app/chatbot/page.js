'use client'

import { useEffect, useState } from 'react';

import NavBar from '../components/NavBar';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"

const Chatbot = () => {
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState("")

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const router = useRouter()

  const { data: session } = useSession()
  // useEffect( async() => {
  //   const response = await fetch("http://localhost:3001", {
  //     method: "POST", // *GET, POST, PUT, DELETE, etc.
  //     mode: "cors", // no-cors, *cors, same-origin
  //     body: JSON.stringify("What is the intensity of a cyclone?"), // body data type must match "Content-Type" header
  //   });
  //   setData(response.json()); // parses JSON response into native JavaScript objects
  
  // }, [])
  
  if (session) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="bg-black flex items-center p-6 h-screen w-screen">
          <NavBar setVisible={setVisible} visible={visible} />
          <div className="flex items-center rounded-lg h-full w-full">
            <div className='flex flex-col h-full'>
              {data}
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  } else {
  return (
    <div className='w-screen h-screen bg-black'>
      {/* {useEffect(() => {
        router.push('/');
      })} */}
    </div>
  )
    }
}

export default Chatbot;
