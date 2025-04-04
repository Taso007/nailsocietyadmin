import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './statutespage.css';
import Navbar from '../../../../../Navbar';
import { useFormSubmit } from '../../../../../reusable/useForm';
import usePopup from '../../../../../reusable/usePopup';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";    

function StatutesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [statutes, setstatutes] = useState(null); 
  const {handleChange} = usePopup(statutes, setstatutes);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const statutesRef = doc(db, 'statutes', id);
      const updatedData = { ...statutes };
  
      if (statutes.file_eng instanceof File) {
        const fileEngRef = ref(storage, `reports/${statutes.file_eng.name}`);
        await uploadBytes(fileEngRef, statutes.file_eng);
        const fileEngURL = await getDownloadURL(fileEngRef);
        updatedData.file_eng = fileEngURL;
      }
  
      if (statutes.file_geo instanceof File) {
        const fileGeoRef = ref(storage, `reports/${statutes.file_geo.name}`);
        await uploadBytes(fileGeoRef, statutes.file_geo);
        const fileGeoURL = await getDownloadURL(fileGeoRef);
        updatedData.file_geo = fileGeoURL;
      }
  
      await updateDoc(statutesRef, updatedData);
      navigate('/statutes');
    } catch (error) {
      console.error("Error updating statutes: ", error);
      alert("Failed to update statutes. Please try again.");
    }
  };
  

  const { loading, handleFormSubmit } = useFormSubmit(handleSubmit);
  

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, 'statutes', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setstatutes(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchEvent();
  }, [id]);

  if (!statutes) return <div>This statutes does not exist.</div>;

  const backTostatutes = () => {
    navigate('/statutes');
  }

  return (
    <div>
      <Navbar></Navbar>
      <form onSubmit={handleFormSubmit} className='statutespage-container'>
        <h1 className='text-wrap text-break'>Edit statutes</h1>
        <h3 className='mt-3'>English</h3>
        <div>
          <label>File:</label>
          <div>
            <input 
              type="file" 
              name="file_eng" 
              onChange={handleChange}
              accept="application/pdf" 
              required 
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
                value={statutes.title_eng} 
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
              required 
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
              value={statutes.title_geo} 
              onChange={handleChange} 
              required 
              className='addInput'
            />
          </div>
        </div>
        <div className='statutespage-button-container'>
          <div>
            <button type='submit' className='saveEdit-button' disabled={loading}>{loading ? "Updating..." : "Save"}</button>
          </div>
          <div>
            <button className='cancelEdit-button' onClick={backTostatutes}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default StatutesPage;