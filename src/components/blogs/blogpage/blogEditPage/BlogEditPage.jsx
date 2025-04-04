import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './blogeditpage.css';
import Navbar from '../../../../Navbar';
import { useFormSubmit } from '../../../../reusable/useForm';
import usePopup from '../../../../reusable/usePopup';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";    

function BlogEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setblog] = useState(null); 
  const {handleChange} = usePopup(blog, setblog);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const blogRef = doc(db, 'blogs', id);
      const updatedData = { ...blog };
  
      if (blog.file instanceof File || (blog.file && blog.file.length > 0 && blog.file[0] instanceof File)) {
        const file = blog.file[0] || blog.file; 
        const storageRef = ref(storage, `blogs/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        updatedData.file = downloadURL;
      }
  
      await updateDoc(blogRef, updatedData);
      navigate('/blogs');
    } catch (error) {
      console.error("Error updating blog: ", error);
      alert("Failed to update blog. Please try again.");
    }
  };

  const { loading, handleFormSubmit } = useFormSubmit(handleSubmit);
  

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, 'blogs', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setblog(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchEvent();
  }, [id]);

  if (!blog) return <div>This blog does not exist.</div>;

  const backToblogs = () => {
    navigate('/blogs');
  }

  return (
    <div>
      <Navbar></Navbar>
      <form onSubmit={handleFormSubmit} className='blogpage-container'>
        <h1 className='text-wrap text-break'>Edit blog</h1>
        <div>
          <div>
           <label>Image / სურათი:</label>
          </div>
          <div className='blogpage-img-container'>
            <div >
              <img src={blog.file} className='blogpage-img'></img>
            </div>
            <div className='blogpage-img-input'>
              <input
                type="file" 
                name="file" 
                onChange={handleChange}
                accept="image/*" 
                className='addInput'
              />
            </div>
          </div>
        </div>
        <h3 className='mt-3'>English</h3>
        <div> 
          <label>Title: </label>
          <div>
            <input 
              type="text" 
              name="title_eng" 
              value={blog.title_eng} 
              onChange={handleChange}
              required 
              className='addInput'
            />
          </div>
        </div>
        <div>
          <label>Description: </label>
          <div>
            <textarea 
              type="text" 
              name="description_eng" 
              value={blog.description_eng} 
              onChange={handleChange} 
              required 
              className='addInput auto-height text-wrap text-break'
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
              value={blog.title_geo} 
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
              value={blog.description_geo} 
              onChange={handleChange}
              required 
              className='addInput auto-height text-wrap text-break'
            />
          </div>
        </div>
        <div className='blogpage-button-container'>
          <div>
            <button type='submit' className='saveEdit-button' disabled={loading}>{loading ? "Updating..." : "Save"}</button>
          </div>
          <div>
            <button className='cancelEdit-button' onClick={backToblogs}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default BlogEditPage;