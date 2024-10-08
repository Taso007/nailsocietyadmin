import React from 'react';
import '../../../reusable/popup.css'; 
import { useFormSubmit } from '../../../reusable/useForm';


function LeafletPopUp({ formData, handleChange, handleSubmit, handleClosePopup }) {
  const { loading, handleFormSubmit } = useFormSubmit(handleSubmit);

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-button" onClick={handleClosePopup}>X</button>
        <h2>Add a New Leaflet/ დაამატე ახალი ბროშურა</h2>
        <form onSubmit={handleFormSubmit}>
        <h3 className='mt-3'>English</h3>
        <div>
            <label>Category:</label>
            <div>
              <input 
                type="text" 
                name="category_eng"  
                value={formData.category_eng} 
                onChange={handleChange} 
                required 
                className='addInput'
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

          {/* georgian */}
        <h3 className='mt-3'>ქართული</h3>
        <div>
            <label>კატეგორია:</label>
            <div>
                <input 
                  type="text" 
                  name="category_geo"  
                  value={formData.category_geo} 
                  onChange={handleChange} 
                  required 
                  className='addInput'
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
            <button type="submit" className='addPop-but' disabled={loading}>
              {loading ? 'Uploading...' : 'Add a Leaflet'}
            </button>
        </form>
      </div>
    </div>
  );
}

export default LeafletPopUp;
