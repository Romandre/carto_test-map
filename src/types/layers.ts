type TableLayer = {
  visible: boolean;
  color: number[];
  outline_color: number[];
  radius: number;
  outline: number;
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
