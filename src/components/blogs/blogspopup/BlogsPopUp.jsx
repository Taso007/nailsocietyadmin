import React from 'react';
import '../../../reusable/popup.css';
import { useFormSubmit } from '../../../reusable/useForm';

function BlogsPopUp({ formData, handleChange, handleSubmit, handleClosePopup }) {
  const { loading, handleFormSubmit } = useFormSubmit(handleSubmit);

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-button" onClick={handleClosePopup}>X</button>
        <h2>Add a New Blog / დაამატე ახალი ბლოგი</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Image / სურათი:</label>
            <div>
            <input 
              type="file" 
              name="file" 
              onChange={handleChange} 
              accept="image/*" 
              required  
              className='addInput fileInput'
            /> 
            </div>
          </div> 
          <h3 className='mt-3'>English</h3> 
          <div> 
            <label>Title:</label>
            <div>
              <input 
                type="text" 
                name="title_eng" 
                value={formData.title_eng} 
                onChange={handleChange} 
                required 
                className='addInput'
              />
            </div>
          </div>
          <div>
            <label>Description:</label>
            <div>
              <textarea
                type="text" 
                name="description_eng" 
                value={formData.description_eng} 
                onChange={handleChange} 
                required 
                className='addInput'
              />
            </div>
            <h3 className='mt-3'>ქართული</h3>
            <label>სათაური:</label>
            <div>
              <input 
                type="text" 
                name="title_geo" 
                value={formData.title_geo} 
                onChange={handleChange} 
                required 
                className='addInput'
              />
            </div>
          </div>
          <div>
            <label>დახასიათება:</label>
            <div>
              <textarea
                type="text" 
                name="description_geo" 
                value={formData.description_geo} 
                onChange={handleChange} 
                required 
                className='addInput'
              />
            </div>
          </div>
          <button type="submit" className='addPop-but' disabled={loading}>
              {loading ? 'Uploading...' : 'Add a Blog'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BlogsPopUp;
