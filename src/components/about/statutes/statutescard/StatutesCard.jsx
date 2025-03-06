import React, {useState} from 'react';
import './statutescard.css';
import DeletePopUp from '../../../../reusable/delete/DeletePopUp';
 
function StatutesCard({ id, title_eng, title_geo, file_eng, file_geo, handleDelete }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
        <button onClick={() => setIsPopupOpen(true)}className='statutescardDelete-but'>
          Delete
        </button>
      </div>
      {isPopupOpen && <DeletePopUp handleDelete={() => {handleDelete(id)}} onClose={() => setIsPopupOpen(false)} />}
    </div>
  ); 
}

export default StatutesCard;
 