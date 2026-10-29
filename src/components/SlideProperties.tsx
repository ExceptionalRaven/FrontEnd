import type { Slide } from '../types/slide';
import type { Presentation } from '../types/presentation';
import { dispatch } from '../editor.js';
import { Button } from './Button.js';
import { TextInput } from './TextInput.js';
import { addImageObject, addTextObject } from '../functions/objects';
import styles from './SlideProperties.module.css';

type SlidePropertiesProps = {
    slide: Slide;
    presentation: Presentation;
};

function SlideProperties({ slide }: SlidePropertiesProps) {
    const currentColor = slide.background.type === 'color' ? slide.background.value : '#ffffff';

    const handleAddText = () => {
        dispatch((currPresentation: Presentation) => {
            const activeSlide = currPresentation.slides.find(s => s.id === currPresentation.activeSlideId);
            if (!activeSlide) return currPresentation;

            const updatedSlide = addTextObject(activeSlide, 'Новый текст', 50, 50, 200, 50, 'Arial', 18, '#000000');
            
            return {
                ...currPresentation,
                slides: currPresentation.slides.map(s => s.id === activeSlide.id ? updatedSlide : s)
            };
        });
    };

    const handleAddImage = () => {
        const url = prompt('Введите URL изображения:');
        if (url) {
            dispatch((currPresentation: Presentation) => {
                const activeSlide = currPresentation.slides.find(s => s.id === currPresentation.activeSlideId);
                if (!activeSlide) return currPresentation;

                const updatedSlide = addImageObject(activeSlide, url, 100, 100, 300, 200);

                return {
                    ...currPresentation,
                    slides: currPresentation.slides.map(s => s.id === activeSlide.id ? updatedSlide : s)
                };
            });
        }
    };

    const handleColorChange = (color: string) => {
        dispatch((currPresentation: Presentation) => {
            const activeSlide = currPresentation.slides.find(s => s.id === currPresentation.activeSlideId);
            if (!activeSlide) return currPresentation;

            const updatedSlide = {
                ...activeSlide,
                background: { type: 'color' as const, value: color }
            };

            return {
                ...currPresentation,
                slides: currPresentation.slides.map(s => s.id === activeSlide.id ? updatedSlide : s)
            };
        });
    };

    return (
        <div className={styles.propertiesContainer}>
            <div className={styles.section}>
                <label className={styles.label}>Фон слайда:</label>
                <TextInput 
                    type="color" 
                    value={currentColor} 
                    onChange={handleColorChange} 
                />
            </div>

            <div className={styles.divider} />

            <div className={styles.buttonsGroup}>
                <Button text="+ Добавить текст" onClick={handleAddText} />
                <Button text="+ Добавить картинку" onClick={handleAddImage} />
            </div>
        </div>
    );
};

export {SlideProperties}