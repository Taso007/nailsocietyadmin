import { useState } from 'react';

const usePopup = ( formData, setFormData ) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddItem = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return {
    isPopupOpen,
    formData,
    handleAddItem,
    handleClosePopup,
    handleChange
  };
};

export default usePopup;
