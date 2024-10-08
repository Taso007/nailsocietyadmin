import React from 'react';
import './membercard.css';
import pfp from '../../../../imgs/blank-profile-picture-973460_640.webp';

function MemberCard({ id, name_eng, name_geo, description_eng, description_geo, file, handleDelete }) {

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
        <button onClick={() => handleDelete(id, file)} className='membercardDelete-but'>
          Delete
        </button> 
      </div>
    </div> 
  );
}

export default MemberCard;
