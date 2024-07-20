import React from 'react';
import logoDvfu from '../images.png';
import logoImct from '../imkt.jpg';

function Head() {
  return (
    <div className="head">
      <img className="logo" src={logoDvfu} alt="ДВФУ" />
      <img className="logo" src={logoImct} alt="ИМКТ" />
      <div className="nav-menu">
        <a href="#program-section">Программы</a>
        <a href="#about-dvfu">О ДВФУ</a>
        <a href="#about-imct">О ИМКТ</a>
        <a href="#how-to-apply">Как поступить</a>
        <a href="#contacts">Контакты</a>
      </div>
    </div>
  );
}

export default Head;
