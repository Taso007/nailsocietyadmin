import React, { useState } from 'react';
import './patients.css';
import Navbar from '../../Navbar';
import LeafletPopUp from './leafletpopup/LeafletPopUp';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import LeafletCard from './leafletcard/LeafletCard';
import useChange from '../../reusable/useChange';
import usePopup from '../../reusable/usePopup';

function Patients() {
  const [formData, setFormData] = useState({
    category_eng: '',
    category_geo: '',
    title_eng: '',
    title_geo: '',
    file_eng: null,
    file_geo: null 
  });

  const [leaflets, handleDelete] = useChange("leaflets");
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
  
      await addDoc(collection(db, 'leaflets'), {
        category_eng: formData.category_eng,
        category_geo: formData.category_geo,
        title_eng: formData.title_eng,
        title_geo: formData.title_geo,
        file_eng: fileEngURL,
        file_geo: fileGeoURL,
        createdAt: new Date()
      });
  
      handleClosePopup(); 
      setFormData({
        category_eng: '',
        category_geo: '',
        title_eng: '',
        title_geo: '',
        file_eng: null,
        file_geo: null
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const groupedLeaflets = leaflets.reduce((acc, leaflet) => {
    const category = `${leaflet.category_eng} / ${leaflet.category_geo}`;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(leaflet);
    return acc;
  }, {}); 

  return (
    <>
      <Navbar />
      <div className='leaflets-container container-xxl'>
        <div>
          <h1>Patients</h1>
        </div>
        <div className='mt-5 mb-5'>
          {Object.keys(groupedLeaflets).map((category) => (
            <div key={category}>
              <h2>{category}</h2>
              <div> 
                {groupedLeaflets[category].map((leaflet) => (
                  <LeafletCard 
                    key={leaflet.id} 
                    id={leaflet.id} 
                    category_eng={leaflet.category_eng}
                    category_geo={leaflet.category_geo}
                    title_eng={leaflet.title_eng}
                    title_geo={leaflet.title_geo} 
                    file_eng={leaflet.file_eng} 
                    file_geo={leaflet.file_geo} 
                    handleDelete={() => handleDelete(leaflet.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <button onClick={handleAddItem} className='addLeaflet-but mb-5'>Add a Leaflet</button>
        </div>
        {isPopupOpen && (
          <LeafletPopUp 
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit} 
            handleClosePopup={handleClosePopup}
          />
        )}
      </div>
    </>
  );
}

export default Patients;
