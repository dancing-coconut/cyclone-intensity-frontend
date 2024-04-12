'use client'
 
import { useRouter, usePathname } from 'next/navigation'

import { useSession, signOut } from 'next-auth/react';

import { useState } from 'react';

import CycloneIcon from '@mui/icons-material/Cyclone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssistantIcon from '@mui/icons-material/Assistant';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import Image from "next/image";

const NavBar = ({ setVisible, visible }) => {
    const router = useRouter()

    const { data: session } = useSession()

    const key = usePathname()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        bgcolor: 'background.paper',
        border: '2px solid white',
        boxShadow: 24,
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 10,
        paddingLeft: 10,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px'
      };

    return(
        <div className="rounded-lg mr-6 h-full w-20 bg-white bg-opacity-10 flex flex-col items-center justify-between">
            <div className="flex flex-col items-center justify-between">
                <button className="m-4" onClick={() => router.push('/')}>
                    <CycloneIcon style={{ color: 'white', fontSize: 40 }}/>
                </button>
                <hr className="w-full opacity-20"/>
                <Tooltip title="Archives">
                    <button className={key=="/archive"?"flex justify-center items-center w-full mt-4 p-4 bg-gradient-to-r from-zinc-500 to-transparent border-l-4 border-white":"mt-4 p-4 opacity-40 hover:opacity-100 focus:bg-white transition ease-in-out delay-150"} onClick={() => router.push('/archive')}>
                        <CalendarMonthIcon style={{ color: 'white', fontSize: 30 }}/>
                    </button>
                </Tooltip>
                <Tooltip title="Time Series">
                    <button className={key=="/time-series"?"flex justify-center items-center w-full p-4 bg-gradient-to-r from-zinc-500 to-transparent border-l-4 border-white":"p-4 opacity-40 hover:opacity-100 focus:bg-white transition ease-in-out delay-150"} onClick={() => router.push('/time-series')}>
                        <AccessTimeIcon style={{ color: 'white', fontSize: 30 }}/>
                    </button>
                </Tooltip>
                <Tooltip title="Real Time">
                    <button className={key=="/admin"?"flex justify-center items-center w-full p-4 bg-gradient-to-r from-zinc-500 to-transparent border-l-4 border-white":"p-4 opacity-40 hover:opacity-100 focus:bg-white transition ease-in-out delay-150"} onClick={() => router.push('/admin')}>
                        <AnalyticsIcon style={{ color: 'white', fontSize: 30 }}/>
                    </button>
                </Tooltip>
                <Tooltip title="AI Chatbot">
                    <button className={key=="/chatbot"?"flex justify-center items-center w-full p-4 bg-gradient-to-r from-zinc-500 to-transparent border-l-4 border-white":"p-4 opacity-40 hover:opacity-100 focus:bg-white transition ease-in-out delay-150"} onClick={() => router.push('/chatbot')}>
                        <AssistantIcon style={{ color: 'white', fontSize: 30 }}/>
                    </button>
                </Tooltip>
                <Tooltip title="Log Book">
                    <button className={key=="/notebook"?"flex justify-center items-center w-full p-4 bg-gradient-to-r from-zinc-500 to-transparent border-l-4 border-white":"p-4 opacity-40 hover:opacity-100 focus:bg-white transition ease-in-out delay-150"} onClick={() => router.push('/notebook')}>
                        <LibraryBooksIcon style={{ color: 'white', fontSize: 30 }}/>
                    </button>
                </Tooltip>
            </div>
            <div className="flex flex-col items-center justify-between">
            <Tooltip title="Assistant">
                <button className={visible?"mb-2 p-2 opacity-100":"mb-2 p-2 opacity-40 hover:opacity-100 transition ease-in-out delay-150"} onClick={() => setVisible(!visible)}>
                    <ChatIcon style={{ color: 'white', fontSize: 30 }}/>
                </button>
            </Tooltip>
            <button className="m-4" onClick={handleOpen}>
                {session? 
                <Image
                  src={session.user?.image}
                  width={20}
                  height={20}
                  alt=""
                  className="w-8 h-8 rounded-md mb-2 hover:border hover:border-white transition ease-in-out delay-150"
                /> : 
                <AccountCircleIcon style={{ color: 'white', fontSize: 40 }}/>}
            </button>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="unit-conversion-settings"
              aria-describedby="unit-conversion-for-predicted-categories"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  ACCOUNT DETAILS
                </Typography>
                <Image
                  src={session ? session.user?.image:""}
                  width={500}
                  height={500}
                  alt=""
                  className="w-full h-full rounded-md mb-4 mt-4"
                />
                <div className='w-full bg-white bg-opacity-20 rounded-md mb-4 border border-white p-2'>
                    {session? session.user.name : ""}
                </div>
                <div className='w-full bg-white bg-opacity-20 rounded-md mb-8 border border-white p-2'>
                    {session? session.user.email: ""}
                </div>
                <button className='w-full rounded-md mb-2 border border-white p-2 hover:bg-white text-white hover:text-black transition ease-in-out delay-150'
                    onClick={() => {
                        
                        router.push('/')
                        signOut()
                    }}
                >
                    SIGN OUT
                </button>
              </Box>
            </Modal>
        </div>
    )
}

export default NavBar;