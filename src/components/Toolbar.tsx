import type { Presentation } from '../types/presentation.js';
import { dispatch } from '../editor.js';
import { addSlide } from '../functions/slide.js';
import { setTitle } from '../functions/presentation.js';
import { Button } from './Button.js';
import { TextInput } from './TextInput.js';
import { setPreviewMode } from '../editor.js';
import styles from './Toolbar.module.css';

type ToolbarProps = {
  presentation: Presentation;
};

function Toolbar({ presentation }: ToolbarProps) {
  return (
    <div className={styles.toolbarContainer}>
      <div className={styles.titleSection}>
        <label className={styles.label}>Название:</label>
        <TextInput 
          value={presentation.name} 
          onChange={(newName) => dispatch(setTitle, newName)} 
        />
      </div>

      <div className={styles.actionsGroup}>
        <Button 
          text="+ Новый слайд" 
          onClick={() => dispatch(addSlide)} 
        />
      </div>
      <Button text="▶ Запустить превью" onClick={() => setPreviewMode(true)}/>
    </div>
  );
};

export {Toolbar}