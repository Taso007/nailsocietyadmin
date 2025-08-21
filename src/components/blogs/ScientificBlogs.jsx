import React, { useState } from 'react';
import Navbar from '../../Navbar';
import './blogs.css';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import BlogsPopUp from './blogspopup/BlogsPopUp';
import BlogsCard from './blogscard/BlogsCard';
import useChange from '../../reusable/useChange';
import usePopup from '../../reusable/usePopup';

function ScientificBlogs() {
  const [formData, setFormData] = useState({
    file: null,
    title_eng: '',
    title_geo: '',
    file_eng: null,
    file_geo: null,
    description_eng: '',
    description_geo: ''
  });

  const [blogs, handleDelete] = useChange("blogs");
  const { isPopupOpen, handleAddItem, handleClosePopup, handleChange } = usePopup(formData, setFormData); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storageRef = ref(storage, `blogs/${formData.file.name}`);
      const fileEngRef = ref(storage, `blogs/${formData.file_eng.name}`);
      const fileGeoRef = ref(storage, `blogs/${formData.file_geo.name}`);
      
      await uploadBytes(storageRef, formData.file);
      const fileURL = await getDownloadURL(storageRef);

      await uploadBytes(fileEngRef, formData.file_eng);
      const fileEngURL = await getDownloadURL(fileEngRef);
      
      await uploadBytes(fileGeoRef, formData.file_geo);
      const fileGeoURL = await getDownloadURL(fileGeoRef);

      await addDoc(collection(db, 'blogs'), {
        file: fileURL,
        title_eng: formData.title_eng,
        title_geo: formData.title_geo,
        file_eng: fileEngURL,
        file_geo: fileGeoURL,
        description_eng: formData.description_eng,
        description_geo: formData.description_geo,
        createdAt: new Date()
      });

      handleClosePopup();
      setFormData({
        file: null,
        title_eng: '',
        title_geo: '',
        file_eng: null,
        file_geo: null,
        description_eng: '',
        description_geo: ''
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <>
      <Navbar />
      <div className='blogs-container container-xxl'>
        <div>
          <h1>Blogs</h1>
        </div>
        <div className='mt-5 mb-5'>
          <div className='row'>
            {blogs.map((blog) => (
              <div className='col-md-4 mt-3' key={blog.id}>
                <BlogsCard 
                  id={blog.id} 
                  title_eng={blog.title_eng} 
                  title_geo={blog.title_geo}
                  file={blog.file} 
                  description_eng={blog.description_eng} 
                  description_geo={blog.description_geo}
                  handleDelete={() => handleDelete(blog.id)}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <button onClick={handleAddItem} className='addblogs-but mb-5'>Add a blog</button>
        </div>
        {isPopupOpen && (
          <BlogsPopUp 
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit} 
            handleClosePopup={handleClosePopup}
          />
        )}
      </div>
    </>
  );
}

export default ScientificBlogs;
