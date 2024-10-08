import React from 'react';
import './leafletcard.css';

function LeafletCard({ id, category_eng, category_geo, title_eng, title_geo, file_eng, file_geo, handleDelete }) {
  return (
    <div className='leafletcard-container'>
      <div className='leafletcard-content'>
        <div>
         <div className='text-wrap text-break'>{category_eng}</div>
         <div className='text-wrap text-break'>{category_geo}</div>
        </div>
        <div>
         <div className='text-wrap text-break'>{title_eng}</div>
         <div className='text-wrap text-break'>{title_geo}</div>
        </div>
        <div>
          <div><a href={file_eng} target="_blank" rel="noopener noreferrer">View File</a></div>
          <div><a href={file_geo} target="_blank" rel="noopener noreferrer">ნახე ფაილი</a></div>
        </div>
        <button onClick={() => handleDelete(id)} className='leafletcardDelete-but'>
          Delete 
        </button>
      </div>
    </div>
  );
}

export default LeafletCard;
  