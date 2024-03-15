'use client'
 
import { useRouter, usePathname } from 'next/navigation'

import CycloneIcon from '@mui/icons-material/Cyclone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavBar = ({ setVisible, visible }) => {
    const router = useRouter()

    const key = usePathname()
    return(
        <div className="rounded-lg mr-6 h-full w-20 bg-white bg-opacity-10 flex flex-col items-center justify-between">
            <div className="flex flex-col items-center justify-between">
                <button className="m-4" onClick={() => router.push('/')}>
                    <CycloneIcon style={{ color: 'white', fontSize: 40 }}/>
                </button>
                <hr className="w-full opacity-20"/>
                <button className={key=="/archive"?"flex justify-center items-center w-full mt-4 p-4 bg-gradient-to-r from-zinc-500 to-transparent border-l-4 border-white":"mt-4 p-4 opacity-40 hover:opacity-100 focus:bg-white"} onClick={() => router.push('/archive')}>
                    <CalendarMonthIcon style={{ color: 'white', fontSize: 30 }}/>
                </button>
                <button className={key=="/time-series"?"flex justify-center items-center w-full p-4 bg-gradient-to-r from-zinc-500 to-transparent border-l-4 border-white":"p-4 opacity-40 hover:opacity-100 focus:bg-white"} onClick={() => router.push('/time-series')}>
                    <AccessTimeIcon style={{ color: 'white', fontSize: 30 }}/>
                </button>
                <button className={key=="/admin"?"flex justify-center items-center w-full p-4 bg-gradient-to-r from-zinc-500 to-transparent border-l-4 border-white":"p-4 opacity-40 hover:opacity-100 focus:bg-white"} onClick={() => router.push('/admin')}>
                    <AnalyticsIcon style={{ color: 'white', fontSize: 30 }}/>
                </button>
            </div>
            <div className="flex flex-col items-center justify-between">
            <button className={visible?"mb-2 p-2 opacity-100":"mb-2 p-2 opacity-40 hover:opacity-100"} onClick={() => setVisible(!visible)}>
                <ChatIcon style={{ color: 'white', fontSize: 30 }}/>
            </button>
            <button className="m-4">
                <AccountCircleIcon style={{ color: 'white', fontSize: 40 }}/>
            </button>
            </div>
        </div>
    )
}

export default NavBar;