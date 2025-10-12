import { fishes } from "./fishes.js";

class FishHandler {
    getFishIds(): string[] {
        return fishes.map((fish) => fish.id);
    }
}

export const fishHandler = new FishHandler();
