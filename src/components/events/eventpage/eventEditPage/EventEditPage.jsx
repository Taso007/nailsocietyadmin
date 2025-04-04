import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './eventeditpage.css';
import Navbar from '../../../../Navbar';
import { useFormSubmit } from '../../../../reusable/useForm';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";    

function EventEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setevent] = useState(null); 

  function handleChange(event) {
    const { name, files, value } = event.target;
  
    if (name === 'file') {
      setevent(prevData => ({
        ...prevData,
        file: [...(prevData.file || []), ...Array.from(files)]
      }));
    } else {
      setevent(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const eventRef = doc(db, 'events', id);
      const updatedData = { ...event };
  
      const oldImageUrls = (event.file || []).filter(f => typeof f === 'string');
      const newFiles = (event.file || []).filter(f => f instanceof File);
      const newImageUrls = [];
  
      for (const file of newFiles) {
        const storageRef = ref(storage, `events/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        newImageUrls.push(downloadURL);
      }
  
      updatedData.file = [...oldImageUrls, ...newImageUrls];
  
      await updateDoc(eventRef, updatedData);
      navigate('/events');
    } catch (error) {
      console.error("Error updating event: ", error);
      alert("Failed to update event. Please try again.");
    }
  };
  
  const { loading, handleFormSubmit } = useFormSubmit(handleSubmit);
  

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, 'events', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setevent(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <div>This event does not exist.</div>;

  const backToevents = () => {
    navigate('/events');
  }

  return (
    <div>
      <Navbar></Navbar>
      <form onSubmit={handleFormSubmit} className='eventpage-container'>
        <h1 className='text-wrap text-break'>Edit event</h1>
        <div>
          <label>Category / კატეგორია:</label>
          <div>
            <select 
              name="category" 
              value={event.category} 
              onChange={handleChange} 
              required 
              className='form-select addInput'
            >
              <option value="">Select a category / აირჩიეთ კატეგორია</option>
              <option value="Congress / კონგრესი">Congress / კონგრესი</option>
              <option value="symposium / სიმპოზიუმი">symposium / სიმპოზიუმი</option>
            </select> 
          </div>
        </div>
        <div>
          <div>
           <label>Image / სურათი:</label>
          </div>
          <div className='eventpage-img-container'>
            <div className='eventpage-multiple-img'>
              {event.file.length === 1 ? (
              <div className='eventpage-img-withdelete'> 
               <img src={event.file[0]} alt="carousel-img" className='eventpage-img'/>
                <button className='delete-button' onClick={() => {
                  const updatedFiles = [...event.file];
                  updatedFiles.splice(index, 1);
                  setevent({ ...event, file: updatedFiles });
                }}>Delete</button>
                </div>
              ) : (
                event.file.map((img, index) => (
                  <div className='eventpage-img-withdelete'> 
                    <img key={index} src={img} alt={`carousel-img-${index}`} className='eventpage-img' />
                    <button className='delete-button' onClick={() => {
                      const updatedFiles = [...event.file];
                      updatedFiles.splice(index, 1);
                      setevent({ ...event, file: updatedFiles });
                    }}>Delete</button>
                  </div>))
                )}
            </div>
            <div className='eventpage-img-input'>
              <input
                type="file" 
                name="file" 
                onChange={handleChange}
                accept="image/*" 
                multiple
                className='addInput'
              />
            </div>
          </div>
        </div>
        <div>
        <label>Date / თარიღი:</label>
          <div>
            <input 
              type="date" 
              name="date" 
              value={event.date} 
              onChange={handleChange} 
              required 
              className='form-control addInput' 
            />
          </div>
        </div>
        <h3 className='mt-3'>English</h3>
        <div> 
          <label>Title: </label>
          <div>
            <input 
              type="text" 
              name="title_eng" 
              value={event.title_eng} 
              onChange={handleChange}
              required 
              className='addInput'
            />
          </div>
        </div>
        <div>
          <label>Location:</label>
          <div>
            <input 
              type="text" 
              name="location_eng" 
              value={event.location_eng} 
              onChange={handleChange} 
              required 
              className='addInput'
            />
          </div>
        </div>
        <div>
          <label>Description: </label>
          <div>
            <textarea 
              type="text" 
              name="description_eng" 
              value={event.description_eng} 
              onChange={handleChange} 
              required 
              className='addInput auto-height text-wrap text-break'
            />
          </div>
        </div>
        <h3 className='mt-3'>ქართული</h3>
        <div> 
          <label>სათაური:</label>
          <div>
            <input 
              type="text" 
              name="title_geo" 
              value={event.title_geo} 
              onChange={handleChange}
              required 
              className='addInput'
            />
          </div>
        </div>
        <div>
          <label>მდებარეობა:</label>
          <div>
            <input 
              type="text" 
              name="location_geo" 
              value={event.location_geo} 
              onChange={handleChange} 
              required 
              className='addInput'
            />
          </div>  
        </div>
        <div>
          <label>დახასიათება:</label>
          <div>
            <textarea   
              type="text" 
              name="description_geo" 
              value={event.description_geo} 
              onChange={handleChange}
              required 
              className='addInput auto-height text-wrap text-break'
            />
          </div>
        </div>
        <div className='eventpage-button-container'>
          <div>
            <button type='submit' className='saveEdit-button' disabled={loading}>{loading ? "Updating..." : "Save"}</button>
          </div>
          <div>
            <button className='cancelEdit-button' onClick={backToevents}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EventEditPage;