import React, { useState } from 'react';
import Navbar from '../../../Navbar';
import MemberPopUp from './memberPopup/MemberPopUp';
import './members.css';
import MemberCard from './membercard/MemberCard';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useChange from '../../../reusable/useChange';
import usePopup from '../../../reusable/usePopup';

function Members() {
  const [formData, setFormData] = useState({
    name_eng: '',
    name_geo: '',
    description_eng: '',
    description_geo: '',
    file: null
  });

  const [members, handleDelete] = useChange('members');
  const { isPopupOpen, handleAddItem, handleClosePopup, handleChange } = usePopup(formData, setFormData); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let fileURL = '';
  
    try {
      if (formData.file) {
        const storageRef = ref(storage, `members/${formData.file.name}`);
        await uploadBytes(storageRef, formData.file);
        fileURL = await getDownloadURL(storageRef);
      }
  
      await addDoc(collection(db, 'members'), {
        name_eng: formData.name_eng,
        name_geo: formData.name_geo,
        description_eng: formData.description_eng,
        description_geo: formData.description_geo,
        file: fileURL,
        createdAt: new Date()
      });
  
      handleClosePopup();
      setFormData({
        name_eng: '',
        name_geo: '',
        description_eng: '',
        description_geo: '',
        file: null
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  
 

  return (
    <>
      <Navbar />
      <div className='members-container container-xxl'>
        <div>
          <h1>Members</h1>
        </div> 
        <div className='mt-5 mb-5'>
          {members.map((member) => (
            <MemberCard 
              key={member.id} 
              id={member.id} 
              name_eng={member.name_eng}
              name_geo={member.name_geo} 
              description_eng={member.description_eng}
              description_geo={member.description_geo} 
              file={member.file} 
              handleDelete={() => handleDelete(member.id)}
            />
          ))}
        </div>
        <div>
          <button onClick={handleAddItem} className='addMember-but mb-5'>Add a member</button>
        </div>
      </div>
      {isPopupOpen && (
        <MemberPopUp 
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit} 
          handleClosePopup={handleClosePopup}
        />
      )}
    </>
  );
}

export default Members;
