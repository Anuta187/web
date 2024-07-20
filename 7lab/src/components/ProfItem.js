import React from 'react';

function ProfItem({ prof, discr, details, isSelected, onClick }) {
  return (
    <li onClick={onClick}>
      <h3>
        {prof} {isSelected ? 'x' : '+'}
      </h3>
      <p>{discr}</p>
      {isSelected && <p>{details}</p>}
    </li>
  );
}

export default ProfItem;
