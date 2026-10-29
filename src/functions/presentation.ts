import type { Presentation } from '../types/presentation.js';
import { generateId } from './id.js';

function createPresentation(name: string): Presentation {
  const firstSlideId = generateId();
  
  return {
    id: generateId(),
    name: name,
    slides: [
      {
        id: firstSlideId,
        name: 'Слайд 1',
        background: { type: 'none' },
        objects: [],
      }
    ],
    activeSlideId: firstSlideId,
  };
}

function updatePresentationName(presentation: Presentation, newName: string): Presentation {
  return {
    ...presentation,
    name: newName,
  };
}

function savePresentation(presentation: Presentation): string {
  return JSON.stringify(presentation, null, 2);
}

function loadPresentation(json: string): Presentation {
  return JSON.parse(json) as Presentation;
}

function setTitle(presentation: Presentation, newTitle: string): Presentation {
  return {
    ...presentation,
    name: newTitle,
  };
}

export { 
  createPresentation, 
  updatePresentationName,
  savePresentation,
  loadPresentation, 
  setTitle,
};