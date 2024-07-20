import React from 'react';

function Button({ val, onClick }) {
  return (
    <input 
      className="button" 
      type="button" 
      value={val} 
      onClick={onClick}
    />
  );
}

export default Button;
