type TLayerContent = {
  visible: boolean;
  color: number[];
};

export type TLayers = {
  stores: TLayerContent;
  airports: TLayerContent;
  blockground: TLayerContent;
};
