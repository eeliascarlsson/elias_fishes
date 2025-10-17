import { fishes } from "./fishes.js";

class FishHandler {
  getFishIds() {
    return fishes.map((fish) => fish.id);
  }

  getEntryById(fishId) {
    return fishes.find((fish) => fish.id === fishId) || null;
  }

  getCountries() {
    const countryCount = {};
    fishes.forEach((fish) => {
      countryCount[fish.country] = (countryCount[fish.country] || 0) + 1;
    });
    return Object.entries(countryCount).map(([country, count]) => ({
      country,
      count,
    }));
  }
}

export const fishHandler = new FishHandler();
