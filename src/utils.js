export const parseLocation = (location) => {
  if (location.startsWith("/")) return null;
  if (!location.startsWith("#")) return null;

  if (location === "#welcome") {
    return { type: "welcome" };
  }

  if (location === "#map") {
    return { type: "map" };
  }

  if (location.startsWith("#fish/")) {
    const parts = location.split("/");
    if (parts.length === 2) {
      const fishId = parts[1];
      return { type: "fish", fishId };
    }
  }

  return null;
};

export const getGabbeCompatScore = (swag, usability) => {
  const swagScore = 5 - swag;
  const usabilityScore = usability;

  // Simple average for now
  const gabbeCompatScore = Math.round((swagScore + usabilityScore) / 2);
  return gabbeCompatScore;
};
