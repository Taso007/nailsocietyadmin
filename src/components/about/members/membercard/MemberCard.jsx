import React, {useState} from 'react';
import './membercard.css';
import pfp from '../../../../imgs/blank-profile-picture-973460_640.webp';
import DeletePopUp from '../../../../reusable/delete/DeletePopUp';

function MemberCard({ id, name_eng, name_geo, description_eng, description_geo, file, handleDelete }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // doing it right now
  // const goToEdit = () => {
  //   window.location.href = `/members/${id}`; 
  // }

  return (
    <div className='membercard-container'>
      <div className='membercard-content'>
        <div>
          <img src={file || pfp} alt={`${name_eng}'s profile`} className='membercard-img' />
        </div>
        <div>
          <div className='text-wrap text-break'>{name_eng}</div>
          <div className='text-wrap text-break'>{name_geo}</div>
          
        </div>
        <div>
         <div className='text-wrap text-break'>{description_eng}</div>
          <div className='text-wrap text-break'>{description_geo}</div>
        </div>
        {/* doing the edit button right now
        <button onClick={() => goToEdit()}>Edit</button> */}
        <button onClick={() => setIsPopupOpen(true)} className='membercardDelete-but'>
          Delete
        </button> 
      </div>
      {isPopupOpen && <DeletePopUp handleDelete={() => {handleDelete(id, file)}} onClose={() => setIsPopupOpen(false)} />}
    </div> 
  );
}

export default MemberCard;
