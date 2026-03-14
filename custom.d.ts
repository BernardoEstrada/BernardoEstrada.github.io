/// <reference types="vite/client" />

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.png" {
  export const ReactComponent: React.FC<React.ImgHTMLAttributes>;
  const src: string;
  export default src;
}

declare module "*.jpg" {
  export const ReactComponent: React.FC<React.ImgHTMLAttributes>;
  const src: string;
  export default src;
}
declare module "*.pdf" {
  export const ReactComponent: React.FC<React.LinkHTMLAttributes>;
  const src: string;
  export default src;
}

declare module "*.json" {
  const value: unknown;
  export default value;
}
