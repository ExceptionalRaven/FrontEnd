import { createRoot } from 'react-dom/client';
import { App } from './components/App.js';
import { addEditorChangeHandler, setInitialState, getState } from './editor.js';
import { createTestPresentation } from './data.js';

const initialData = createTestPresentation();
setInitialState(initialData);

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}

const root = createRoot(container);

function renderApp(): void {
  const currentState = getState();
  if (currentState) {
    root.render(<App presentation={currentState} />);
  }
}

renderApp();

addEditorChangeHandler(() => {
  renderApp();
});