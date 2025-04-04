import React from 'react';
import '../../../reusable/popup.css'; 
import { useFormSubmit } from '../../../reusable/useForm';

function EventsPopUp({ formData, handleChange, handleSubmit, handleClosePopup }) {
  const { loading, handleFormSubmit } = useFormSubmit(handleSubmit);

  return ( 
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-button" onClick={handleClosePopup}>X</button>
        <h2>Add a New Event / დაამატეთ ახალი მოვლენა</h2>
        <form onSubmit={handleFormSubmit}>
         <div>
         <label>Category / კატეგორია:</label>
          <div>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required 
              className='form-select addInput'
            >
              <option value="">Select a category / აირჩიეთ კატეგორია</option>
              <option value="Congress / კონგრესი">Congress / კონგრესი</option>
              <option value="symposium / სიმპოზიუმი">symposium / სიმპოზიუმი</option>
            </select> 
          </div>
          </div>
          <div>
            <label>Image / სურათი:</label> 
            <div>
            <input 
              type="file" 
              name="file" 
              onChange={handleChange}
              accept="image/*"  
              multiple
              required 
              className='addInput fileInput'
            /> 
            </div>
          </div>
          <div>
          <div>
            <label>Date / თარიღი:</label>
            <div>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required 
                className='form-control addInput' 
              />
            </div>
          <h3 className='mt-3'>English</h3> 
          </div>
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
            <label>Location:</label>
            <div>
              <input 
                type="text" 
                name="location_eng" 
                value={formData.location_eng} 
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
          </div>
          <h3 className='mt-3'>ქართული</h3> 
          <div>
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
            <label>მდებარეობა:</label>
            <div>
              <input 
                type="text" 
                name="location_geo" 
                value={formData.location_geo} 
                onChange={handleChange} 
                required 
                className='addInput'
              />
            </div>
          </div>
          <div>
            <label>დახასიათება: </label>
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
              {loading ? 'Uploading...' : 'Add an Event'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EventsPopUp;
