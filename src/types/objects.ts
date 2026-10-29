type Position = {
  x: number;
  y: number;
};

type Size = {
  width: number;
  height: number;
};

type TextObject = {
  id: string;
  type: 'text';
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  fontFamily: string;
  fontSize: number;
  fontColor: string;
};

type ImageObject = {
  id: string;
  type: 'image';
  position: Position;
  size: Size;
  url: string;
};

type SlideObject = TextObject | ImageObject;

export { TextObject, ImageObject, SlideObject, Position, Size };