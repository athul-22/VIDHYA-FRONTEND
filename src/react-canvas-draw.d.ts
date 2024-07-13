declare module 'react-canvas-draw' {
    import * as React from 'react';
  
    export interface CanvasDrawProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
      loadTimeOffset?: number;
      lazyRadius?: number;
      brushRadius?: number;
      brushColor?: string;
      catenaryColor?: string;
      gridColor?: string;
      backgroundColor?: string;
      hideGrid?: boolean;
      canvasWidth?: number;
      canvasHeight?: number;
      disabled?: boolean;
      imgSrc?: string;
      saveData?: string;
      immediateLoading?: boolean;
      hideInterface?: boolean;
      gridSizeX?: number;
      gridSizeY?: number;
      gridLineWidth?: number;
      hideGridX?: boolean;
      hideGridY?: boolean;
      enablePanAndZoom?: boolean;
      mouseZoomFactor?: number;
      zoomExtents?: { min: number; max: number };
    }
  
    export default class CanvasDraw extends React.Component<CanvasDrawProps> {
      clear: () => void;
      undo: () => void;
      getSaveData: () => string;
      loadSaveData: (saveData: string, immediate: boolean) => void;
      getDataURL: (fileType?: string, useBgImage?: boolean) => string;
      drawImage: () => void;
      getCanvas: any;
    }
  }