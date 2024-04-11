// components/PDFGenerator.js

import jsPDF from 'jspdf';

const PDFGenerator = () => {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Hello world!', 10, 10);
    doc.save('example.pdf');
  };

  return (
    <div>
      <button className='text-white' onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default PDFGenerator;
