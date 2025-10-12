import { fishes } from "./fishes.js";
import type { FishEntry } from "./fishes";

class FishHandler {
  getFishIds(): string[] {
    return fishes.map((fish) => fish.id);
  }

  getEntryById(fishId: string): FishEntry | null {
    return fishes.find((fish) => fish.id === fishId) || null;
  }
}

export const fishHandler = new FishHandler();
