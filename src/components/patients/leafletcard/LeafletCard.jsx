import React, {useState} from 'react';
import './leafletcard.css';
import DeletePopUp from '../../../reusable/delete/DeletePopUp';
import { useNavigate } from 'react-router-dom';

function LeafletCard({ id, category_eng, category_geo, title_eng, title_geo, file_eng, file_geo, handleDelete }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const goToEdit = () => {
    navigate(`/leaflets/${id}/edit`);
  }

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
 
export default LeafletCard;
  