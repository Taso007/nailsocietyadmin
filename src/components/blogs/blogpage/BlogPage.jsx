import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './blogpage.css';
import Navbar from '../../../Navbar';
import { useNavigate } from 'react-router-dom';
import { renderDescription } from '../../../reusable/utils';


function BlogPage() {
  const { id } = useParams();
  const [blog, setblog] = useState(null);
  const navigate = useNavigate();

  const navigateToEditPage = () => {
    navigate(`/blogs/${id}/edit`);
  }

  useEffect(() => {
    const fetchblog = async () => {
      const docRef = doc(db, 'blogs', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setblog(docSnap.data());
      } else {
        console.log('No such document!');
      } 
    };

    fetchblog();
  }, [id]);

  if (!blog) return <div>This blog does not exist.</div>;

  return (
    <>
    <Navbar></Navbar>
    <div className='blog-page-container'>
      <div className='blog-page'>
      <div className='blog-info'>
        <h1>
          <div className='text-wrap text-break'>{blog.title_eng}</div>
        </h1>
        <div className='blog-description'>
          <p className='text-wrap text-break'>{renderDescription(blog.description_eng)}</p>
        </div>
      </div>
      <div className='blog-info'>
        <h1>
          <div className='text-wrap text-break'>{blog.title_geo}</div>
        </h1>
        <div className='blog-description'>
          <p className='text-wrap text-break'>{renderDescription(blog.description_geo)}</p>
        </div>
      </div>
      <div className='blog-header'>
        <img src={blog.file} alt={blog.title} className='blog-image' />
      </div>
      </div> 
      <div>
        <button className='blog-edit-button' onClick={navigateToEditPage}>
          Edit
        </button>
      </div>
    </div>
    </>
  );
}

export default BlogPage;
