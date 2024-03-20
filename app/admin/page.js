'use client'
 
import { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import NavBar from '../components/NavBar';
import PredictionBar from '../components/PredictionBar';
import TimeDateBar from '../components/TimeDateBar';
import PictureBar from '../components/PictureBar';

import MiniChatbot from '../components/MiniChatbot';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"

const Admin = () => {
  const [visible, setVisible] = useState(false)

  const [category, setCategory] = useState("Cat-1")
  const [tNumber, setTNumber] = useState('2.5 - 3.0')

  const router = useRouter()

  const { data: session } = useSession()

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
  ];

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  if (session) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline /> 
        <div className="bg-black flex items-center p-6 h-screen w-screen">
          <NavBar setVisible={setVisible} visible={visible} />
          <div className="flex items-center rounded-lg h-full w-full">
            <div className='flex flex-col h-full'>
              <div className='flex-none h-30 bg-white bg-opacity-20 rounded-lg text-white text-center p-2 w-80 mb-4 mr-6'>DVORAK SCALE</div>
              <div className="bg-white bg-opacity-10 rounded-lg w-80 mr-6">
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
                        sx={row.t_number == '2.5 - 3.0' ? { '&:last-child td, &:last-child th': { border: 0 }, color:'black', backgroundColor:'white' }:{ '&:last-child td, &:last-child th': { border: 0 }, color:'white' }}
                      >
                        <TableCell component="th" scope="row" sx={{ color:'grey' }}>
                          {row.t_number}
                        </TableCell>
                        <TableCell align="right" sx={{ color:'grey' }}>{row.categories}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="h-full mt-6 p-4 bg-white bg-opacity-40 rounded-lg w-80 mr-6 text-center">
              ABOUT CATEGORY
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
      {useEffect(() => {
        router.push('/');
      })}
    </div>
  )
}

export default Admin;
