import type { Presentation } from '../types/presentation.js';
import { setPreviewMode, getPreviewMode } from '../editor.js';
import { Toolbar } from './Toolbar.js';
import { SlideList } from './SlideList.js';
import { Workspace } from './Workspace.js';
import { PreviewOverlay } from './PreviewOverlay.js';

interface AppProps {
  presentation: Presentation;
}

function App({ presentation }: AppProps) {
  if (getPreviewMode()) {
    return (
      <PreviewOverlay
        presentation={presentation}
        onClose={() => setPreviewMode(false)}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Toolbar presentation={presentation} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <SlideList presentation={presentation} />
        <Workspace presentation={presentation} />
      </div>
    </div>
  );
}

export { App };