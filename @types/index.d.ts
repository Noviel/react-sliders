export type DataEntry = {
  name: string;
  percent: number;
};

export type Item = {
  percent: number;
};

export type Items = {
  [key: string]: Item;
};
