import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './leafletpage.css';
import Navbar from '../../../../Navbar';
import { useFormSubmit } from '../../../../reusable/useForm';
import usePopup from '../../../../reusable/usePopup';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";    

function LeafletPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leaflet, setleaflet] = useState(null); 
  const {handleChange} = usePopup(leaflet, setleaflet);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const leafletRef = doc(db, 'leaflets', id);
      const updatedData = { ...leaflet };
  
      if (leaflet.file_eng instanceof File) {
        const fileEngRef = ref(storage, `reports/${leaflet.file_eng.name}`);
        await uploadBytes(fileEngRef, leaflet.file_eng);
        const fileEngURL = await getDownloadURL(fileEngRef);
        updatedData.file_eng = fileEngURL;
      }
  
      if (leaflet.file_geo instanceof File) {
        const fileGeoRef = ref(storage, `reports/${leaflet.file_geo.name}`);
        await uploadBytes(fileGeoRef, leaflet.file_geo);
        const fileGeoURL = await getDownloadURL(fileGeoRef);
        updatedData.file_geo = fileGeoURL;
      }
  
      await updateDoc(leafletRef, updatedData);
      navigate('/patients');
    } catch (error) {
      console.error("Error updating leaflet: ", error);
      alert("Failed to update leaflet. Please try again.");
    }
  };
  

  const { loading, handleFormSubmit } = useFormSubmit(handleSubmit);
  

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, 'leaflets', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setleaflet(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchEvent();
  }, [id]);

  if (!leaflet) return <div>This Leaflet does not exist.</div>;

  const backToleaflets = () => {
    navigate('/patients');
  }

  return (
    <div>
      <Navbar></Navbar>
      <form onSubmit={handleFormSubmit} className='leafletpage-container'>
        <h1 className='text-wrap text-break'>Edit leaflet</h1>
        <h3 className='mt-3'>English</h3>
        <div>
          <label>Category: </label>
          <div>
            <input 
              type="text" 
              name="category_eng"  
              value={leaflet.category_eng} 
              onChange={handleChange} 
              required 
              className='addInput'
            />
          </div>
        </div>
        <div>
          <label>Title:</label>
            <div> 
              <input 
                type="text" 
                name="title_eng" 
                value={leaflet.title_eng} 
                onChange={handleChange} 
                required 
                className='addInput'
              />
            </div>
        </div>
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
        <h3 className='mt-3'>ქართული</h3>
        <div> 
          <label>კატეგორია:</label>
          <div>
            <input 
              type="text" 
              name="category_geo"  
              value={leaflet.category_geo} 
              onChange={handleChange} 
              required 
              className='addInput'
            />
          </div>
        </div>
        <div>
          <label>სათაური:</label>
          <div> 
            <input 
              type="text" 
              name="title_geo" 
              value={leaflet.title_geo} 
              onChange={handleChange} 
              required 
              className='addInput'
            />
          </div>
        </div>
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
        <div className='leafletpage-button-container'>
          <div>
            <button type='submit' className='saveEdit-button' disabled={loading}>{loading ? "Updating..." : "Save"}</button>
          </div>
          <div>
            <button className='cancelEdit-button' onClick={backToleaflets}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LeafletPage;