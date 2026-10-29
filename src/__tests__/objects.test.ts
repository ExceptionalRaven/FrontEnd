import { describe, it, expect } from "vitest";
import { createPresentation } from "../functions/presentation.js";
import { addTextObject, addImageObject, moveObject, resizeObject, updateTextObjectStyle, removeObject } from "../functions/objects.js";

describe('Управление объектами на слайде', () => {
  const getNewSlide = () => createPresentation('Тест').slides[0];

  it('addTextObject и addImageObject — добавление объектов', () => {
    const slide = getNewSlide();

    const withText = addTextObject(slide, 'Текст', 10, 20, 100, 50, 'Arial', 14, '#000');
    expect(withText.objects.length).toBe(1);
    expect(withText.objects[0].type).toBe('text');

    const withImage = addImageObject(slide, 'image.png', 0, 0, 200, 200);
    expect(withImage.objects.length).toBe(1);
    expect(withImage.objects[0].type).toBe('image');
    expect(slide.objects.length).toBe(0); // Проверка иммутабельности
  });

  it('moveObject и resizeObject — трансформация объектов', () => {
    const slide = getNewSlide();
    const withText = addTextObject(slide, 'Текст', 10, 20, 100, 50, 'Arial', 14, '#000');
    const objId = withText.objects[0].id;

    const moved = moveObject(withText, objId, 50, 60);
    if (moved.objects[0].type === 'text') {
      expect(moved.objects[0].position.x).toBe(50);
      expect(moved.objects[0].position.y).toBe(60);
    }
    
    if (withText.objects[0].type === 'text') {
      expect(withText.objects[0].position.x).toBe(10); 
    }

    const resized = resizeObject(withText, objId, 300, 400);
    if (resized.objects[0].type === 'text') {
      expect(resized.objects[0].size.width).toBe(300);
      expect(resized.objects[0].size.height).toBe(400);
    }
  });

  it('updateTextObjectStyle — изменение стилей текста', () => {
    const slide = getNewSlide();
    const withText = addTextObject(slide, 'Текст', 10, 20, 100, 50, 'Arial', 14, '#000');
    const objId = withText.objects[0].id;

    const updated = updateTextObjectStyle(withText, objId, 'Calibri', 20, '#fff');
    const textObj = updated.objects[0] as any;

    expect(textObj.fontFamily).toBe('Calibri');
    expect(textObj.fontSize).toBe(20);
    expect(textObj.fontColor).toBe('#fff');
  });

  it('removeObject — удаление объекта со слайда', () => {
    const slide = getNewSlide();
    const withText = addTextObject(slide, 'Текст', 10, 20, 100, 50, 'Arial', 14, '#000');
    const objId = withText.objects[0].id;

    const removed = removeObject(withText, objId);
    expect(removed.objects.length).toBe(0);
    expect(withText.objects.length).toBe(1); // Проверка иммутабельности
  });
});