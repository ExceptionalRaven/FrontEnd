import { describe, it, expect } from "vitest";
import { createPresentation, updatePresentationName, savePresentation, loadPresentation } from "../functions/presentation.js";

describe('Управление презентацией', () => {
  it('createPresentation — должен создавать презентацию со слайдом по умолчанию', () => {
    const res = createPresentation('Тестовая презентация');
    
    expect(res.name).toBe('Тестовая презентация');
    expect(res.slides.length).toBe(1);
    expect(res.slides[0].name).toBe('Слайд 1');
    expect(res.activeSlideId).toBe(res.slides[0].id);
  });

  it('updatePresentationName — должен менять имя и сохранять иммутабельность', () => {
    const original = createPresentation('Старое имя');
    const updated = updatePresentationName(original, 'Новое имя');

    expect(updated.name).toBe('Новое имя');
    expect(original.name).toBe('Старое имя');
    expect(original).not.toBe(updated); 
  });

  it('savePresentation / loadPresentation — проверка превращения в JSON и обратно', () => {
    const original = createPresentation('JSON Тест');
    const jsonString = savePresentation(original);
    const loaded = loadPresentation(jsonString);

    expect(typeof jsonString).toBe('string');
    expect(loaded.id).toBe(original.id);
    expect(loaded.name).toBe(original.name);
    expect(loaded.slides.length).toBe(original.slides.length);
  });
});
