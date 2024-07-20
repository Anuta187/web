import React, { useState } from 'react';
import './App.css';
import Head from './components/Head';
import Tagline from './components/Tagline';
import Button from './components/Button';
import Professions from './components/Professions';
import Gallery from './components/Gallery';
import ProgramForm from './components/ProgramForm';
import TextTruncator from './components/TextTruncator'; // Новый импорт

const listProf = [
  {prof: "Web-разработчиков", discr: "Создают сложные и очень сложные сайты. Продумывают, чтобы пользователям было быстро и удобно.", details: "Web-разработчики создают веб-сайты и приложения, которые мы используем каждый день. Они работают с HTML, CSS и JavaScript."},
  {prof: "Гейм-девелоперов", discr: "Создают видеоигры. Погружают всех нас в новые миры.", details: "Гейм-девелоперы создают видеоигры для различных платформ, включая консоли, ПК и мобильные устройства."},
  {prof: "AI/ML-cпециалистов", discr: "Используют в деле искусственный интеллект и машинное обучение. Фактами и прогнозами делает бизнесу хорошо.", details: "AI/ML-специалисты разрабатывают модели машинного обучения для анализа данных и прогнозирования."},
  {prof: "Аналитиков данных", discr: "С помощью чисел решают, куда двигаться компаниям. Помогают бизнесу получать еще больше денег.", details: "Аналитики данных анализируют большие объемы данных для выявления трендов и принятия решений."},
  {prof: "Мобильных разработчиков", discr: "Создают мобильные приложения, которые найдут тебя везде. Умещают на маленьких экранах максимальный функционал.", details: "Мобильные разработчики создают приложения для смартфонов и планшетов, работающих на iOS и Android."}
];

const sampleText = [
  "В мире, где технологии развиваются с невероятной скоростью, навыки в программировании становятся все более востребованными. А это продолжение: Знания, полученные сегодня, могут стать вашим ключом к успешной карьере в будущем.",
  "Образование в сфере IT открывает двери к множеству возможностей. А это продолжение: Вы сможете работать над передовыми проектами, создавать инновационные продукты и делать мир лучше.",
  "Выбирая профессию в области технологий, вы инвестируете в свое будущее. А это продолжение: Компании по всему миру ищут талантливых специалистов, и ваш путь к успеху начинается здесь."
];


function App() {
  const [selectedProf, setSelectedProf] = useState(null);
  const [showProgramForm, setShowProgramForm] = useState(false);

  const toggleProfDetails = (index) => {
    setSelectedProf(selectedProf === index ? null : index);
  };

  const handleLearnClick = () => {
    setShowProgramForm(!showProgramForm);
  };

  return (
    <div className="App">
      <Head />
      <Tagline />
      <Button val="Хочу учиться!" onClick={handleLearnClick} />
      <Professions 
        title="Обучаем на:" 
        list={listProf} 
        selectedProf={selectedProf} 
        toggleProfDetails={toggleProfDetails} 
      />
      <Gallery />
      <div id="program-section">
        <Button val="Выбирай программу" onClick={handleLearnClick} />
        {showProgramForm && <ProgramForm />}
      </div>
      <TextTruncator paragraphs={sampleText} /> {}
    </div>
  );
}

export default App;
