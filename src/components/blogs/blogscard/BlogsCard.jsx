import React from 'react';
import './blogscard.css';
import { useNavigate } from 'react-router-dom';
import { getFirstNCharacters } from '../../../reusable/utils';

function BlogsCard({ id, title_eng, title_geo, file, description_eng, description_geo, handleDelete }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className='blogscard-container'>
      <div className='blogscard-content'>
        <h4 style={{height: '65px'}}>
          <div className='text-wrap text-break'>{title_eng}</div>
          <div className='text-wrap text-break'>{title_geo}</div>
        </h4>
        <div style={{height: '260px'}}>
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
          <button onClick={() => handleDelete(id)} className='blogscardDelete-but '>
            Delete
          </button>
        </div>
      </div>
    </div>
  ); 
}

export default BlogsCard;
