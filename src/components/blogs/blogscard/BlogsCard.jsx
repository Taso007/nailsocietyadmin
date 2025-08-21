import React, {useState} from 'react';
import './blogscard.css';
import { useNavigate } from 'react-router-dom';
import { getFirstNCharacters } from '../../../reusable/utils';
import DeletePopUp from '../../../reusable/delete/DeletePopUp';

function BlogsCard({ id, title_eng, title_geo, file, description_eng, description_geo, handleDelete }) {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClick = () => {
    navigate(`/blog/${id}`);
  }; 
 
  return (
    <div className='blogscard-container'>
      <div className='blogscard-content'>
        <h5 style={{height: '90px'}}>
          <div className='text-wrap text-break'>{getFirstNCharacters(title_eng, 60)}</div>
          <div className='text-wrap text-break'>{getFirstNCharacters(title_geo, 60)}</div>
        </h5>
        <div style={{height: '240px'}}>
          <div className='text-wrap text-break'>{getFirstNCharacters(description_eng, 170)}</div>
          <div className='text-wrap text-break'>{getFirstNCharacters(description_geo, 170)}</div>
        </div>
        <div style={{height: '195px'}}>
          <img src={file} className='blogscard-img' alt='Blog' />
        </div>
        <div style={{height: '130px'}}>
          <button onClick={handleClick} className='blogsCardReadMore-but '>
            Read more
          </button>
          <button onClick={() => setIsPopupOpen(true)} className='blogscardDelete-but '>
            Delete
          </button>
        </div>
      </div>
      {isPopupOpen && <DeletePopUp handleDelete={() => {handleDelete(id)}} onClose={() => setIsPopupOpen(false)} />}
    </div>
  ); 
}

export default BlogsCard;
