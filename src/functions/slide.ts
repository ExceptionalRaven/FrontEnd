import type { Slide, Background } from '../types/slide.js';
import type { Presentation } from '../types/presentation.js';
import { generateId } from './id.js';

function addSlide(presentation: Presentation, slideName: string = 'Новый слайд'): Presentation {
  // 1. Создаем новый объект слайда с обязательным уникальным ID
  const newSlide: Slide = {
    id: generateId(), // <-- Самое главное: уникальный ID!
    name: slideName,
    background: { type: 'none' }, // или цвет по умолчанию
    objects: [],
  };

  // 2. Возвращаем новый объект презентации (иммутабельно)
  return {
    ...presentation,
    slides: [...presentation.slides, newSlide],
    activeSlideId: newSlide.id, // Сразу делаем новый слайд активным (или оставляем старый — зависит от логики)
  };
}

function removeSlides(presentation: Presentation, slideIds: string[]): Presentation {
  return {
    ...presentation,
    slides: presentation.slides.filter(slide => !slideIds.includes(slide.id)),
  };
}

function moveSlide(presentation: Presentation, slideId: string, newIndex: number): Presentation {
  const slides = [...presentation.slides];
  const currentIndex = slides.findIndex(s => s.id === slideId);
  if (currentIndex === -1) return presentation;

  const [movedSlide] = slides.splice(currentIndex, 1);
  const targetIndex = Math.max(0, Math.min(newIndex - 1, slides.length));

  slides.splice(targetIndex, 0, movedSlide);

  return {
    ...presentation,
    slides,
  };
}

function setActiveSlide(presentation: Presentation, slideId: string): Presentation {
  return {
    ...presentation,
    activeSlideId: slideId,
  };
}

function duplicateSlide(presentation: Presentation, slideId: string): Presentation {
  const targetIndex = presentation.slides.findIndex(s => s.id === slideId);
  if (targetIndex === -1) return presentation;

  const targetSlide = presentation.slides[targetIndex];
  const duplicatedSlide: Slide = {
    ...targetSlide,
    id: generateId(),
    name: `Копия ${targetSlide.name}`,
    objects: targetSlide.objects.map(obj => ({ ...obj, id: generateId() })), // копирование объектов с новыми ID
  };

  const slides = [...presentation.slides];
  slides.splice(targetIndex + 1, 0, duplicatedSlide);

  return {
    ...presentation,
    slides,
  };
}

function setSlideBackgroundColor(slide: Slide, color: string): Slide {
  return {
    ...slide,
    background: { type: 'color', value: color },
  };
}

function setSlideBackgroundImage(slide: Slide, imageUrl: string): Slide {
  return {
    ...slide,
    background: { type: 'image', url: imageUrl },
  };
}

function setSlideBackgroundGradient(slide: Slide, colors: string[], angle?: number): Slide {
  return {
    ...slide,
    background: {
      type: 'gradient',
      colors,
      ...(angle !== undefined ? { angle } : {}), // добавляем angle в объект только если он передан
    },
  };
}

function clearSlideBackground(slide: Slide): Slide {
  return {
    ...slide,
    background: { type: 'none' },
  };
}

export {
  addSlide,
  removeSlides,
  moveSlide,
  setActiveSlide,
  duplicateSlide,
  setSlideBackgroundColor,
  setSlideBackgroundImage,
  setSlideBackgroundGradient,
  clearSlideBackground,
};