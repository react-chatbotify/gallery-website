export interface PropTypes  { type: string, items: Array<any>, loading: boolean, error: any };
export interface GenericItemCardProps  {mode: number, name: string, id: string, themeImg: string, description: string};
export type ItemsIterator = {items: Array<GenericItemCardProps>, mode: number, type: string, config: any};

interface EmptyState {
  subHeading: {
    1: string;
    0: string;
  };
  subtext: string;
  buttons: {
    primary: string;
    secondary: string;
  };
}

interface GenericConfig {
  allUrl: string;
  mainHeading: string;
  emptyState: EmptyState;
  elements: {
    ItemCard: React.FC<GenericItemCardProps>; // Replace `any` with the actual prop type if known
  };
}

export interface Config {
  themes: GenericConfig;
  plugins: GenericConfig | any;
  [key: string]: any;
}

