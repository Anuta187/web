import React from 'react';
import './ProgramForm.css';

const programs = [
  "Программная инженерия",
  "Прикладная математика и информатика",
  "Прикладная информатика",
];

function ProgramForm() {
  return (
    <div className="program-form">
      <h2>Выбирай программу</h2>
      <ul>
        {programs.map((program, index) => (
          <li key={index}>
            <span>{program}</span>
            <button disabled>Подать заявление</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProgramForm;
