import type { Presentation } from '../types/presentation.js';
import { dispatch } from '../editor.js';
import { setActiveSlide, removeSlides } from '../functions/slide.js';
import styles from './SlideList.module.css';

type SlideListProps = {
  presentation: Presentation;
};

function SlideList({ presentation }: SlideListProps) {
  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>Слайды</h3>
      
      <ul className={styles.list}>
        {presentation.slides.map((slide, index) => {
          const isActive = slide.id === presentation.activeSlideId;

          return (
            <li
              key={slide.id}
              onClick={() => dispatch(setActiveSlide, slide.id)}
              onContextMenu={(e) => {
                e.preventDefault();
                if (presentation.slides.length > 1) {
                  dispatch(removeSlides, slide.id);
                } else {
                  alert('Нельзя удалить последний оставшийся слайд');
                }
              }}
              className={`${styles.slideItem} ${isActive ? styles.slideItemActive : ''}`}
            >
              <span className={styles.slideName}>
                {index + 1}. {slide.name || `Слайд ${index + 1}`}
              </span>
              <span className={styles.slideObjectsCount}>
                {slide.objects.length} общ.
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export {SlideList}