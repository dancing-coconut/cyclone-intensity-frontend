'use client'
 
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Image from "next/image";

import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function Home(){
    const router = useRouter()

    const { data: session } = useSession()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid white',
        boxShadow: 24,
        p: 4,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px'
    };

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
    }); 

    return(
        <ThemeProvider theme={darkTheme}>
            <CssBaseline /> 
            <ToastContainer />
            <div className="bg-black bg-cover flex flex-col justify-center p-6 h-screen w-screen">
                <div className="text-white font-extrabold text-7xl ml-10">Cyclone<br />Intensity<br />Prediction<br /></div>
                <div>
                    <button 
                        className="text-white border border-white rounded-md p-2 w-48 ml-10 mt-10 mr-6 hover:bg-white hover:text-zinc-900 transition ease-in-out delay-150"
                        onClick={() => {
                            if (session) {
                                router.push('/admin')
                            } else {
                                toast.error('Please sign in for access', {
                                    position: "bottom-right",
                                    autoClose: 1250,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                    });
                            }
                        }}
                    >REAL - TIME</button>
                    <button 
                        className="text-white border border-white rounded-md p-2 w-48 mt-10 mr-4 hover:bg-white hover:text-zinc-900 transition ease-in-out delay-150"
                        onClick={() => {
                            if(session) {
                                router.push('/time-series')
                            } else {
                                toast.error('Please sign in for access', {
                                    position: "bottom-right",
                                    autoClose: 1250,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                    });
                            }
                        }}
                    >TIME SERIES</button>
                </div>
                {session? 
                <button 
                    className="rounded-md p-2 absolute top-5 right-10 flex border border-white hover:bg-white text-white hover:text-black transition ease-in-out delay-150"
                    onClick={() => signOut()}
                >
                <Image
                  src={session.user?.image}
                  width={20}
                  height={20}
                  alt=""
                  className="w-6 h-6 rounded-md"
                />
                <div className='ml-4'>{session.user?.name}</div>
                </button>
        
                 : <button
                    className="text-white rounded-md p-2 absolute top-5 right-10 hover:bg-white hover:text-zinc-900 transition ease-in-out delay-150"
                    onClick={handleOpen}
                >Sign In</button>}
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                        SIGN IN
                        </Typography>
                        <div className='w-full flex flex-col items-center justify-center'>
                            <button 
                            className="text-white border border-white rounded-md p-2 w-72 mt-6 mr-4 hover:bg-white hover:text-zinc-900 transition ease-in-out delay-150"
                            onClick={() => signIn('github')} 
                            >
                                Sign In (GitHub)
                            </button>
                            <button 
                            className="text-white border border-white rounded-md p-2 w-72 mt-6 mr-4 hover:bg-white hover:text-zinc-900 transition ease-in-out delay-150"
                            onClick={() => signIn('google')} 
                            >
                                Sign In (Google)
                            </button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </ThemeProvider>
    );
}