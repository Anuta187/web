import React from 'react';
import ProfItem from './ProfItem';

function Professions({ title, list, selectedProf, toggleProfDetails }) {
  const listProf = list.map((item, index) => (
    <ProfItem 
      key={index} 
      prof={item.prof} 
      discr={item.discr} 
      details={item.details}
      isSelected={selectedProf === index}
      onClick={() => toggleProfDetails(index)}
    />
  ));
  return (
    <div className="prof">
      <h2>{title}</h2>
      <ul>{listProf}</ul>
    </div>
  );
}

export default Professions;
