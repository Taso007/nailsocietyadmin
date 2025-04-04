import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import './memberpage.css';
import Navbar from '../../../../../Navbar';
import { useFormSubmit } from '../../../../../reusable/useForm';
import usePopup from '../../../../../reusable/usePopup';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";    

function MemberPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null); 
  const {handleChange} = usePopup(member, setMember);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const memberRef = doc(db, 'members', id);
      const updatedData = { ...member };
  
      if (member.file instanceof File || (member.file && member.file.length > 0 && member.file[0] instanceof File)) {
        const file = member.file[0] || member.file; 
        const storageRef = ref(storage, `members/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        updatedData.file = downloadURL;
      }
  
      await updateDoc(memberRef, updatedData);
      navigate('/members');
    } catch (error) {
      console.error("Error updating member: ", error);
      alert("Failed to update member. Please try again.");
    }
  };

  const { loading, handleFormSubmit } = useFormSubmit(handleSubmit);
  

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, 'members', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMember(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchEvent();
  }, [id]);

  if (!member) return <div>This member does not exist.</div>;

  const backToMembers = () => {
    navigate('/members');
  }

  return (
    <div>
      <Navbar></Navbar>
      <form onSubmit={handleFormSubmit} className='memberpage-container'>
        <h1 className='text-wrap text-break'>Edit Member</h1>
        <div>
          <div>
            <label>Profile Picture / პროფილის სურათი:</label>
          </div>
          <div className='memberpage-img-container'>
            <div >
              <img src={member.file} className='memberpage-img'></img>
            </div>
            <div className='memberpage-img-input'>
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
          <label>Name: </label>
          <div>
            <input 
              type="text" 
              name="name_eng" 
              value={member.name_eng} 
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
              value={member.description_eng} 
              onChange={handleChange}
              required 
              className='addInput auto-height text-wrap text-break'
            />
          </div>
        </div>
        <h3 className='mt-3'>ქართული</h3>
        <div> 
          <label>სახელი:</label> 
          <div>
            <input 
              type="text" 
              name="name_geo" 
              value={member.name_geo} 
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
              value={member.description_geo} 
              onChange={handleChange}
              required 
              className='addInput auto-height text-wrap text-break'
            />
          </div>
        </div>
        <div className='memberpage-button-container'>
          <div>
            <button type='submit' className='saveEdit-button' disabled={loading}>{loading ? "Updating..." : "Save"}</button>
          </div>
          <div>
            <button className='cancelEdit-button' onClick={backToMembers}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default MemberPage;