"use client";

import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import SendIcon from "@mui/icons-material/Send";

const NoteTaker = ({ notesVisible }) => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const noteSubmitHandler = () => {
    setNotes((prevNotes) => {
      const newNotes = [...prevNotes, note];
      localStorage.setItem("notes", JSON.stringify(newNotes));
      return newNotes;
    });
    setNote("");
  };
  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);
  return (
    <AnimatePresence>
      {notesVisible ? (
        <motion.div
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ type: "linear" }}
          className="rounded-lg absolute z-[1500] right-0 bottom-0 bg-white overflow-hidden"
        >
          <div className="h-[32rem] w-[26rem] rounded-lg bg-white flex flex-col p-2">
            <div className="w-full p-2 rounded-lg bg-black bg-opacity-70 text-center mb-2">
              NOTES
            </div>
            <div className="w-full h-full rounded-lg bg-black bg-opacity-40 mb-2 p-2 overflow-scroll">
              {notes.map((note) => (
                <div className="w-full bg-white bg-opacity-10 text-center p-2 rounded mb-2 break-words">
                  {note}
                </div>
              ))}
            </div>
            <div className="w-full rounded-lg p-2 bg-black bg-opacity-70 flex">
              <input
                type="text"
                className="border border-white p-2 border-opacity-40 bg-transparent outline-none focus:outline-none w-full mr-2"
                placeholder="Add A Note"
                onChange={(event) => setNote(event.target.value)}
                value={note}
              />
              <button
                className="border border-white rounded p-2 hover:bg-white hover:text-black transition ease-in-out delay-150"
                onClick={noteSubmitHandler}
              >
                <SendIcon sx={{ fontSize: 20 }} />
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
};

export default NoteTaker;
