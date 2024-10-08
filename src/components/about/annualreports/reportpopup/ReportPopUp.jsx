import React from 'react';
import '../../../../reusable/popup.css';
import { useFormSubmit } from '../../../../reusable/useForm';

function ReportPopUp({ formData, handleChange, handleSubmit, handleClosePopup }) {
  const { loading, handleFormSubmit } = useFormSubmit(handleSubmit);

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-button" onClick={handleClosePopup}>X</button>
        <h2>Add a New Report / დაამატე ახალი მოხსენება</h2> 
        <form onSubmit={handleFormSubmit}>
        <h3 className='mt-3'>English</h3>   
        <div>
            <label>File:</label>
            <div>
            <input 
              type="file" 
              name="file_eng" 
              onChange={handleChange}
              accept="application/pdf" 
              required 
              className='addInput fileInput'
            />
            </div>
          </div>
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

          {/* georgian */}
          <h3 className='mt-3'>ქართული</h3> 
          <div>
            <label>ფაილი:</label>
            <div>
            <input 
              type="file" 
              name="file_geo" 
              onChange={handleChange}
              accept="application/pdf" 
              required 
              className='addInput fileInput'
            />
            </div>
          </div>
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

          <button type="submit" className='addPop-but' disabled={loading}>
              {loading ? 'Uploading...' : 'Add a Report'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportPopUp;
