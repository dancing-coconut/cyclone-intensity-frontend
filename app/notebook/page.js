'use client'

import { useEffect, useState } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import PDFGenerator from '../components/PDFGenerator';
import NavBar from '../components/NavBar';
import Tiptap from '../components/Tiptap';

const Notebook = () => {
  const [visible, setVisible] = useState(false)
  const [editor, setEditor] = useState()

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [data, setData] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem('data');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const handleDeleteLog = (key) => {
    setData(prevData => {
      const newData = { ...prevData };
      delete newData[key];
      localStorage.setItem('data', JSON.stringify(newData));
      return newData;
    });
  }

  const handleNoteTransfer = (key) => {
    editor.commands.insertContent(`${key} : ${data[key]}\n`)
  }

  const handleEditorRender = (editorObject) => {
    setEditor(editorObject);
  };


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="bg-black flex items-center p-6 h-screen w-screen">
        <NavBar setVisible={setVisible} visible={visible} />
        <div className="flex items-center rounded-lg h-full w-full">
            <div className='flex flex-col h-full'>
              <div className='h-30 bg-white bg-opacity-20 rounded-lg text-white text-center p-2 w-96 mb-4 mr-6'>NOTED LOGS</div>
              <div className="bg-white h-full bg-opacity-10 rounded-lg w-96 mr-6 overflow-scroll p-4 text-center">
                {Object.keys(data).length === 0 ? <div className='opacity-30 w-full border border-white rounded-lg p-2'>There are no logs yet!</div>:""}
                {Object.entries(data).map(([key, value]) => (
                  <div className='flex flex-row'>
                    <div className='w-full bg-white bg-opacity-20 text-white rounded-md text-center mb-4 p-2 mr-4'>
                      {key} : {value}
                    </div>
                    <button className='rounded-md border border-white flex items-center h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150 mr-4'
                      onClick={() => handleNoteTransfer(key)}
                    >
                      <ExitToAppIcon />
                    </button>
                    <button className='rounded-md border border-white flex items-center h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150'
                      onClick={() => handleDeleteLog(key)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex flex-col items-center rounded-lg h-full w-full bg-white bg-opacity-10 rounded-lg">
              <Tiptap onEditorRender={handleEditorRender} />
            </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Notebook;