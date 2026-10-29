import type { Slide } from '../types/slide';
import { SlideObject } from './SlideObject.js';
import styles from './SlidePreview.module.css';

type SlidePreviewProps = {
  slide: Slide;
  width?: number;
  height?: number;
};

function SlidePreview({ slide, width = 800, height = 450 }: SlidePreviewProps) {
  let backgroundStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
  };

  if (slide.background.type === 'color') {
    backgroundStyle = {
      backgroundColor: slide.background.value,
    };
  } else if (slide.background.type === 'image') {
    backgroundStyle = {
      backgroundImage: `url(${slide.background.url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }

  return (
    <div
      className={styles.previewContainer}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        ...backgroundStyle,
      }}
    >
      {slide.objects.map((obj) => (
        <SlideObject key={obj.id} object={obj} />
      ))}
    </div>
  );
};

export {SlidePreview}