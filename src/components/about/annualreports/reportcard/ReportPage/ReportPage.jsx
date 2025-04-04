import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './reportpage.css';
import Navbar from '../../../../../Navbar';
import { useFormSubmit } from '../../../../../reusable/useForm';
import usePopup from '../../../../../reusable/usePopup';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";    

function ReportPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setreport] = useState(null); 
  const {handleChange} = usePopup(report, setreport);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const reportRef = doc(db, 'reports', id);
      const updatedData = { ...report };
  
      if (report.file_eng instanceof File) {
        const fileEngRef = ref(storage, `reports/${report.file_eng.name}`);
        await uploadBytes(fileEngRef, report.file_eng);
        const fileEngURL = await getDownloadURL(fileEngRef);
        updatedData.file_eng = fileEngURL;
      }
  
      if (report.file_geo instanceof File) {
        const fileGeoRef = ref(storage, `reports/${report.file_geo.name}`);
        await uploadBytes(fileGeoRef, report.file_geo);
        const fileGeoURL = await getDownloadURL(fileGeoRef);
        updatedData.file_geo = fileGeoURL;
      }
  
      await updateDoc(reportRef, updatedData);
      navigate('/annualReports');
    } catch (error) {
      console.error("Error updating report: ", error);
      alert("Failed to update report. Please try again.");
    }
  };
  

  const { loading, handleFormSubmit } = useFormSubmit(handleSubmit);
  

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, 'reports', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setreport(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchEvent();
  }, [id]);

  if (!report) return <div>This report does not exist.</div>;

  const backToreport = () => {
    navigate('/annualReports');
  }

  return (
    <div>
      <Navbar></Navbar>
      <form onSubmit={handleFormSubmit} className='reportpage-container'>
        <h1 className='text-wrap text-break'>Edit report</h1>
        <h3 className='mt-3'>English</h3>
        <div>
          <label>File:</label>
          <div>
            <input 
              type="file" 
              name="file_eng" 
              onChange={handleChange}
              accept="application/pdf" 
              className='addInput fileInput'
            />
          </div>
        </div>
        <div>
          <label>Title:</label>
            <div> 
              <input 
                type="text" 
                name="title_eng" 
                value={report.title_eng} 
                onChange={handleChange} 
                required 
                className='addInput'
              />
            </div>
        </div>
        <h3 className='mt-3'>ქართული</h3>
        <div>
          <label>ფაილი:</label>
          <div>
            <input 
              type="file" 
              name="file_geo" 
              onChange={handleChange}
              accept="application/pdf" 
              className='addInput fileInput'
            />
          </div>
        </div>
        <div>
          <label>სათაური:</label>
          <div> 
            <input 
              type="text" 
              name="title_geo" 
              value={report.title_geo} 
              onChange={handleChange} 
              required 
              className='addInput'
            />
          </div>
        </div>
        <div className='reportpage-button-container'>
          <div>
            <button type='submit' className='saveEdit-button' disabled={loading}>{loading ? "Updating..." : "Save"}</button>
          </div>
          <div>
            <button className='cancelEdit-button' onClick={backToreport}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ReportPage;