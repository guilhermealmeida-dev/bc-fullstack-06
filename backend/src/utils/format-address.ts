import activityAddresse from "../types/activity/activity-addresse";

export function formatAddress(address: string): activityAddresse {
  const [latitude, longitude] = address.split(",").map(Number);
  return {
    latitude,
    longitude
  };
}
