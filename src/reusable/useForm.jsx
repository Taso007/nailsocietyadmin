import { useState } from 'react';

export const useFormSubmit = (submitFunction) => {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await submitFunction(event);
    } catch (error) {
      console.error('Error during form submission:', error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleFormSubmit };
};
