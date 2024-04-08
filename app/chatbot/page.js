'use client'

import { useEffect, useState } from 'react';

import NavBar from '../components/NavBar';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"

import ChatBotMessage from '../components/ChatBotMessage';
import UserMessage from '../components/UserMessage';

const Chatbot = () => {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [botMessages, setBotMessages] = useState(["Hello! Feel free to ask me any question you have for analysis of cyclones!"])
  const [userMessages, setUserMessages] = useState([])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const router = useRouter()

  const { data: session } = useSession()

  
  if (session) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="bg-black flex items-center p-6 h-screen w-screen">
          <NavBar setVisible={setVisible} visible={visible} />
          <div className="flex items-center rounded-lg h-full w-full">
            <div className="flex flex-col h-full w-full bg-white bg-opacity-10 rounded-lg w-80 p-4">
              <div className='h-full flex flex-col bg-black rounded-lg mb-4 overflow-scroll pt-2 pb-2'>
                <ChatBotMessage message={"kjhjd"} />
                <UserMessage message={"kjgkfd"} />
              </div>
              <div className='flex rounded-md p-2 pl-4 border-neutral-500 border text-white'>
                <input 
                  type='text' 
                  className='w-full bg-transparent focus:outline-none' 
                  placeholder='Message Chakravaat .....'
                  onChange={(event) => {
                    setMessage(event.target.value)
                  }}  
                />
                <IconButton 
                  className='h-full w-fit border border-white text-white border-box rounded-md p-1.5 ml-4 hover:text-black hover:border hover:border-white transition ease-in-out delay-150'
                  disabled={message == "" ? true:false}
                >
                  <SendIcon />
                </IconButton>
                
              </div>
              {message}
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
  // useEffect( async() => {
  //   const response = await fetch("http://localhost:3001", {
  //     method: "POST", // *GET, POST, PUT, DELETE, etc.
  //     mode: "cors", // no-cors, *cors, same-origin
  //     body: JSON.stringify("What is the intensity of a cyclone?"), // body data type must match "Content-Type" header
  //   });
  //   setData(response.json()); // parses JSON response into native JavaScript objects
  
  // }, [])