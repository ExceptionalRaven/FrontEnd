import type { SlideObject as SlideObjectType } from '../types/objects';
import styles from './SlideObject.module.css';
type SlideObjectProps = {
  object: SlideObjectType;
};

function SlideObject({ object }: SlideObjectProps) {
  const dynamicStyle: React.CSSProperties = {
    left: `${object.position.x}px`,
    top: `${object.position.y}px`,
    width: `${object.size.width}px`,
    height: `${object.size.height}px`,
  };

  if (object.type === 'text') {
    return (
      <div
        className={`${styles.baseObject} ${styles.textObject}`}
        style={{
          ...dynamicStyle,
          fontFamily: object.fontFamily,
          fontSize: object.fontSize ? `${object.fontSize}px` : undefined,
          color: object.fontColor,
        }}
      >
        {object.content}
      </div>
    );
  }

  if (object.type === 'image') {
    return (
      <div 
        className={styles.baseObject}
        style={dynamicStyle}
      >
        <img
          src={object.url}
          alt="Slide object"
          className={styles.imageObject}
        />
      </div>
    );
  }

  return null;
};

export {SlideObject}