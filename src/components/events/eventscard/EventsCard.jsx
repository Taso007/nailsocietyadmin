import React from 'react';
import './eventscard.css';
import { useNavigate } from 'react-router-dom';
import { getFirstNCharacters } from '../../../reusable/utils';

function EventsCard({ id, category, title_eng, title_geo, location_eng, location_geo, date, file, description_eng, description_geo, handleDelete }) {
  const navigate = useNavigate();
 
  const handleClick = () => {
    navigate(`/event/${id}`);
  };
  
  return (
    <div className='eventscard-container'>
      <div className='eventscard-content'>
        <div>
         <div className='text-wrap text-break'>{category}</div>
        </div>
        <div tyle={{height: '65px'}}>
          <div className='text-wrap text-break'>{getFirstNCharacters(title_eng, 20)}</div>
          <div className='text-wrap text-break'>{getFirstNCharacters(title_geo, 20)}</div>
        </div>
        <div style={{height: '40px'}}>
          <div className='text-wrap text-break'>{getFirstNCharacters(location_eng, 130)}</div>
          <div className='text-wrap text-break'>{getFirstNCharacters(location_geo, 130)}</div>
        </div>
        <div className='text-wrap text-break' style={{height: '20px'}}>{date}</div>
        <div style={{height: '210px'}}>
          <div className='text-wrap text-break'>{getFirstNCharacters(description_eng, 155)}</div>
          <div className='text-wrap text-break'>{getFirstNCharacters(description_geo, 155)}</div>
        </div>
        <div style={{height: '195px'}}>
          <img src={file} className='eventscard-img' />
        </div>
        <div style={{height: '130px'}}>
          <button  onClick={handleClick} className='eventsCardReadMore-but'>
            Read more
          </button>
          <button onClick={() => handleDelete(id)} className='eventscardDelete-but'>
            Delete
          </button>
        </div>
      </div>
    </div>
  ); 
}

export default EventsCard;
 