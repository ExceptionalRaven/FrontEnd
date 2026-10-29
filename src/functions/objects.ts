import type { Slide } from '../types/slide.js';
import type { TextObject, ImageObject, SlideObject } from '../types/objects.js';
import { generateId } from './id.js';

function addTextObject( slide: Slide, content: string, x: number, y: number, width: number, height: number, fontFamily: string, fontSize: number, fontColor: string): Slide {
  const newObject: 
  TextObject = {
    id: generateId(),
    type: 'text',
    content,
    position: { x, y },
    size: { width, height },
    fontFamily,
    fontSize,
    fontColor,
  };

  return {
    ...slide,
    objects: [...(slide.objects || []), newObject],
  };
}

function addImageObject(slide: Slide, imageUrl: string, x: number, y: number, width: number, height: number): Slide {
  const newObject: 
  ImageObject = {
    id: generateId(),
    type: 'image',
    position: { x, y },
    size: { width, height },
    url: imageUrl,
  };

  return {
    ...slide,
    objects: [...slide.objects, newObject],
  };
}

function removeObject(slide: Slide, objectId: string): Slide {
  return {
    ...slide,
    objects: slide.objects.filter(obj => obj.id !== objectId),
  };
}

function moveObject(slide: Slide, objectId: string, newX: number, newY: number): Slide {
  return {
    ...slide,
    objects: slide.objects.map(obj => {
      if (obj.id !== objectId) return obj;
      return {
        ...obj,
        position: { x: newX, y: newY },
      };
    }),
  };
}

function resizeObject(slide: Slide, objectId: string, newWidth: number, newHeight: number): Slide {
  return {
    ...slide,
    objects: slide.objects.map(obj => {
      if (obj.id !== objectId) return obj;
      return {
        ...obj,
        size: { width: newWidth, height: newHeight },
      };
    }),
  };
}

function updateTextObjectStyle( slide: Slide, objectId: string, fontFamily: string, fontSize: number, fontColor: string): Slide {
  return {
    ...slide,
    objects: slide.objects.map(obj => {
      if (obj.id !== objectId || obj.type !== 'text') {
        return obj;
      }
      return {
        ...obj,
        fontFamily,
        fontSize,
        fontColor,
      };
    }),
  };
}

export {
  addTextObject,
  addImageObject,
  removeObject,
  moveObject,
  resizeObject,
  updateTextObjectStyle,
};