type TableLayer = {
  visible: boolean;
  color: number[];
  radius: number;
  outline: number;
  outline_color: number[];
};

type TilesetLayer = {
  visible: boolean;
  color: number[];
};

export type TLayers = {
  stores: TableLayer;
  airports: TableLayer;
  blockground: TilesetLayer;
};
