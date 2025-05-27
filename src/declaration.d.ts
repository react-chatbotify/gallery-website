import '@mui/material/styles';

declare module '*.png';
declare module '*.json' {
  const value: any;
  export default value;
}

declare module '@mui/material/styles' {
  type Palette = {
    accent: Record<number, string>;
  };
  type PaletteOptions = {
    accent: Record<number, string>;
  };

  type PaletteColor = {
    [key: number | string]: string;
  };

  type TypeText = {
    [key: number | string]: string;
  };

  type TypeBackground = {
    [key: number | string]: string;
  };
}
