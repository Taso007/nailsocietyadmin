import React, {useState} from 'react';
import './statutescard.css';
import DeletePopUp from '../../../../reusable/delete/DeletePopUp';
import { useNavigate } from 'react-router-dom';
 
function StatutesCard({ id, title_eng, title_geo, file_eng, file_geo, handleDelete }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const goToEdit = () => {
    navigate(`/statutes/${id}/edit`);
  }

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
        <div className='membercard-btns'>
          <button onClick={() => goToEdit()} className='membercardCancel-but'>Edit</button>
          <button onClick={() => setIsPopupOpen(true)} className='membercardDelete-but'>
            Delete
          </button>
        </div>
      </div>
      {isPopupOpen && <DeletePopUp handleDelete={() => {handleDelete(id)}} onClose={() => setIsPopupOpen(false)} />}
    </div>
  ); 
}

export default StatutesCard;
 