import { useState, useEffect } from 'react';
import type { Presentation } from '../types/presentation.js'; // или путь к вашим типам
import { Button } from './Button.js';
import styles from './PreviewOverlay.module.css';

type PreviewOverlayProps = {
  presentation: Presentation;
  onClose: () => void;
};

function PreviewOverlay({ presentation, onClose }: PreviewOverlayProps) {
  const [currentIndex, setCurrentIndex] = useState(0); //!!!
  const slides = presentation.slides;
  const currentSlide = slides[currentIndex] || slides[0]; //!!!

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  let backgroundStyle: React.CSSProperties = { backgroundColor: '#ffffff' };
  if (currentSlide.background.type === 'color') {
    backgroundStyle = { backgroundColor: currentSlide.background.value };
  } else if (currentSlide.background.type === 'image') {
    backgroundStyle = {
      backgroundImage: `url(${currentSlide.background.url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }

  return (
    <div className={styles.overlay}>
      <button className={styles.closeButton} onClick={onClose}>
        Закрыть
      </button>

      <div className={styles.slideContainer} style={backgroundStyle}>
        {currentSlide.objects.map((obj) => (
          <div
            key={obj.id}
            style={{
              position: 'absolute',
              left: `${obj.position.x}px`,
              top: `${obj.position.y}px`,
              width: `${obj.size.width}px`,
              height: `${obj.size.height}px`,
            }}
          >
            {obj.type === 'text' && (
              <span style={{ fontFamily: obj.fontFamily, fontSize: `${obj.fontSize}px`, color: obj.fontColor }}>
                {obj.content}
              </span>
            )}
            {obj.type === 'image' && (
              <img src={obj.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
          </div>
        ))}
      </div>

      <div className={styles.navigation}>
        <Button text="Назад" onClick={handlePrev} className={currentIndex === 0 ? styles.disabled : ''} />
        <span className={styles.counter}>
          {currentIndex + 1} / {slides.length}
        </span>
        <Button text="Далее" onClick={handleNext} className={currentIndex === slides.length - 1 ? styles.disabled : ''} />
      </div>
    </div>
  );
}

export {PreviewOverlay}