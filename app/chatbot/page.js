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
import MiniChatbot from '../components/MiniChatbot';

const Chatbot = () => {
  const [visible, setVisible] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(["Hello! Feel free to ask me any question you have for analysis of cyclones!"])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const router = useRouter()

  const { data: session } = useSession()

  const sendHandler = () => {
    setMessages((oldMessages) => [
      ...oldMessages,
      message
    ])
    setMessage("")
    setDisabled(true)
    // chatting()
    fetchDataStream()
  }

  async function fetchDataStream() {
    const url = 'http://localhost:11434/api/generate'; // Replace this with the actual URL of the data stream

    const requestBody = {
        model: "mistral",
        prompt: `[INST] ${message} [/INST]`,
        raw: true,
        stream: true
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const processDataChunk = async (reader) => {
            const decoder = new TextDecoder();

            setMessages((oldMessages) => [
              ...oldMessages,
              ""
            ])
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                const resp = decoder.decode(value, { stream: true });
                setMessages((oldMessages) => {
                  const newMessages = [...oldMessages];
                  newMessages[newMessages.length - 1] = newMessages[newMessages.length - 1] + JSON.parse(resp).response;
                  return newMessages;
                });
                console.log(resp)
            }
        };

        const reader = response.body.getReader();

        processDataChunk(reader);
        setDisabled(false)

    } catch (error) {
        console.error('Error fetching data:', error);
        setMessages((oldMessages) => [
          ...oldMessages,
          "I'm so sorry there's been some error in the back!"
        ])
        setDisabled(false)
    }
}

  const chatting = async () => {
    fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model": "mistral",
            "prompt": `[INST] ${message} [/INST]`,
            "raw": true,
            "stream": false
        })
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
          setMessages((oldMessages) => [
            ...oldMessages,
            data.response
          ])
          setDisabled(false)
        })
        .catch(error => {
          console.error('There was a problem with your fetch operation:', error);
          setMessages((oldMessages) => [
            ...oldMessages,
            "I'm so sorry there's been some error in the back!"
          ])
          setDisabled(false)
        }
    );
}

  
  if (session) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="bg-black flex items-center p-6 h-screen w-screen">
          <NavBar setVisible={setVisible} visible={visible} />
          <div className="flex items-center rounded-lg h-full w-full">
            <div className="relative flex flex-col h-full w-full bg-white bg-opacity-10 rounded-lg w-80 p-4">
              <div className='h-full flex flex-col bg-black rounded-lg mb-4 overflow-scroll pt-2 pb-2'>
                {messages.map((message, index) => {
                  if(index % 2 == 0) {
                    return (
                      <ChatBotMessage message={message}/>
                    )
                  } else {
                    return (
                      <UserMessage message={message}/>
                    )
                  }
                })}
              </div>
              <div className='flex rounded-md p-2 pl-4 border-neutral-500 border text-white'>
                <input 
                  type='text' 
                  className='w-full bg-transparent focus:outline-none' 
                  placeholder={disabled ? 'Chakravaat is responding ...':'Message Chakravaat .....'}
                  value={message}
                  disabled={disabled}

                  onChange={(event) => {
                    setMessage(event.target.value)
                  }}  
                />
                <IconButton 
                  className='h-full w-fit border border-white text-white border-box rounded-md p-1.5 ml-4 hover:text-black hover:border hover:border-white transition ease-in-out delay-150'
                  disabled={message == "" ? true:false}
                  onClick={sendHandler}
                >
                  <SendIcon />
                </IconButton>
                
              </div>
              <MiniChatbot visible={visible} />
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