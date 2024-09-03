export type Alliance = {
    id: number;
    name: string;
    color: string;
    alias: string;
    opacity: number;
  };
  
  export type GridCell = Alliance | null;

  export type ImageSize = {
    width: number;
    height: number;
  };
  
  export type GridSize = {
    width: number;
    height: number;
  };