import React, { useState } from 'react';
import Navbar from '../../../Navbar';
import './statutes.css';
import StatutesCard from './statutescard/StatutesCard';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import useChange from '../../../reusable/useChange';
import usePopup from '../../../reusable/usePopup';
import StatutesPopUp from './statutespopup/StatutesPopUp';

 
function Statutes() {
  const [formData, setFormData] = useState({
    title_eng: '',
    title_geo: '',
    file_eng: null,  
    file_geo: null
  });

  const [statutes, handleDelete] = useChange('statutes');
  const { isPopupOpen, handleAddItem, handleClosePopup, handleChange } = usePopup(formData, setFormData); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const fileEngRef = ref(storage, `statutes/${formData.file_eng.name}`);
      const fileGeoRef = ref(storage, `statutes/${formData.file_geo.name}`);
      
      await uploadBytes(fileEngRef, formData.file_eng);
      const fileEngURL = await getDownloadURL(fileEngRef);
      
      await uploadBytes(fileGeoRef, formData.file_geo);
      const fileGeoURL = await getDownloadURL(fileGeoRef);
  
      await addDoc(collection(db, 'statutes'), {
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
      <div className='statutes-container container-xxl'>
        <div>
          <h1>Statutes</h1> 
        </div>
        <div className='mt-5 mb-5'>
        {statutes.map((statute) => (
            <StatutesCard 
              key={statute.id} 
              id={statute.id} 
              title_eng={statute.title_eng} 
              title_geo={statute.title_geo}
              file_eng={statute.file_eng} 
              file_geo={statute.file_geo}
              handleDelete={() => handleDelete(statute.id)}
            />
          ))}
        </div>
        <div>
          <button onClick={handleAddItem} className='addStatutes-but mb-5'>Add a statute</button>
        </div>
      </div>
      {isPopupOpen && (
        <StatutesPopUp 
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit} 
          handleClosePopup={handleClosePopup}
        />
      )}
    </>
  );
}

export default Statutes;
