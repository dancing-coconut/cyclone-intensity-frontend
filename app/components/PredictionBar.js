import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';

import SettingsIcon from '@mui/icons-material/Settings';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import { IconButton } from '@mui/material';

import { pressureConverter, speedConverter } from './UnitConversionFunctions';

import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

// import SaveIcon from '@mui/icons-material/Save';
// import PrintIcon from '@mui/icons-material/Print';
// import ShareIcon from '@mui/icons-material/Share';



export default function PredictionBar({ windIntensity, windPressure, windCategory }) {

    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [intensity, setIntensity] = useState(20);

    const handleIntensityChange = () => {
      const fromUnit =  intensityUnit["curr"]
      const newIntensityUnits = {
        "prev": intensityUnit["curr"]
      }
      if (fromUnit == "knots") {
        newIntensityUnits["curr"] = 'kmh'
      } else if (fromUnit == "kmh") {
        newIntensityUnits["curr"] = 'mps'
      } else if (fromUnit == "mps") {
        newIntensityUnits["curr"] = 'mph'
      } else if (fromUnit == "mph") {
        newIntensityUnits["curr"] = 'fps'
      } else {
        newIntensityUnits["curr"] = 'knots'
      }

      const changedSpeed = speedConverter(intensity, newIntensityUnits["prev"], newIntensityUnits["curr"])

      setIntensityUnit(newIntensityUnits)
      setIntensity(changedSpeed);
    };

    const [pressure, setPressure] = useState(20);

    const handlePressureChange = () => {
      const fromUnit =  pressureUnit["curr"]
      const newPressureUnits = {
        "prev": pressureUnit["curr"]
      }
      if (fromUnit == "Pa") {
        newPressureUnits["curr"] = 'mbar'
      } else if (fromUnit == "mbar") {
        newPressureUnits["curr"] = 'bar'
      } else if (fromUnit == "bar") {
        newPressureUnits["curr"] = 'mmHg'
      } else if (fromUnit == "mmHg") {
        newPressureUnits["curr"] = 'atm'
      } else {
        newPressureUnits["curr"] = 'Pa'
      }

      const changedPressure = pressureConverter(pressure, newPressureUnits["prev"], newPressureUnits["curr"])

      setPressureUnit(newPressureUnits)
      setPressure(changedPressure);
    };

    const [category, setCategory] = useState('Cat-1');


    const [intensityUnit, setIntensityUnit] = useState({
      "prev": "knots",
      "curr": "knots"
    });

    const handleIntensityUnitChange = (event) => {
      const newIntensityUnits = {
        "prev": intensityUnit["curr"],
        "curr": event.target.value
      }
      setIntensityUnit(newIntensityUnits);
    };

    const [pressureUnit, setPressureUnit] = useState({
      "prev": "Pa",
      "curr": "Pa"
    });

    const handlePressureUnitChange = (event) => {
      const newPressureUnits = {
        "prev": pressureUnit["curr"],
        "curr": event.target.value
      }
      setPressureUnit(newPressureUnits);
    };

    const [categoryUnit, setCategoryUnit] = useState({
      "prev": "cat",
      "curr": "cat"
    });


    function settingsSaveHandler () {
      // window.open(`https://www.google.com/search?q=${encodeURIComponent('Wind Intensity: 20')}`, '_blank');

      const changedSpeed = speedConverter(intensity, intensityUnit["prev"], intensityUnit["curr"])
      const changedPressure = pressureConverter(pressure, pressureUnit["prev"], pressureUnit["curr"])

      setIntensity(changedSpeed)
      setPressure(changedPressure)

      setOpen(false);
    }

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

    const [data, setData] = useState({});

    useEffect(() => {
      const storedData = localStorage.getItem('data');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }, []);

    const pressureCopyHandler = () => {
      const newData = { ...data, ["pressure"]: pressure };
      setData(newData);
      localStorage.setItem('data', JSON.stringify(newData));

    }

    const windCopyHandler = () => {
      const newData = { ...data, ["wind"]: intensity };
      setData(newData);
      localStorage.setItem('data', JSON.stringify(newData));

    }
    useEffect(() => {
      setIntensity(windIntensity);
      setPressure(windPressure);
      setCategory(windCategory);
    }, [windIntensity, windPressure, windCategory]);    

    // const actions = [
    //   { icon: <FileCopyIcon />, name: 'Copy to Clipboard' },
    //   { icon: <ExitToAppIcon />, name: 'Copy to Logs' },
    //   { icon: <ContactSupportIcon />, name: 'Ask the Chatbot' },
    //   { icon: <TravelExploreIcon />, name: 'Search the Web' },
    // ];
    // const actions = [
    //   { icon: <IconButton onClick={}><FileCopyIcon /></IconButton>, name: 'Copy to Clipboard' },
    //   { icon: <IconButton onClick={}><ExitToAppIcon /></IconButton>, name: 'Copy to Logs' },
    //   { icon: <IconButton onClick={}><TravelExploreIcon /></IconButton>, name: 'Search the Web' },
    //   { icon: <IconButton onClick={}><ContactSupportIcon /></IconButton>, name: 'Ask the Chatbot' },
    // ];

    const actions = [
      { icon: <FileCopyIcon />, name: 'Copy to Clipboard' },
      { icon: <ExitToAppIcon />, name: 'Copy to Logs' },
      { icon: <TravelExploreIcon />, name: 'Search the Web' },
      { icon: <ContactSupportIcon />, name: 'Ask the Chatbot' },
    ];

    const getNextPressureUnit = () => {
      if (pressureUnit["curr"] == "Pa") {
        return 'mbar'
      } else if (pressureUnit["curr"] == "mbar") {
        return 'bar'
      } else if (pressureUnit["curr"] == "bar") {
        return 'mmHg'
      } else if (pressureUnit["curr"] == "mmHg") {
        return 'atm'
      } else {
        return 'Pa'
      }
    }
    
    const getNextWindUnit = () => {
      if (intensityUnit["curr"] == "knots") {
        return 'kmh'
      } else if (intensityUnit["curr"] == "kmh") {
        return 'mps'
      } else if (intensityUnit["curr"] == "mps") {
        return 'mph'
      } else if (intensityUnit["curr"] == "mph") {
        return 'fps'
      } else {
        return 'knots'
      }
    }
    
    return(
      <div className='flex flex-row w-full'>
        <div className="flex items-center rounded-lg h-16 mt-6 py-6 pl-4 w-3/4 bg-white bg-opacity-10">
            <Tooltip title="Unit Settings">
              <button className='rounded-md border border-white flex items-center mr-4 h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150'
                onClick={handleOpen}
              >
                <SettingsIcon sx={{ fontSize: 25, height: '2rem', width: '2rem' }} />
              </button>
            </Tooltip>
            <Tooltip title={"Change Intensity Unit To " + getNextWindUnit()}>
                <button className="w-full h-10 bg-white bg-opacity-10 rounded-lg mr-2 hover:bg-opacity-100 transition ease-in-out delay-150 text-white hover:text-zinc-950"
                  onClick={handleIntensityChange}
                >Predicted Intensity: {intensity} {intensityUnit["curr"]}</button>
            </Tooltip>
            {/* <Tooltip title="Copy to logs">
              <button className='rounded-md border border-white flex flex-row items-center mr-6 h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150'
                onClick={windCopyHandler}
              >
                  <ContentCopyIcon sx={{ fontSize: 25, height: '2rem', width: '2rem' }}/>
              </button>
            </Tooltip> */}
            <div className='flex ml-2 mr-4'>
              <div className='relative h-10 w-10'>
                <SpeedDial
                  ariaLabel="Log book actions"
                  sx={{ 
                    position: 'absolute',
                    bottom:0,
                    right: 0,
                    // top:0,
                    // left:0,
                    "& .MuiButtonBase-root:hover":{
                      background:"white",
                      color:"black",
                      border: 2,
                    },
                    "& .MuiButtonBase-root":{
                      background:"black",
                      height: '2.5rem',
                      width: '2.5rem',
                      border: 2,
                      color: 'rgba(255,255,255,0.5)',
                    },
                  }}
                  icon={<SpeedDialIcon sx={{
                    marginBottom: '3px'
                    // color:'white',
                    // '&:hover':{
                    //   color:"black"
                    // }
                  }}
                  />}
                  // icon={<AddCircleOutlineIcon />}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                    />
                  ))}
                </SpeedDial>
              </div>
            </div>
            <Tooltip title={"Change Pressure Unit To " + getNextPressureUnit()}>
              <button className="w-full h-10 bg-white bg-opacity-10 rounded-lg mr-2 hover:bg-opacity-100 transition ease-in-out delay-150 text-white hover:text-zinc-950"
                onClick={handlePressureChange}
              >Estimated Pressure: {pressure} {pressureUnit["curr"]}</button>
            </Tooltip>
            {/* <Tooltip title="Copy to logs">
              <button className='rounded-md border border-white flex items-center mr-6 h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150'
                onClick={pressureCopyHandler}
              >
                  <ContentCopyIcon sx={{ fontSize: 25, height: '2rem', width: '2rem' }}/>
              </button>
            </Tooltip> */}
            <div className='flex ml-2 mr-4'>
              <div className='relative h-10 w-10'>
                <SpeedDial
                  ariaLabel="Log book actions"
                  sx={{ 
                    position: 'absolute',
                    bottom:0,
                    right: 0,
                    // top:0,
                    // left:0,
                    "& .MuiButtonBase-root:hover":{
                      background:"white",
                      color:"black",
                      border: 2,
                    },
                    "& .MuiButtonBase-root":{
                      background:"black",
                      height: '2.5rem',
                      width: '2.5rem',
                      border: 2,
                      color:'rgba(255,255,255,0.5)',
                    },
                  }}
                  icon={<SpeedDialIcon sx={{
                    marginBottom: '3px'
                    // color:'white',
                    // '&:hover':{
                    //   color:"black"
                    // }
                  }}
                  />}
                  // icon={<AddCircleOutlineIcon />}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                    />
                  ))}
                </SpeedDial>
              </div>
            </div>
            
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="unit-conversion-settings"
              aria-describedby="unit-conversion-for-predicted-categories"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  UNIT SETTINGS
                </Typography>
                <div className='rounded-md mt-4 flex justify-between p-3 border border-white opacity-40'>
                  <Typography id="modal-modal-description" sx={{ mt: 2 , marginLeft: 2 }}>Wind Intensity</Typography>
                  <Select
                    defaultValue={'knots'}
                    value={intensityUnit["curr"]}
                    label=""
                    onChange={handleIntensityUnitChange}
                    sx={{color:'white', width: 400}}
                  >
                    {intensityUnit["curr"] == 'knots' ? <MenuItem disabled value={'knots'}>Knots</MenuItem> : <MenuItem value={'knots'}>Knots</MenuItem>}
                    {intensityUnit["curr"] == 'kmh' ? <MenuItem disabled value={'kmh'}>Kilometers per hour</MenuItem> : <MenuItem value={'kmh'}>Kilometers per hour</MenuItem>}
                    {intensityUnit["curr"] == 'mps' ? <MenuItem disabled value={'mps'}>Meters per second</MenuItem> : <MenuItem value={'mps'}>Meters per second</MenuItem>}
                    {intensityUnit["curr"] == 'mph' ? <MenuItem disabled value={'mph'}>Miles per hour</MenuItem> : <MenuItem value={'mph'}>Miles per hour</MenuItem>}
                    {intensityUnit["curr"] == 'fps' ? <MenuItem disabled value={'fps'}>Feet per second</MenuItem> : <MenuItem value={'fps'}>Feet per second</MenuItem>}
                  </Select>
                </div>
                <div className='rounded-md mt-4 flex justify-between p-3 border border-white opacity-40'>
                  <Typography id="modal-modal-description" sx={{ mt: 2 , marginLeft: 2 }}>Cyclonic Pressure</Typography>
                  <Select
                    defaultValue={10}
                    value={pressureUnit["curr"]}
                    label=""
                    onChange={handlePressureUnitChange}
                    sx={{color:'white', width: 400}}
                  >
                    {pressureUnit["curr"] == 'Pa' ? <MenuItem disabled value={'Pa'}>Pascal</MenuItem> : <MenuItem value={'Pa'}>Pascal</MenuItem> }
                    {pressureUnit["curr"] == 'mbar' ? <MenuItem disabled value={'mbar'}>Millibar</MenuItem> : <MenuItem value={'mbar'}>Millibar</MenuItem>}
                    {pressureUnit["curr"] == 'bar' ? <MenuItem disabled value={'bar'}>Bar</MenuItem> : <MenuItem value={'bar'}>Bar</MenuItem>}
                    {pressureUnit["curr"] == 'mmHg' ? <MenuItem disabled value={'mmHg'}>Millimeter of Mercury</MenuItem> : <MenuItem value={'mmHg'}>Millimeter of Mercury</MenuItem>}
                    {pressureUnit["curr"] == 'atm' ? <MenuItem disabled value={'atm'}>Standard Atmosphere</MenuItem> : <MenuItem value={'atm'}>Standard Atmosphere</MenuItem>}
                  </Select>
                </div>
                <div className='w-full flex justify-center'>
                  <button className='flex-none h-30 bg-white bg-opacity-50 rounded-lg text-white text-center p-2 w-80 mt-8 mr-6 hover:bg-opacity-100 transition ease-in-out delay-150 hover:text-zinc-950' 
                    onClick={settingsSaveHandler}
                  >
                    SAVE
                  </button>
                </div>
              </Box>
            </Modal>

        </div>
        <div className="flex items-center rounded-lg h-16 mt-6 ml-4 py-6 px-4 w-1/4 bg-white bg-opacity-10">
        <button className="w-full h-10 bg-white bg-opacity-10 rounded-lg mr-2 hover:bg-opacity-100 transition ease-in-out delay-150 text-white hover:text-zinc-950">Predicted Category: {category}</button>
            {/* <Tooltip title="Copy to logs">
              <button className='rounded-md border border-white flex items-center h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150'>
                  <ContentCopyIcon sx={{ fontSize: 25, height: '2rem', width: '2rem' }}/>
              </button>
            </Tooltip> */}
            <div className='flex ml-2'>
              <div className='relative h-10 w-10'>
                <SpeedDial
                  ariaLabel="Log book actions"
                  sx={{ 
                    position: 'absolute',
                    bottom:0,
                    right: 0,
                    // top:0,
                    // left:0,
                    "& .MuiButtonBase-root:hover":{
                      background:"white",
                      color:"black",
                      border: 2,
                    },
                    "& .MuiButtonBase-root":{
                      color: "rgba(255,255,255,0.5)",
                      background:"black",
                      height: '2.5rem',
                      width: '2.5rem',
                      border: 2,
                    },
                  }}
                  icon={<SpeedDialIcon sx={{
                    marginBottom: '3px'
                    // color:'white',
                    // '&:hover':{
                    //   color:"black"
                    // },
                  }}
                  />}
                  // icon={<AddCircleOutlineIcon />}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                    />
                  ))}
                </SpeedDial>
              </div>
            </div>
        </div>
      </div>
    )
}