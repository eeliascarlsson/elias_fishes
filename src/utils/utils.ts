export type WelcomeLocation = { type: "welcome" };
export type FishLocation = { type: "fish"; fishId: string };
export type LocationInfo = WelcomeLocation | FishLocation;

export const parseLocation = (location: string): LocationInfo | null => {
    const trimmedLocation = location.slice(1);
    const parts = trimmedLocation.split("/");
    if (parts.length === 1) {
        return { type: "welcome" };
    }
    if (parts[0] === "fish" && parts.length === 2) {
        return { type: "fish", fishId: parts[1] };
    }
    return null;
};
