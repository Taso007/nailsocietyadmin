import React, { useState } from 'react';
import Navbar from '../../../Navbar';
import './annualreports.css';
import ReportPopUp from './reportpopup/ReportPopUp';
import ReportCard from './reportcard/ReportCard';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import useChange from '../../../reusable/useChange';
import usePopup from '../../../reusable/usePopup';
 
function AnnualReports() {
  const [formData, setFormData] = useState({
    title_eng: '',
    title_geo: '',
    file_eng: null,  
    file_geo: null
  });
 
  const [reports, handleDelete] = useChange('reports');
  const { isPopupOpen, handleAddItem, handleClosePopup, handleChange } = usePopup(formData, setFormData); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const fileEngRef = ref(storage, `reports/${formData.file_eng.name}`);
      const fileGeoRef = ref(storage, `reports/${formData.file_geo.name}`);
      
      await uploadBytes(fileEngRef, formData.file_eng);
      const fileEngURL = await getDownloadURL(fileEngRef);
      
      await uploadBytes(fileGeoRef, formData.file_geo);
      const fileGeoURL = await getDownloadURL(fileGeoRef);
  
      await addDoc(collection(db, 'reports'), {
        title_eng: formData.title_eng,
        title_geo: formData.title_geo,
        file_eng: fileEngURL,
        file_geo: fileGeoURL,
        createdAt: new Date()
      });
  
      handleClosePopup();
      setFormData({
        title_eng: '',
        title_geo: '',
        file_eng: null,
        file_geo: null
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }; 

  return (
    <>
      <Navbar />
      <div className='reports-container container-xxl'>
        <div>
          <h1>Annual Reports</h1> 
        </div>
        <div className='mt-5 mb-5'>
        {reports.map((report) => (
            <ReportCard 
              key={report.id} 
              id={report.id} 
              title_eng={report.title_eng} 
              title_geo={report.title_geo}
              file_eng={report.file_eng} 
              file_geo={report.file_geo}
              handleDelete={() => handleDelete(report.id)}
            />
          ))}
        </div>
        <div>
          <button onClick={handleAddItem} className='addReport-but mb-5'>Add a report</button>
        </div>
      </div>
      {isPopupOpen && (
        <ReportPopUp 
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit} 
          handleClosePopup={handleClosePopup}
        />
      )}
    </>
  );
}

export default AnnualReports;
