import type { Presentation } from '../types/presentation.js';
import { SlideProperties } from './SlideProperties.js';
import { SlidePreview } from './SlidePreview.js';
import styles from './Workspace.module.css';

type WorkspaceProps = {
  presentation: Presentation;
};

function Workspace({ presentation }: WorkspaceProps) {
  const activeSlide = presentation.slides.find(
    (slide) => slide.id === presentation.activeSlideId
  ) || presentation.slides[0];

  if (!activeSlide) {
    return (
      <main className={styles.emptyState}>
        Слайд не выбран или отсутствует
      </main>
    );
  }

  return (
    <main className={styles.workspaceContainer}>
      <SlideProperties slide={activeSlide} presentation={presentation} />
      <div className={styles.previewWrapper}>
        <SlidePreview slide={activeSlide} width={800} height={450} />
      </div>
    </main>
  );
};

export {Workspace}