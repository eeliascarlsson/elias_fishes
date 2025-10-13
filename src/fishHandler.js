import { fishes } from "./fishes.js";

class FishHandler {
  getFishIds() {
    return fishes.map((fish) => fish.id);
  }

  getEntryById(fishId) {
    return fishes.find((fish) => fish.id === fishId) || null;
  }
}

export const fishHandler = new FishHandler();
