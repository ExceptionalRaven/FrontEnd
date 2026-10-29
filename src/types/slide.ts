import type { SlideObject } from './objects.js';

type ColorBackground = {
  type: 'color';
  value: string;
};

type ImageBackground = {
  type: 'image';
  url: string;
};

type GradientBackground = {
  type: 'gradient';
  colors: string[];
  angle?: number;
};

type Background = 
  | { type: 'color'; value: string }
  | { type: 'image'; url: string }
  | GradientBackground
  | { type: 'none' };

type Slide = {
  id: string;
  name: string;
  background: Background;
  objects: SlideObject[];
};

type NoneBackground = {
  type: 'none';
};

export { Slide, Background, GradientBackground, NoneBackground, ImageBackground, ColorBackground };