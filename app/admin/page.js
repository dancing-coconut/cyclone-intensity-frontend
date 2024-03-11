'use client'
 
import { useRouter } from 'next/navigation'
import { useState } from 'react';

import Image from "next/image";
import CycloneIcon from '@mui/icons-material/Cyclone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ChatIcon from '@mui/icons-material/Chat';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function Admin() {
  const router = useRouter()

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
  
  return (
    <div className="bg-black flex items-center p-6 h-screen w-screen">
      <div className="rounded-lg mr-6 h-full w-20 bg-white bg-opacity-10 flex flex-col items-center justify-between">
        <div className="flex flex-col items-center justify-between">
          <button className="m-4" onClick={() => router.push('/')}>
            <CycloneIcon style={{ color: 'white', fontSize: 40 }}/>
          </button>
          <hr className="w-full opacity-20"/>
          <button className="pt-6 opacity-40 hover:opacity-100 focus:bg-white">
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
          <div className='flex-none h-30 bg-white bg-opacity-20 rounded-lg text-white text-center p-2 w-80 mb-4 mr-6'>DVORAK SCALE</div>
          <div className="grow h-30 bg-white bg-opacity-10 rounded-lg w-80 mr-6">
            <Table sx={{ color:'white' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color:'white', fontWeight:'bold' }}>T-Number</TableCell>
                  <TableCell align="right" sx={{ color:'white', fontWeight: 'bold' }}>Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.t_number}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, color:'white' }}
                  >
                    <TableCell component="th" scope="row" sx={{ color:'grey' }}>
                      {row.name}
                    </TableCell>
                    <TableCell align="right" sx={{ color:'grey' }}>{row.categories}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="relative flex flex-col items-center rounded-lg h-full w-full">
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
            <button className="w-full h-10 bg-white bg-opacity-10 rounded-lg mr-6 hover:bg-opacity-100 transition ease-in-out delay-150 text-white hover:text-zinc-950">Predicted Category: Cat-1</button>
            <label for="main-btn" className="p-2 h-10 bg-white bg-opacity-50 rounded-lg hover:bg-opacity-100 transition ease-in-out delay-150 text-white hover:text-zinc-950">
              UPLOAD
              <input
                type="file"
                hidden
                id="main-btn"
              />
            </label>
          </div>
          {visible?
          <div className='absolute z-10 right-0 bottom-0'>
            <iframe className="rounded-lg shadow-2xl shadow-zinc-950" width="350" height="430" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/e94e4dc9-5391-4087-8221-ec7bb543eee6"></iframe>
          </div>
          :""}
        </div>
      </div>
    </div>
  );
}
