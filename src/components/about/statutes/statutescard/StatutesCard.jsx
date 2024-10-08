import React from 'react';
import './statutescard.css';

function StatutesCard({ id, title_eng, title_geo, file_eng, file_geo, handleDelete }) {
  return (
    <div className='statutescard-container'>
      <div className='statutescard-content'>
        <div>
          <div className='text-wrap text-break'>
            {title_eng} 
          </div>
          <div className='text-wrap text-break'>
            {title_geo}
          </div>
        </div> 
        <div>
          <div>
            <a href={file_eng} target="_blank" rel="noopener noreferrer">View File</a>
          </div>
          <div>
            <a href={file_geo} target="_blank" rel="noopener noreferrer">ნახე ფაილი</a>
          </div>
        </div>
        <button onClick={() => handleDelete(id)} className='statutescardDelete-but'>
          Delete
        </button>
      </div>
    </div>
  ); 
}

export default StatutesCard;
 