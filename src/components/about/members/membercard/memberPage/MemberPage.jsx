import React from 'react'
import './memberpage.css';

function MemberPage() {
    const [formData, setFormData] = useState({
      name_eng: '',
      name_geo: '',
      description_eng: '',
      description_geo: '',
      file: null
    });

    const [members, handleDelete] = useChange('members');

    const edit = () => {
      
    }

  return (
    <div>
      <div>
        Profile Picture / პროფილის სურათი:
      </div>
      <input
        type="file" 
        name="file" 
        onChange={handleChange}
        accept="image/*" 
        className='addInput'
      />
      <h3 className='mt-3'>English</h3>
      <div> 
        <div>Name: </div>
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
        <div>
          <button onClick={() => edit()}>Edit</button>
        </div>
      </div>
      <div>
        <div>Description: </div>
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
      <h3 className='mt-3'>ქართული</h3>
      <div> 
        <div>სახელი:</div> 
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
        <div>დახასიათება:</div>
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
    </div>
  )
}

export default MemberPage;