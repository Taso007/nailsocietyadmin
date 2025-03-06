import React, {useState} from 'react';
import './reportcard.css';
import DeletePopUp from '../../../../reusable/delete/DeletePopUp';
 
function ReportCard({ id, title_eng, title_geo, file_eng, file_geo, handleDelete }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className='reportcard-container'>
      <div className='reportcard-content'>
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
        <button onClick={() => setIsPopupOpen(true)} className='reportcardDelete-but'>
          Delete
        </button>
      </div>
      {isPopupOpen && <DeletePopUp handleDelete={() => {handleDelete(id)}} onClose={() => setIsPopupOpen(false)} />}
    </div>
  ); 
}

export default ReportCard;
 