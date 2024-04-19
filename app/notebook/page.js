"use client";

import { useEffect, useState } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import NavBar from "../components/NavBar";
import Tiptap from "../components/Tiptap";
import jsPDF from "jspdf";

import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PrintIcon from "@mui/icons-material/Print";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IconButton } from "@mui/material";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Tooltip from "@mui/material/Tooltip";

const Notebook = () => {
  const [visible, setVisible] = useState(false);
  const [editor, setEditor] = useState();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [data, setData] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const handleDeleteLog = (key) => {
    setData((prevData) => {
      const newData = { ...prevData };
      delete newData[key];
      localStorage.setItem("data", JSON.stringify(newData));
      return newData;
    });
  };

  const handleNoteTransfer = (key) => {
    editor.commands.insertContent(`${key} : ${data[key]}\n`);
  };

  const handleEditorRender = (editorObject) => {
    setEditor(editorObject);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    // const htmlString = "<h1 style='color: black;'>Hello, world!</h1><p style='color: black;'>This is a sample HTML string with black text.</p>";
    const htmlString =
      "<div style='color: black; font-size: 6px;'>" +
      (editor ? editor.getHTML() : "") +
      "</div>";
    console.log(htmlString);

    // doc.html(htmlString).then(() => doc.save('fileName.pdf'));

    doc.html(htmlString, {
      callback: () => {
        // Save the PDF
        doc.save("chakravaat.pdf");
      },
    });

    // doc.fromHTML('<h1>Hello world!</h1>', 10, 10);
    // doc.save('example.pdf');
  };

  const printPage = () => {
    window.print();
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(editor ? editor.getText() : "")
      .then(() => {
        toast.success("Text copied to clipboard!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error("Failed To Copy To Clipboard!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.error("Error copying text: ", error);
      });
  };

  const clearDocument = () => {
    if (editor) {
      editor.commands.clearContent();
    }
  };

  // const actions = [
  //   { icon: <IconButton onClick={generatePDF}><FileCopyIcon /></IconButton>, name: 'Download' },
  //   { icon: <IconButton onClick={printPage}><PrintIcon /></IconButton>, name: 'Print' },
  //   { icon: <SaveIcon />, name: 'Print' },
  //   { icon: <ShareIcon />, name: 'Share' },
  // ];
  const actions = [
    {
      icon: (
        <IconButton onClick={generatePDF}>
          <DownloadIcon />
        </IconButton>
      ),
      name: "Download",
    },
    {
      icon: (
        <IconButton onClick={printPage}>
          <PrintIcon />
        </IconButton>
      ),
      name: "Print",
    },
    {
      icon: (
        <IconButton onClick={copyToClipboard}>
          <ContentCopyIcon />
        </IconButton>
      ),
      name: "Copy",
    },
    {
      icon: (
        <IconButton onClick={clearDocument}>
          <HighlightOffIcon />
        </IconButton>
      ),
      name: "Clear",
    },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ToastContainer />
      <div className="bg-black flex items-center p-6 h-screen w-screen">
        <NavBar setVisible={setVisible} visible={visible} />
        <div className="flex items-center rounded-lg h-full w-full">
          <div className="flex flex-col h-full">
            <div className="h-30 bg-white bg-opacity-20 rounded-lg text-white text-center p-2 w-96 mb-4 mr-6">
              NOTED LOGS
            </div>
            <div className="bg-white h-full bg-opacity-10 rounded-lg w-96 mr-6 overflow-scroll p-4 text-center">
              {Object.keys(data).length === 0 ? (
                <div className="opacity-30 w-full border border-white rounded-lg p-2">
                  There are no logs yet!
                </div>
              ) : (
                ""
              )}
              {Object.entries(data).map(([key, value]) => (
                <div className="flex flex-row rounded-lg border border-white p-2 border-opacity-20 mb-4">
                  <div className="flex flex-row">
                    <div className="w-full bg-white bg-opacity-20 text-white rounded-md text-center p-2 mr-2">
                      {key} : {value}
                    </div>
                    <button
                      className="rounded-md border border-white flex items-center h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150 mr-2"
                      onClick={() => handleNoteTransfer(key)}
                    >
                      <Tooltip title="Copy To Editor">
                        <ExitToAppIcon />
                      </Tooltip>
                    </button>
                    <button
                      className="rounded-md border border-white flex items-center h-10 w-10 opacity-50 p-0.5 hover:opacity-100 transition ease-in-out delay-150"
                      onClick={() => handleDeleteLog(key)}
                    >
                      <Tooltip title="Remove From Logs">
                        <DeleteIcon />
                      </Tooltip>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex flex-col items-center rounded-lg h-full w-full bg-white bg-opacity-10 rounded-lg">
            <Tiptap onEditorRender={handleEditorRender} className="w-full" />
            <SpeedDial
              ariaLabel="Log book actions"
              sx={{
                position: "absolute",
                bottom: 40,
                right: 40,
                "& .MuiButtonBase-root:hover": {
                  background: "black",
                  opacity: 1.0,
                },
                "& .MuiButtonBase-root": {
                  background: "black",
                  opacity: 0.5,
                },
              }}
              icon={
                <SpeedDialIcon
                  sx={{
                    color: "white",
                    marginBottom: "3px",
                  }}
                />
              }
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
    </ThemeProvider>
  );
};

export default Notebook;
