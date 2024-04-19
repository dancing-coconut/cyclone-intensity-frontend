"use client";
import { useState, useEffect } from "react";

export default function UploadBar({
  setOriginalImage,
  setIntensity,
  setPressure,
  setCategory,
}) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please select an image file");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/image/prediction/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setOriginalImage(data.original_img);
      setIntensity(data.wind);
      setPressure(data.pressure);
      setCategory(data.category);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex items-center text-white rounded-lg w-full bg-white bg-opacity-20 px-4 py-2 mt-6">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex flex-row w-full h-10">
          <label
            for="main-btn"
            className=" text-center flex flex-col justify-center bg-white bg-opacity-20 rounded-lg hover:bg-opacity-100 transition ease-in-out delay-150 text-white hover:text-zinc-950 w-1/2 h-full mr-4"
          >
            SELECT IMAGE
            <input
              hidden
              type="file"
              id="main-btn"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <button
            type="submit"
            className="border-0 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-100 transition ease-in-out delay-150 text-white hover:text-zinc-950 w-1/2"
          >
            UPLOAD
          </button>
        </div>
      </form>
    </div>
  );
}
