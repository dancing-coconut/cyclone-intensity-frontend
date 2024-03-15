import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import SettingsIcon from '@mui/icons-material/Settings';

export default function PredictionBar() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [intensity, setIntensity] = useState('');

    const handleIntensityChange = (event) => {
      setIntensity(event.target.value);
    };

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      bgcolor: 'background.paper',
      border: '2px solid white',
      boxShadow: 24,
      p: 4,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '10px'
    };
    
    return(
        <div className="flex items-center rounded-lg h-16 mt-6 p-6 w-full bg-white bg-opacity-10">
            <button className='rounded-md border border-white flex items-center mr-6 h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150'
              onClick={handleOpen}
            >
              <SettingsIcon sx={{ fontSize: 25, height: '2rem', width: '2rem' }} />
            </button>
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
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  UNIT SETTINGS
                </Typography>
                <div className='rounded-md mt-4 flex justify-between p-3 border border-white opacity-40'>
                  <Typography id="modal-modal-description" sx={{ mt: 2 , marginLeft: 2 }}>Wind Intensity</Typography>
                  <Select
                    defaultValue={'knots'}
                    value={intensity}
                    label=""
                    onChange={handleIntensityChange}
                    sx={{color:'white', width: 400}}
                  >
                    <MenuItem value={'knots'}>Knots</MenuItem>
                    <MenuItem value={'kmh'}>Kilometers per hour</MenuItem>
                    <MenuItem value={'mps'}>Meters per second</MenuItem>
                    <MenuItem value={'mph'}>Miles per hour</MenuItem>
                    <MenuItem value={'fps'}>Feet per second</MenuItem>
                  </Select>
                </div>
                <div className='rounded-md mt-4 flex justify-between p-3 border border-white opacity-40'>
                  <Typography id="modal-modal-description" sx={{ mt: 2 , marginLeft: 2 }}>Cyclonic Pressure</Typography>
                  <Select
                    defaultValue={10}
                    value={intensity}
                    label=""
                    onChange={handleIntensityChange}
                    sx={{color:'white', width: 400}}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </div>
                <div className='rounded-md mt-4 flex justify-between p-3 border border-white opacity-40'>
                  <Typography id="modal-modal-description" sx={{ mt: 2 , marginLeft: 2 }}>Cyclone Category</Typography>
                  <Select
                    defaultValue={10}
                    value={intensity}
                    label=""
                    onChange={handleIntensityChange}
                    sx={{color:'white', width: 400}}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </div>
                <button className='flex-none h-30 bg-white bg-opacity-50 rounded-lg text-white text-center p-2 w-80 mt-8 mr-6 hover:bg-opacity-100 transition ease-in-out delay-150 hover:text-zinc-950' 
                >
                  SAVE
                </button>
              </Box>
            </Modal>

        </div>
    )
}