import { describe, it, expect } from "vitest";
import { createPresentation } from '../functions/presentation.js';
import { addSlide, removeSlides, moveSlide, setActiveSlide, duplicateSlide } from "../functions/slide.js";
import { setSlideBackgroundColor, clearSlideBackground } from "../functions/slide.js";
import type { Presentation } from "../types/presentation.js";

describe('Управление слайдами', () => {
  const createTestPresentation = (): Presentation => {
    let p = createPresentation('Презентация');
    p = addSlide(p, 'Слайд 2');
    p = addSlide(p, 'Слайд 3');
    return p;
  };

  it('addSlide — должен иммутабельно добавлять слайд', () => {
    const original = createPresentation('Старт');
    const updated = addSlide(original, 'Новый Слайд');

    expect(updated.slides.length).toBe(2);
    expect(updated.slides[1].name).toBe('Новый Слайд');
    expect(original.slides.length).toBe(1);
  });

  it('removeSlides — должен удалять один или несколько слайдов', () => {
    const original = createTestPresentation();
    const idsToRemove = [original.slides[0].id, original.slides[2].id];
    
    const updated = removeSlides(original, idsToRemove);

    expect(updated.slides.length).toBe(1);
    expect(updated.slides[0].name).toBe('Слайд 2');
    expect(original.slides.length).toBe(3);
  });

  it('moveSlide — должен корректно перемещать слайд (счет от 1)', () => {
    const original = createTestPresentation();
    const targetId = original.slides[0].id;

    const updated = moveSlide(original, targetId, 2);

    expect(updated.slides[1].id).toBe(targetId);
    expect(updated.slides[0].name).toBe('Слайд 2');
    expect(original.slides[0].id).toBe(targetId);
  });

  it('setActiveSlide — должен менять активный слайд', () => {
    const original = createTestPresentation();
    const targetId = original.slides[1].id;

    const updated = setActiveSlide(original, targetId);

    expect(updated.activeSlideId).toBe(targetId);
    expect(original.activeSlideId).not.toBe(targetId);
  });

  it('duplicateSlide — должен создавать независимую копию слайда', () => {
    const original = createTestPresentation();
    const targetId = original.slides[0].id;

    const updated = duplicateSlide(original, targetId);

    expect(updated.slides.length).toBe(4);
    expect(updated.slides[1].name).toBe('Копия Слайд 1');
    expect(updated.slides[1].id).not.toBe(targetId);
  });

  it('Работа с фоном — установка цвета и очистка', () => {
    const originalPresentation = createPresentation('Фон');
    const slide = originalPresentation.slides[0];

    const coloredSlide = setSlideBackgroundColor(slide, '#ff0000');
    expect(coloredSlide.background).toEqual({ type: 'color', value: '#ff0000' });
    expect(slide.background.type).toBe('none');

    const clearedSlide = clearSlideBackground(coloredSlide);
    expect(clearedSlide.background).toEqual({ type: 'none' });
  });
});
