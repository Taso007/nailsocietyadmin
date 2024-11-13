import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './eventpage.css';
import Navbar from '../../../Navbar';
import Carousel from './carousel/Carousel';

function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null); 

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, 'events', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEvent(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <div>This event does not exist.</div>;

  return (
    <>
    <Navbar></Navbar>
    <div className='event-page'>
    <div className='event-info'>
      <h1 className='text-wrap text-break'>{event.title_eng}</h1>
      <p className='event-location text-wrap text-break'>{event.location_eng}</p>
      <p className='event-date text-wrap text-break'>{event.date}</p>
      <div className='event-description text-break text-wrap'>
        <p className='text-wrap text-break'>{event.description_eng}</p>
      </div>
    </div>
    <div className='event-info'>
      <h1 className='text-wrap text-break'>{event.title_geo}</h1>
      <p className='event-location text-wrap text-break'>{event.location_geo}</p>
      <p className='event-date text-wrap text-break'>{event.date}</p>
      <div className='event-description text-break text-wrap'>
        <p className='text-wrap text-break'>{event.description_geo}</p>
      </div>
    </div>
    <div className='event-header'>
      {event.file.length === 0 ? (
        <img src={event.file[0]} alt="carousel-img" />
      ) : (
        <Carousel imageArray={event.file} />
      )}
    </div>
    </div>   
    </>

  );
}

export default EventPage;
