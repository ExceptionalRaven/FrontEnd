import type { Presentation } from './types/presentation.js';

let currentPresentation: Presentation | null = null;
let editorChangeHandler: (() => void) | null = null;

function setInitialState(presentation: Presentation): void {
  currentPresentation = presentation;
}

function getState(): Presentation | null {
  return currentPresentation;
}

type Modifier<P = any> = (model: Presentation, params: P) => Presentation;

function dispatch(modifier: Modifier, params: any = null): void {
  if (!currentPresentation) {
    console.error('State is not initialized! Call setInitialState first.');
    return;
  }

  currentPresentation = modifier(currentPresentation, params);

  if (editorChangeHandler) {
    editorChangeHandler();
  }
}

function addEditorChangeHandler(handler: () => void): void {
  editorChangeHandler = handler;
}

let isPreviewMode = false;

function setPreviewMode(mode: boolean): void {
  isPreviewMode = mode;
  if (editorChangeHandler) {
    editorChangeHandler();
  }
}

function getPreviewMode(): boolean {
  return isPreviewMode;
}

export { 
    setInitialState,
    getState, 
    dispatch, 
    addEditorChangeHandler,
    setPreviewMode,
    getPreviewMode 
  };