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

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    }    

    return(
        <ThemeProvider theme={darkTheme}>
            <CssBaseline /> 
            <ToastContainer />
            <div className='flex flex-col'>
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
            <div className="bg-black bg-cover flex flex-row justify-center p-6 h-screen w-screen">
                <div className='flex flex-col justify-center w-1/2'>
                    <div className='font-bold text-5xl ml-11 mb-7'>Chakravaat</div>
                    <div className="text-white font-extrabold text-7xl ml-10 mb-7">A Step Ahead<br />Natural<br />Disasters<br /></div>
                    <div className='ml-12 w-2/3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.</div>
                </div>
                <div className='w-1/2 flex flex-col justify-center h-full p-6'>
                    <div className='rounded-lg w-full mb-6 border border-white p-4'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </div>
                    <div className='rounded-lg w-full mb-6 border border-white p-4'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </div>
                    <div className='rounded-lg w-full mb-6 border border-white p-4'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </div>
                    <div className='rounded-lg w-full mb-6 border border-white p-4'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </div>
                    <div className='rounded-lg w-full border border-white p-4'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </div>
                </div>
            </div>
            <div className="bg-black bg-cover flex flex-col justify-center p-6 h-screen w-screen">
                <div className='w-full text-center text-7xl font-extrabold'>FAQS</div>
                <div className='w-full px-40 py-20'>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        Accordion 1
                        </AccordionSummary>
                        <AccordionDetails>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                        >
                        Accordion 2
                        </AccordionSummary>
                        <AccordionDetails>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        >
                        Accordion 3
                        </AccordionSummary>
                        <AccordionDetails>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4-content"
                        id="panel4-header"
                        >
                        Accordion 4
                        </AccordionSummary>
                        <AccordionDetails>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5-content"
                        id="panel5-header"
                        >
                        Accordion 5
                        </AccordionSummary>
                        <AccordionDetails>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5-content"
                        id="panel5-header"
                        >
                        Accordion 6
                        </AccordionSummary>
                        <AccordionDetails>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5-content"
                        id="panel5-header"
                        >
                        Accordion 7
                        </AccordionSummary>
                        <AccordionDetails>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                </div>
                </div>
                <div className="bg-black bg-cover flex flex-row justify-center h-screen w-screen">
                    <div className='flex flex-col w-1/2 justify-center'>
                        <div className="text-white font-extrabold text-7xl ml-10">Contact Us</div>
                        <div className="text-white text-2xl ml-12 mt-5">Get in touch us with any comments you have!</div>
                    </div>
                    <div className='w-1/2'>
                        FORM
                    </div>
                </div>
            
            </div>
        </ThemeProvider>
    );
}