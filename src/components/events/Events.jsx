import React, { useState } from 'react';
import Navbar from '../../Navbar';
import './events.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import EventsPopUp from './eventspopup/EventsPopUp';
import EventsCard from './eventscard/EventsCard';
import useChange from '../../reusable/useChange';
import usePopup from '../../reusable/usePopup';

function Events() { 
  const [formData, setFormData] = useState({
    category: '',
    date: null, 
    file: [],
    title_eng: '', 
    title_geo: '', 
    location_eng: '',
    location_geo: '', 
    description_eng: '',
    description_geo: ''
  });

  const [events, handleDelete] = useChange('events');
  const { isPopupOpen, handleAddItem, handleClosePopup } = usePopup(formData, setFormData);

  function handleChange(event) {
    const { name, files } = event.target;
  
    if (name === 'file') {
      setFormData(prevData => ({
        ...prevData,
        [name]: Array.from(files) 
      }));
    } else {
      const { value } = event.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const uploadedFilesURLs = [];
  
      // Loop through each file in formData.file and upload it
      for (let file of formData.file) {
        const storageRef = ref(storage, `events/${file.name}`);
        await uploadBytes(storageRef, file);
        const fileURL = await getDownloadURL(storageRef);
        uploadedFilesURLs.push(fileURL); // Store the uploaded file URL
      }
  
      // Add the event to Firestore with the list of image URLs
      await addDoc(collection(db, 'events'), {
        category: formData.category,
        date: formData.date,
        file: uploadedFilesURLs, // Store the list of file URLs
        title_eng: formData.title_eng,
        title_geo: formData.title_geo,
        location_eng: formData.location_eng,
        location_geo: formData.location_geo,
        description_eng: formData.description_eng,
        description_geo: formData.description_geo,
        createdAt: new Date()
      });
  
      handleClosePopup();
      setFormData({
        category: '',
        date: null,
        file: [],
        title_eng: '',
        title_geo: '',
        location_eng: '',
        location_geo: '',
        description_eng: '',
        description_geo: ''
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  

  const groupedEvents = events.reduce((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = [];
    }
    acc[event.category].push(event);
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <div className='events-container container-xxl'>
        <div>
          <h1>Events</h1>
        </div>
        {Object.keys(groupedEvents).map((category) => (
          <div key={category} className='mt-5 mb-5'>
            <h2 className='category-title'>{category}</h2>
            <div className='row'>
              {groupedEvents[category].map((event) => (
                <div  className='col-md-4 mt-3' key={event.id}>
                  <EventsCard 
                    key={event.id} 
                    id={event.id} 
                    category={event.category}
                    title_eng={event.title_eng} 
                    title_geo={event.title_geo} 
                    location_eng={event.location_eng}
                    location_geo={event.location_geo}
                    date={event.date}
                    file={event.file}
                    description_eng={event.description_eng}
                    description_geo={event.description_geo}  
                    handleDelete={() => handleDelete(event.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div>
          <button onClick={handleAddItem} className='addEvent-but mb-5'>Add an Event</button>
        </div>
        {isPopupOpen && (
          <EventsPopUp 
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

export default Events;
