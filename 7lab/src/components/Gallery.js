import React, { useState } from 'react';
import './Gallery.css';

const images = [
  { src: 'dv.png', alt: 'Image 1' },
  { src: 'dv.png', alt: 'Image 2' },
  { src: 'dv.png', alt: 'Image 3' },

];

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery">
      <h2>Галерея</h2>
      <div className="gallery-thumbnails">
        {images.map((image, index) => (
          <img 
            key={index} 
            src={image.src} 
            alt={image.alt} 
            className="thumbnail" 
            onClick={() => openImage(image)} 
          />
        ))}
      </div>
      {selectedImage && (
        <div className="lightbox" onClick={closeImage}>
          <img src={selectedImage.src} alt={selectedImage.alt} className="full-image" />
        </div>
      )}
    </div>
  );
}

export default Gallery;
