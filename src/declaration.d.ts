import "@mui/material/styles";

declare module "*.png"
declare module '*.json' {
	const value: any;
	export default value;
}

declare module "@mui/material/styles" {
	interface Palette {
		accent: Record<number, string>;
	}
	interface PaletteOptions {
		accent: Record<number, string>;
	}

	interface PaletteColor {
    [key: number | string]: string;
  }

  interface TypeText {
    [key: number | string]: string;
  }

  interface TypeBackground {
    [key: number | string]: string;
  }
}