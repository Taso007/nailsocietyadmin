const getFirstNCharacters = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text; 
}; 

const renderDescription = (text) => {
  return text.split('\n').map((line, index) => (
    <span key={index}>{line}<br /></span>
  ));
};

export { getFirstNCharacters, renderDescription} 