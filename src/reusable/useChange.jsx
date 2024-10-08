import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const useChange = (collectionName, orderField = 'createdAt', orderDirection = 'desc') => { 
  const [items, setItems] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, collectionName),      
      orderBy(orderField, orderDirection)
    );
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const itemsArray = [];
      querySnapshot.forEach((doc) => {
        itemsArray.push({ id: doc.id, ...doc.data() });
      });
      setItems(itemsArray);
    });

    return () => unsubscribe();
  }, [collectionName, orderField, orderDirection]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  };


  return [items, handleDelete ];
};

export default useChange;