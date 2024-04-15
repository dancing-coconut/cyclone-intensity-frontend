import { useState } from 'react';

const ImageUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/image/prediction', {
        method: 'POST',
        body: formData,
      });

      console.log('Response:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label for="main-btn" className="p-2 bg-white bg-opacity-50 rounded-lg hover:bg-opacity-100 transition ease-in-out delay-150 text-white hover:text-zinc-950 m-6">
      SELECT IMAGE
      <input 
        hidden
        type="file" 
        id="main-btn" 
        accept="image/*" 
        onChange={handleFileChange} 
      />
      </label>
      <button type="submit" className='p-1 bg-white bg-opacity-50 rounded-lg hover:bg-opacity-100 transition ease-in-out delay-150 text-white hover:text-zinc-950'>UPLOAD</button>
    </form>
  );
};

export default ImageUploadForm;
