import { fishes } from "./fishes.js";

const sortedFishes = fishes.sort((a, b) => new Date(b.date) - new Date(a.date));

class FishHandler {
  getFishIds() {
    return sortedFishes.map((fish) => fish.id);
  }

  getEntryById(fishId) {
    return sortedFishes.find((fish) => fish.id === fishId) || null;
  }

  getCountries() {
    const countryCount = {};
    sortedFishes.forEach((fish) => {
      countryCount[fish.englishCountry] =
        (countryCount[fish.englishCountry] || 0) + 1;
    });
    return Object.entries(countryCount).map(([country, count]) => ({
      country,
      count,
    }));
  }
}

export const fishHandler = new FishHandler();
