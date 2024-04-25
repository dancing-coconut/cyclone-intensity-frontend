"use client";

import { useEffect, useState } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import NavBar from "../components/NavBar";
import PictureBar from "../components/PictureBar";
import MiniChatbot from "../components/MiniChatbot";
import UploadBar from "../components/UploadBar";
import CustomPredictionBar from "../components/CustomPredictionBar";
import NoteTaker from "../components/NoteTaker";

const Upload = () => {
  const [visible, setVisible] = useState(false);
  const [notesVisible, setNotesVisible] = useState(false);

  const [intensity, setIntensity] = useState(20);
  const [pressure, setPressure] = useState(20);
  const [originalImage, setOriginalImage] = useState("/cyclone.jpg");
  const [processedImage, setProcessedImage] = useState("/cyclone.jpg");
  const [category, setCategory] = useState(10);
  const [tNumber, setTNumber] = useState("1.0 - 3.5");
  const [data, setData] = useState();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  function createData(t_number, categories) {
    return { t_number, categories };
  }

  const rows = [
    createData("1.0 - 3.5", "Category 0"),
    createData("4.0 - 4.5", "Category 1"),
    createData("5.0", "Category 2"),
    createData("5.5", "Category 3"),
    createData("6.0 - 6.5", "Category 4"),
    createData("7.0 - 8.0", "Category 5"),
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div
        className="bg-black flex items-center p-6 h-screen w-screen"
        onClick={() => {
          setNotesVisible(false);
          setVisible(false);
        }}
      >
        <NavBar
          setVisible={setVisible}
          visible={visible}
          setNotesVisible={setNotesVisible}
          notesVisible={notesVisible}
        />
        <div className="flex items-center rounded-lg h-full w-full">
          <div className="flex flex-col h-full">
            <div className="flex-none h-30 bg-white bg-opacity-20 rounded-lg text-white text-center p-2 w-80 mb-4 mr-6">
              DVORAK SCALE
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg w-80 mr-6">
              <Table sx={{ color: "white" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                      T-Number
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Category
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.t_number}
                      sx={
                        row.categories === "Category " + category.toString()
                          ? {
                              "&:last-child td, &:last-child th": { border: 0 },
                              color: "black",
                              backgroundColor: "white",
                            }
                          : {
                              "&:last-child td, &:last-child th": { border: 0 },
                              color: "white",
                            }
                      }
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ color: "grey" }}
                      >
                        {row.t_number}
                      </TableCell>
                      <TableCell align="right" sx={{ color: "grey" }}>
                        {row.categories}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex flex-col h-full mt-6 rounded-lg w-80 mr-6 text-center overflow-scroll">
              <div className="p-2 w-full rounded-lg mb-6 bg-white bg-opacity-20">
                ABOUT CATEGORY
              </div>
              <div className="flex flex-col h-full w-full p-4 rounded-lg overflow-hidden bg-white bg-opacity-15">
                <div className="w-full rounded-lg overflow-auto">
                  {category == "0"
                    ? "This category represents the initial stage of a tropical cyclone's development. At this stage, satellite imagery may show a poorly organized system with minimal cloud cover and weak circulation. While it may not pose an immediate threat, it serves as an early indication of potential cyclone formation, prompting meteorologists to closely monitor its development."
                    : ""}
                  {category == "1"
                    ? "In this stage, the cyclone begins to intensify as its structure becomes more organized. Cloud bands become more pronounced, and a central dense overcast (CDO) may develop, indicating stronger convection near the center. Although still relatively weak, the storm poses a growing risk to coastal areas as it continues to strengthen."
                    : ""}
                  {category == "2"
                    ? "At this stage, the cyclone undergoes further intensification. The central dense overcast becomes more symmetric, and spiral rainbands wrap tighter around the center. Deep convection intensifies near the core, fueling rapid pressure falls and strengthening winds. While not yet considered a major hurricane, the storm poses a significant threat to coastal regions."
                    : ""}
                  {category == "3"
                    ? "This stage marks a significant increase cyclone intensity. The central dense overcast becomes well-defined, with a clear eye possibly forming at the center. Spiral rainbands extend farther from the core, producing intense rainfall and gusty winds over a wide area. Storm surge becomes a major concern, particularly in low-lying coastal areas, as the cyclone approaches land."
                    : ""}
                  {category == "4"
                    ? "In this stage, the cyclone reaches its peak intensity. The central dense overcast becomes highly organized, with a distinct eye surrounded by a ring of deep convection. Spiral rainbands extend across a vast area, bringing torrential rainfall and destructive winds to coastal regions. Storm surge reaches its maximum height, inundating coastal communities."
                    : ""}
                  {category == "5"
                    ? "This category represents the weakening phase of a tropical cyclone as it moves over cooler waters or encounters unfavorable atmospheric conditions. Sustained winds gradually decrease, and the central dense overcast begins to deteriorate, with the eye becoming less defined. While the storm's intensity diminishes, it can still produce hazardous conditions."
                    : ""}
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col items-center rounded-lg h-full w-full">
            <PictureBar original={originalImage} processed={processedImage} />
            <CustomPredictionBar
              windIntensity={intensity}
              windPressure={pressure}
              windCategory={category}
            />
            <UploadBar
              setOriginalImage={setOriginalImage}
              setIntensity={setIntensity}
              setPressure={setPressure}
              setCategory={setCategory}
            />
            <MiniChatbot visible={visible} />
            <NoteTaker notesVisible={notesVisible} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Upload;
