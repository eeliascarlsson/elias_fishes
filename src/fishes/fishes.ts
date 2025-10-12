export type FishEntry = {
  id: string;
  name: string;
  contry: string;
  info: string[];
};

const conny = {
  id: "conny",
  name: "Conny",
  contry: "Croatia",
  info: ["A very nice fish."],
};

export const fishes: FishEntry[] = [conny];
