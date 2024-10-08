import React from 'react';
import '../../../../reusable/popup.css';
import { useFormSubmit } from '../../../../reusable/useForm';

function MemberPopUp({ formData, handleChange, handleSubmit, handleClosePopup }) {
  const { loading, handleFormSubmit } = useFormSubmit(handleSubmit);
  
  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-button" onClick={handleClosePopup}>X</button>
        <h2>Add a New Member / დაამატე ახალი მონაწილე</h2>
        <form onSubmit={handleFormSubmit}>
          <div> 
            <label>Profile Picture / პროფილის სურათი:</label>
            <div>
              <input 
                type="file" 
                name="file" 
                onChange={handleChange}
                accept="image/*" 
                className='addInput'
              />
            </div>
          </div>
          <h3 className='mt-3'>English</h3>         
          <div> 
            <label>Name:</label> 
            <div>
              <input 
                type="text" 
                name="name_eng" 
                value={formData.name_eng} 
                onChange={handleChange} 
                required 
                className='addInput'
              />
            </div>
          </div>
          <div>
            <label>Description:</label>
            <div>
              <input 
                type="text" 
                name="description_eng" 
                value={formData.description_eng} 
                onChange={handleChange} 
                required 
                className='addInput'
              />
            </div>
          </div>

          {/* georgian */}
          <h3 className='mt-3'>ქართული</h3>       
          <div> 
            <label>სახელი:</label> 
            <div>
              <input 
                type="text" 
                name="name_geo" 
                value={formData.name_geo} 
                onChange={handleChange} 
                required 
                className='addInput'
              />
            </div>
          </div>
          <div>
            <label>დახასიათება:</label>
            <div>
              <input 
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
              {loading ? 'Uploading...' : 'Add a Member'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MemberPopUp;
